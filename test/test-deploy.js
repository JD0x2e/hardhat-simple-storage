const { ethers } = require("hardhat")
const { expect, assert } = require("chai")

describe("SimpleStorage", function () {
    let simpleStorageFactory, simpleStorage
    beforeEach(async function () {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await simpleStorageFactory.deploy()
    })

    it("Should start with a favourite number of 0", async function () {
        const currentValue = await simpleStorage.retrieve()
        const expectedValue = "0"
        // assert & expect
        assert.equal(currentValue.toString(), expectedValue)
        expect(currentValue.toString()).to.equal(expectedValue)
    })
    it("Should update when we call store", async function () {
        const expectedValue = 7
        const txResponse = await simpleStorage.store(expectedValue)
        await txResponse.wait(1)
        const currentValue = await simpleStorage.retrieve()
        assert.equal(currentValue.toString(), expectedValue)
    })
    it("Should work correctly with the people struct and array", async function () {
        const expectedPersonName = "Jack"
        const expectedFavouriteNumber = "9"
        const txResponse = await simpleStorage.addPerson(
            expectedPersonName,
            expectedFavouriteNumber
        )
        await txResponse.wait(1)
        const { favouriteNumber, name } = await simpleStorage.people(0)

        assert.equal(name, expectedPersonName)
        assert.equal(favouriteNumber, expectedFavouriteNumber)
    })
})

// yarn hardhat test --grep "any function", i.e "store" -> this will run only this specficied test
// alternative is to put ".only" after it
