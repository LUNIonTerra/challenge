import { expect } from "chai";
import { ethers } from "hardhat";

describe("NFTBanana", function () {
    async function deployContract() {
      const [owner, otherAccount] = await ethers.getSigners();
  
      const BananaNFT = await ethers.getContractFactory("NFTBanana");
      const bananaNFT = await BananaNFT.deploy(
        'https://gateway.pinata.cloud/ipfs/Qma7jJhLUsiZDcRLdy3jx8YYg6c46hkmXE3tr6cV66NcKA'
      );
      return { bananaNFT, owner, otherAccount };
    }
  
    it("Should be deployed properly", async function () {
        const { bananaNFT } = await deployContract();

        expect(bananaNFT).not.null;
    });

    it("Should be possible to mint token", async function () {
        const { bananaNFT, otherAccount } = await deployContract();

        await bananaNFT.mint(otherAccount);
    });

    it("Should be possible to get all token owners", async function () {
        const { bananaNFT, otherAccount } = await deployContract();

        await bananaNFT.mint(otherAccount);
        const allOwners = await bananaNFT.getAllOwners();

        expect(allOwners.length).to.equal(1);
    });

    it("Should not be possible to mint token if called by non owner", async function () {
        const { bananaNFT, otherAccount } = await deployContract();

        const mintFunction = bananaNFT.connect(otherAccount).mint(otherAccount);

        await expect(mintFunction).to.be.revertedWith("Ownable: caller is not the owner");
    });
});
  