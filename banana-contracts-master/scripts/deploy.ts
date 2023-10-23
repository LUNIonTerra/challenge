import { ethers } from "hardhat";

const GAS_PRICE_50GWEI = 50000000000;

async function main() {
  console.log("⛓ Deploying BananaToken... \n");
  const bananaToken = await ethers.deployContract("NFTBanana", [
    'https://gateway.pinata.cloud/ipfs/Qma7jJhLUsiZDcRLdy3jx8YYg6c46hkmXE3tr6cV66NcKA', 
  ], { gasPrice: GAS_PRICE_50GWEI });
  await bananaToken.waitForDeployment();

  console.log(
    `⛓ NFTBanana deployed to ${bananaToken.target} \n`
  );

  console.log("⛓ Deploying BananaScoreService...");
  const bananaService = await ethers.deployContract("BananaScoreService", [
    bananaToken.target, 
  ], { gasPrice: GAS_PRICE_50GWEI });
  await bananaService.waitForDeployment();

  console.log(
    `⛓ BananaScoreService deployed to ${bananaService.target} \n`
  );

  await bananaToken.transferOwnership(bananaService.target, { gasPrice: GAS_PRICE_50GWEI });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
