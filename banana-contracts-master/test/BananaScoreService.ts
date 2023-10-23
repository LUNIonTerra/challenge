import { expect } from "chai";
import { ethers } from "hardhat";

describe("BananaScoreService", function () {
    async function deployContract() {
        const [owner, otherAccount] = await ethers.getSigners();
        const BananaNFT = await ethers.getContractFactory("NFTBanana");
        const bananaNFT = await BananaNFT.deploy(
            'https://gateway.pinata.cloud/ipfs/Qma7jJhLUsiZDcRLdy3jx8YYg6c46hkmXE3tr6cV66NcKA'
        );

        const bananaTokenAddress = await bananaNFT.getAddress();
        const BananaScoreService = await ethers.getContractFactory("BananaScoreService");
        const bananaService = await BananaScoreService.deploy(
            bananaTokenAddress
        );

        const bananaServiceAddress = await bananaService.getAddress();
        await bananaNFT.transferOwnership(bananaServiceAddress);

        return { bananaService, owner, otherAccount };
    }
  
    it("Should be deployed properly", async function () {
        const { bananaService } = await deployContract();

        expect(bananaService).not.null;
    });
      
    it("Should be possible to create user", async function () {
        const { bananaService } = await deployContract();

        await bananaService.createUser();

        const allUsers = await bananaService.listAllUsers();

        expect(allUsers.length).to.be.equal(1);
    });

    it("Created user should have posibility to increment his score", async function () {
        const { bananaService, owner } = await deployContract();

        await bananaService.createUser();
        await bananaService.incrementScore();
        await bananaService.incrementScore();

        const userScore = await bananaService.getScoreForUser(owner.address);
        expect(userScore).to.be.equal(2);
    });

    it("Should be possible to list all users", async function () {
        const { bananaService, otherAccount } = await deployContract();

        await bananaService.createUser();
        await bananaService.connect(otherAccount).createUser();

        const totalUsers = await bananaService.listAllUsers();
        expect(totalUsers.length).to.be.equal(2);
    });

    it("Should be possible to get total score", async function () {
        const { bananaService, otherAccount } = await deployContract();

        await bananaService.createUser();
        await bananaService.incrementScore();
        await bananaService.incrementScore();
        await bananaService.connect(otherAccount).createUser();
        await bananaService.connect(otherAccount).incrementScore();

        const totalScore = await bananaService.getTotalScoreForAllUsers();
        expect(totalScore).to.be.equal(3);
    });

    it("Should be possible to get score of user by id", async function () {
        const { bananaService, owner } = await deployContract();

        await bananaService.createUser();
        await bananaService.incrementScore();
        await bananaService.incrementScore();

        const userScore = await bananaService.getScoreForUser(owner);
        expect(userScore).to.be.equal(2);
    });

    it("Should be possible only for current user to increment his score", async function () {
        const { bananaService, owner, otherAccount } = await deployContract();

        await bananaService.createUser();
        await bananaService.incrementScore();

        await bananaService.connect(otherAccount).createUser();
        await bananaService.connect(otherAccount).incrementScore();
        await bananaService.connect(otherAccount).incrementScore();


        const userScore = await bananaService.getScoreForUser(owner);
        expect(userScore).to.be.equal(1);
    });

    it("Should not be possible for user to increment his score before initializing account", async function () {
        const { bananaService } = await deployContract();

        const incrementTrans = bananaService.incrementScore();

        await expect(incrementTrans).to.be.revertedWith("User does not exist");
    });

    it("Should not be possible for user to initializing his account more than once", async function () {
        const { bananaService } = await deployContract();

        await bananaService.createUser();
        const nextCreateUserTrans = bananaService.createUser();

        await expect(nextCreateUserTrans).to.be.revertedWith("User already exist");
    });
});
  