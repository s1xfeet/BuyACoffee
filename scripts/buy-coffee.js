const hre = require("hardhat");

async function getBalance(address){
  // hardhat connects to 'provider' node and stores the balance in 'balanceBigInt'
  const balanceBigInt = await hre.waffle.provider.getBalance(address);

  // using 'formatEther' to convert 'balanceBigInt' into readable form
  return hre.ethers.utils.formatEther(balanceBigInt);
}

async function printBalances(addresses){
  let idx = 0;
  for (const address of addresses){
    console.log(`Address ${idx} balance: `, await getBalance(address));
    idx++;
  }
}

async function printMemos(memos){
  for (const memo of memos){
    const timestamp = memo.timestamp;
    const tipper = memo.name;
    const tipperAddress = memo.from;
    const message = memo.message;
    console.log(`At ${timestamp}, ${tipper} (${tipperAddress}) said: "${message}"`);
  }
}
async function main() {
  //Get example accounts
  const [owner, tipper, tipper2, tipper3] = await hre.ethers.getSigners();

  // get the contract to deploy
  const BuyMeACoffee = await hre.ethers.getContractFactory("BuyMeACoffee");
    
  // deploy contract
  const buyMeACoffee = await BuyMeACoffee.deploy();

  await buyMeACoffee.deployed();

  console.log("BuyMeACoffee deployed to ", buyMeACoffee.address);

  // check balances before the coffee purchase
  const addresses = [owner.address, tipper.address, buyMeACoffee.address];
  console.log("== start ==");
  await printBalances(addresses);

  // check balance after coffee purchase
  // withdraw funds
  // check balance after withdraw
  // check all memos
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
