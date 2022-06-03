const { ethers } = require("hardhat");
const {expect,  assert} = require("chai");

//hardhat & Mocha function
describe("SimpleStorage", function() {
    let simpleStorageFactory;
    let simpleStorage;
    
    beforeEach( async function(){
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
        simpleStorage = await simpleStorageFactory.deploy();
    });

    it("Should start with favirote number 0 ", async function(){
        const currentValue = await simpleStorage.retrieve();
        const expectedValue = "0";
        assert.equal(currentValue.toString(),expectedValue);
    });

    it("Should equal to expted value ", async function(){
        const expectedValue = "7";
        const transactionResponce = await simpleStorage.store(expectedValue);
        await transactionResponce.wait(1);
        const currentValue = await simpleStorage.retrieve();
        assert.equal(currentValue.toString(), expectedValue);
    });


});


