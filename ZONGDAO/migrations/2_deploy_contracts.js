const zongDAO = artifacts.require('zongDAO')
const zongICO = artifacts.require('zongICO')
const zongToken = artifacts.require('zongToken')

module.exports = async function (deployer, network, accounts) {
    
  await deployer.deploy(zongDAO);

  await deployer.deploy(zongICO, accounts[0]);

  await deployer.deploy(zongToken);

  };
  