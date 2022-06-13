import { ethers, network } from "hardhat";
import cypress from "cypress";
import { build, createServer } from "vite";
import path from "path";
import vue from '@vitejs/plugin-vue'

async function main() {
  const BoostManager = await ethers.getContractFactory("BoostManager");
  const boostManager = await BoostManager.deploy();

  console.log("Deploying BoostManager on network:", network.name);
  await boostManager.deployed();
  console.log("Address:", boostManager.address);

  console.log("Building UI");
  await build({
    root: path.resolve(__dirname, '../ui'),
    plugins: [vue()],
    mode: 'e2e'
  })
  console.log("Starting UI server");
  const server = await createServer({
    configFile: false,
    root: path.resolve(__dirname, '../ui/dist'),
    server: {
      port: 8081
    }
  })
  await server.listen()
  server.printUrls()

  console.log("Running e2e tests:");
  await cypress.run();

  server.close();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
