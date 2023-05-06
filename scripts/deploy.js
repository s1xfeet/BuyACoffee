const hre = require("hardhat");

async function main() {
    //Get example accounts
    const [owner, tipper, tipper2, tipper3] = await hre.ethers.getSigners();
  
    // get the contract to deploy
    const BuyMeACoffee = await hre.ethers.getContractFactory("BuyMeACoffee");
      
    // deploy contract
    const buyMeACoffee = await BuyMeACoffee.deploy();
  
    await buyMeACoffee.deployed();
  
    console.log("BuyMeACoffee deployed to ", buyMeACoffee.address);
  }

  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  