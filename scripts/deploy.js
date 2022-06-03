//imports
const { getContractAddress } = require("ethers/lib/utils");
const {ethers,run,network} = require("hardhat");



//async
async function main(){
    //Create Factory object of cotract
    const simpleStorageFactory =    await ethers.getContractFactory("SimpleStorage");

    console.log("Deploying Contract");
    //Contract deployed
    const simpleStorage = await simpleStorageFactory.deploy();
    await simpleStorage.deployed(); 
    console.log(`Contract address : ${simpleStorage.address}`);

 // what happens when we deploy to our hardhat network?
 if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
    console.log("Waiting for block confirmations...")
    await simpleStorage.deployTransaction.wait(6)
    await verify(simpleStorage.address, [])
  }

  //Intraction with contract 
  const currentValue = await simpleStorage.retrieve();
  console.log(`Current value is ${currentValue}`);

  //updating favoriteNumber value.
  const transationResponse = await simpleStorage.store(100);
  await transationResponse.wait(1);
  const updatedValue = await simpleStorage.retrieve();
  console.log( `Updated Values is ${updatedValue}`);

}

//Conctract verification funtion
async function verify(contractAddress, args){
    console.log("Verifying contract...")

    try{
    await run ("verify:verify",{ 
        address: contractAddress,
        constructorArgument: args,
     })
    }catch(e){
        if (e.message.toLowerCase().includes("already verified")){
            console.log("Already Verified!")
        }else{
            console.log(`Error is ${e}`);

        }
    }
}


//main
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });