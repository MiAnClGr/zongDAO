const {assert} = require('chai')
const Web3 = require('web3')


const zongICO = artifacts.require('./zongICO.sol')


// check for chai
require('chai')
.use(require('chai-as-promised'))
.should()

contract('zongICO', ([founder, customer1, customer2, customer3]) => {
    let contract 

    // function tokens(number) {
    //     return web3.utils.toWei(number, 'ether')
    // }

    before( async () => {
    
        contract = await zongICO.deployed() 
        })

    describe('deployment', async () => {
        // test samples with writing it 
         it('deploys successfuly', async () => {
             const address = contract.address;
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
            assert.notEqual(address, 0x0)
        })
    
        it('the founder has 1000000 tokens', async () => {
            const founderBalance = await contract.balanceOf(founder)
            assert.equal(founderBalance, '1000000')
            //assert.equal(founderBalance, tokens('0.000000000001'))     
        })
    })
        
    describe('investing', async () =>{
        it('issues tokens', async () => {
            await contract.invest({from: customer1, value:'1000000000000000000'})
            const customer1Balance = await contract.balanceOf(customer1)
            assert.equal(customer1Balance, '1000')
            //assert.equal(customerBalance, tokens('0.000000000000001') )
        })

        it('issues tokens after being sent ether', async ()=> {
            await contract.sendTransaction({from: customer2, value: '1000000000000000000'})
            const customer2Balance = await contract.balanceOf(customer2)
            assert.equal(customer2Balance, '1000')

        })

    })

    describe('transferring tokens', async () => {

        it('transfers tokens using transfer()', async ()=> {
            await contract.transfer(customer2, '500')
            const customer2Balance = await contract.balanceOf(customer2) 
            assert.equal(customer2Balance, '1500')
        })

        it('approves tokens', async ()=> {
            await contract.approve(customer2,'5000')
            const allowance2 = await contract.allowance(founder, customer2)
            assert.equal(allowance2,'5000')           
        })

        it('transfers tokens using transferFrom()', async ()=> {
            await contract.transferFrom(founder, customer2, '500', {from: customer2})
            const customer2Balance = await contract.balanceOf(customer2) 
            assert.equal(customer2Balance, '2000')
        })

        it('transfers tokens to account3', async ()=> {
            await contract.transfer(customer3, '3000')
            const customer3Balance = await contract.balanceOf(customer3)
            assert.equal(customer3Balance, '3000')
        })

        it('approves from a different customer', async () =>{
            await contract.approve(customer1, '3000', {from: customer3})
            const allowance1 = await contract.allowance(customer3, customer1)
            assert.equal(allowance1, '3000')
        })




    })
})