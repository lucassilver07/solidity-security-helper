const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  const victim = "0x32451a44ca8AAD554Fa8f3Ef3fF833E65EdA18"
  // Deploy Collection contract
  const ReentrancyAttack = await ethers.getContractFactory("ReentrancyAttack");
  const ReentrancyAttackContract = await ReentrancyAttack.deploy(victim);
  await ReentrancyAttackContract.deployed();        
  console.log("ReentrancyAttack", ReentrancyAttackContract.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });