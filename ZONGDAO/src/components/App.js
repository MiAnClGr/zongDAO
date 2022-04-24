import React, { Component } from 'react'
import './App.css'
import Web3 from 'web3'
import Main from './Main.js'
import ZongToken from  '../truffle_abis/zongToken.json'
import ZongICO from  '../truffle_abis/zongICO.json'
import ZongDAO from  '../truffle_abis/zongDAO.json'

class App extends Component {

    async componentWillMount() {
        await this.loadWeb3()
        await this.loadBlockchainData()
    }

    async loadWeb3() {
        if(window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        } else if(window.web3) {
            window.web3 = new Web3(window.web3.currentprovider)
            } else {
                window.alert('No Ethereum browser detected')
            }
           
        
    }

    async loadBlockchainData(){
        const web3 = await window.web3
        const account = await web3.eth.getAccounts()
        this.setState({account: account[0]})
        console.log(account)
        const networkId = await web3.eth.net.getId()
        console.log(networkId)

        const zongTokenData = ZongToken.networks[networkId]
        if(zongTokenData) {
            const zongToken = new web3.eth.Contract(ZongToken.abi, zongTokenData.address)
            this.setState({zongToken})
            let founder = await zongToken.methods.founder().call()
            console.log(founder)
            let remainingZongTokens = await zongToken.methods.balanceOf(founder).call()
            console.log(remainingZongTokens)
            this.setState({RemainingZongTokens: remainingZongTokens.toString()})
        }

        const zongICOData = ZongICO.networks[networkId]
        if(zongICOData) {
            const zongICO = new web3.eth.Contract(ZongICO.abi, zongICOData.address)
            this.setState({zongICO})
        }

        const zongDAOData = ZongDAO.networks[networkId]
        if(zongDAOData) {
            const zongDAO = new web3.eth.Contract(ZongDAO.abi, zongDAOData.address)
            this.setState({zongDAO})
            let time = await zongDAO.methods.currentTime().call()
            console.log(time)
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            account: '0x0',
            ZongToken: {},
            ZongICO: {},
            ZongDAO: {},
            RemainingZongTokens: '',
            loading: true

        }

    }

    render() {
        return(
            <div>
                <Main/>
                
            </div>
        )
    }
}

export default App;