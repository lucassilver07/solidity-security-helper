const { expect } = require("chai");
const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

// Token
const initialSupply = "5000";
const initialSupplyWei = ethers.utils.parseEther(initialSupply);

const price = "0.1";
const priceWei = ethers.utils.parseEther(price);

describe("ReentrancyAttack contract", function () {
    // We define a fixture to reuse the same setup in every test. We use
    // loadFixture to run this setup once, snapshot that state, and reset Hardhat
    // Network to that snapshot in every test.
    async function deployFixture() {
        // Get the ContractFactory and Signers here.
        const [owner, addr1, addr2] = await ethers.getSigners();

        // Deploy ReentrancyAttack contract
        const ReentrancyAttack = await ethers.getContractFactory("ReentrancyAttack");
        const ReentrancyAttackContract = await ReentrancyAttack.deploy();
        await ReentrancyAttackContract.deployed();


      
        // Fixtures can return anything you consider useful for your tests
        return { ReentrancyAttackContract, owner, addr1, addr2 };
    }

    // You can nest describe calls to create subsections.
    describe("Deployment", function () {
        // `it` is another Mocha function. This is the one you use to define each
        // of your tests. It receives the test name, and a callback function.
        //
        // If the callback function is async, Mocha will `await` it.
        it("Should set the right owner", async function () {
            // We use loadFixture to setup our environment, and then assert that
            // things went well
            const { ReentrancyAttackContract, owner } = await loadFixture(deployFixture);

            // `expect` receives a value and wraps it in an assertion object. These
            // objects have a lot of utility methods to assert values.

            // This test expects the owner variable stored in the contract to be
            // equal to our Signer's owner.
            expect(await ReentrancyAttackContract.owner()).to.equal(owner.address);
        });
    });
});