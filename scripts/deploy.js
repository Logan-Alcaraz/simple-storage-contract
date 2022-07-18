//imports
const { ethers, run, network } = require("hardhat")

//async main
async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        //Creates SimpleStorageFactory variable which grabs the contract SimpleStorage
        "SimpleStorage"
    )
    console.log("Deploying contract...") //outputs waiting message
    const simpleStorage = await SimpleStorageFactory.deploy() //creates variable simpleStorage which is the deployment of the SimpleStorageFactory variable
    await simpleStorage.deployed() //Waits until simpleStorage variable is deployed
    console.log(`Deployed contract to: ${simpleStorage.address}`) // Grabs the transaction address
    console.log(network.config) //Grabs network configuration data
    if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
        //checks if chainID from data is 4 (int only no string) and that the API key is correct
        console.log("Waiting for block confirmations...")
        await simpleStorage.deployTransaction.wait(6) //waits
        await verify(simpleStorage.address, []) //verifies contract on etherscan
    }

    const currentValue = await simpleStorage.retrieve() //creates a variable that grabs current value (0)
    console.log(`Current Value is: ${currentValue}`) //displays current value
    const transactionResponse = await simpleStorage.store(7) //creates a variable that will change our number (7)
    await transactionResponse.wait(1) //waits for storing of variable to occur
    const updatedValue = await simpleStorage.retrieve() //creates a variable that grabs the updated value
    console.log(`Updated Value is: ${updatedValue}`) //displays updated value
}

async function verify(contractAddress, args) {
    console.log("Verifying contract...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified!")
        } else {
            console.log(e)
        }
    }
}

//main
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
