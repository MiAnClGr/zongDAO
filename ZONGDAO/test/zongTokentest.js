const {assert} = require('chai')


const zongToken = artifacts.require('./zongToken.sol')


// check for chai
require('chai')
.use(require('chai-as-promised'))
.should()

contract('zongToken', ([founder, customer]) => {
    let contract 

    function tokens(number) {
        return web3.utils.toWei(number, 'ether')
    }

    before( async () => {
    
        contract = await zongToken.deployed() 
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
    
        it('the founder has 1000000 tokens', async() => {
                const founderBalance = await contract.balanceOf(founder)
                assert.equal(founderBalance, tokens('0.000000000001'))
        })
    })

       


})


