const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const SimpleContract = await hre.ethers.getContractFactory("SimpleContract");
  const simpleContract = await SimpleContract.deploy();

  await simpleContract.waitForDeployment();

  console.log("SimpleContract deployed to:", simpleContract.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
