# Boost

Boost is a service for creating withdrawal coupons, airdrop whitelists and alike.
There is the signing service or guard on one side and the boost contract, an executor, on the other.
The guard signs (almost) arbitrary messages that can be used by a given account to call a method on the executor contract.

The guard receives a payload like this:

```json
{
  "owner": "0x9870000000000000000000000000000000000654",
  "expire": 1012345670,
  "token": "0x1230000000000000000000000000000000000456",
  "depositId": "0xa1bc23d4F5",
  "addresses": [
    { "address": "0x1230000000000000000000000000000000000456", "amount": 10 },
    { "address": "0x2340000000000000000000000000000000000567", "amount": 15 },
    { "address": "0x3450000000000000000000000000000000000678", "amount": 20 }
  ]
}
```

Now a merkle tree is generated. It's first leaf contains everything except the `addresses`, the config, so to say.
All other leafs are the addresses and their data.
The merkle root is signed by the guard account and the owner. Now everything is stored on IPFS.
Those two signatures, together with the config, the merkle root and the data from a leaf can be used to trigger some action on an executor contract.

The executor first veryfies that the owner and guard signature for the merkle root are valid.
It then checks whether the config and the data are both a leaf on the merkle tree.
If everything is correct, further logic can be executed, depending on contract implementation.



# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's Take Over mode by following these steps:

1. Run `Extensions: Show Built-in Extensions` from VS Code's command palette, look for `TypeScript and JavaScript Language Features`, then right click and select `Disable (Workspace)`. By default, Take Over mode will enable itself if the default TypeScript extension is disabled.
2. Reload the VS Code window by running `Developer: Reload Window` from the command palette.

You can learn more about Take Over mode [here](https://github.com/johnsoncodehk/volar/discussions/471).
