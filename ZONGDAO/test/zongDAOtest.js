const {assert} = require('chai')

const zongDAO = artifacts.require('./zongDAO.sol')



// check for chai
require('chai')
.use(require('chai-as-promised'))
.should()

contract('zongDAO', (accounts) => {
    let contract
    
    // before tells our tests to run this first before anything else 
    before( async () => {
    
    contract = await zongDAO.deployed() 
    })

    describe('deployment', async() => {
        // test samples with writing it 
        it('deploys successfuly', async() => {
            const address = contract.address;
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
            assert.notEqual(address, 0x0)
        })

       

    })

    

})

