// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

error BoostDoesNotExist();
error BoostEndDateInPast();
error BoostEndDateBeforeStart();
error BoostEnded();
error BoostNotEnded(uint256 end);
error BoostNotStarted(uint256 start);
error OnlyBoostOwner();
error RecipientAlreadyClaimed();
error InvalidWhitelistProof();
error InsufficientBoostBalance();

contract BoostManager {
  struct Boost {
    string proposalId;
    address token;
    uint256 balance;
    uint256 start;
    uint256 end;
    address owner;
    bytes32 whitelist;
  }

  struct Claim {
    uint256 boostId;
    address recipient;
    uint256 amount;
  }

  event BoostCreated(uint256 id, Boost boost);
  event BoostClaimed(Claim claim);
  event BoostDeposited(uint256 id, address sender, uint256 amount);
  event BoostWithdrawn(uint256 id, uint256 amount);

  uint256 private nextBoostId = 1;
  mapping(uint256 => Boost) public boosts;
  mapping(string => uint256[]) public boostIdsByProposalId;
  mapping(address => mapping(uint256 => bool)) public claimed;

  /// @notice Create a new boost and transfer tokens to it
  function create(Boost calldata boost) external {
    if (boost.end <= block.timestamp) revert BoostEndDateInPast();
    if (boost.start >= boost.end) revert BoostEndDateBeforeStart();

    uint256 newId = nextBoostId;
    nextBoostId++;
    boosts[newId] = boost;
    boostIdsByProposalId[boost.proposalId].push(newId);

    IERC20 token = IERC20(boost.token);
    token.transferFrom(msg.sender, address(this), boost.balance);

    emit BoostCreated(newId, boosts[newId]);
  }

  /// @notice Top up an existing boost
  function deposit(uint256 id, uint256 amount) public {
    if (boosts[id].owner == address(0)) revert BoostDoesNotExist();
    if (boosts[id].end <= block.timestamp) revert BoostEnded();

    boosts[id].balance += amount;

    emit BoostDeposited(id, msg.sender, amount);

    IERC20 token = IERC20(boosts[id].token);
    token.transferFrom(msg.sender, address(this), amount);
  }

  /// @notice Withdraw remaining tokens from an expired boost
  function withdraw(uint256 id, address to) external {
    if (boosts[id].end > block.timestamp) revert BoostNotEnded(boosts[id].end);
    if (boosts[id].owner != msg.sender) revert OnlyBoostOwner();

    uint256 amount = boosts[id].balance;
    boosts[id].balance = 0;

    emit BoostWithdrawn(id, amount);

    IERC20 token = IERC20(boosts[id].token);
    token.transfer(to, amount);
  }

  /// @notice Claim using a merkle proof
  function claimTokens(Claim calldata claim, bytes32[] calldata proof)
    external
  {
    if (boosts[claim.boostId].start > block.timestamp)
      revert BoostNotStarted(boosts[claim.boostId].start);
    if (boosts[claim.boostId].balance < claim.amount) revert InsufficientBoostBalance();
    if (boosts[claim.boostId].end < block.timestamp) revert BoostEnded();
    if (claimed[claim.recipient][claim.boostId]) revert RecipientAlreadyClaimed();

    bytes32 leaf = keccak256(abi.encodePacked(claim.recipient, claim.amount));
    if (!MerkleProof.verify(proof, boosts[claim.boostId].whitelist, leaf)) {
      revert InvalidWhitelistProof();
    }

    claimed[claim.recipient][claim.boostId] = true;
    boosts[claim.boostId].balance -= claim.amount;

    emit BoostClaimed(claim);

    IERC20 token = IERC20(boosts[claim.boostId].token);
    token.transfer(claim.recipient, claim.amount);
  }

  function getBoostIdsByProposalId(string calldata proposalId) public view returns (uint256[] memory) {
    return boostIdsByProposalId[proposalId];
  }
}
