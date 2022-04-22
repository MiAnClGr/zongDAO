const zongDAO = artifacts.require('./zongDAO.sol')
const zongICO = artifacts.require('./zongICO.sol')
const zongToken = artifacts.require('./zongToken.sol')

module.exports = async function (deployer, network, accounts) {
    
  await deployer.deploy(zongDAO);

  await deployer.deploy(zongICO, accounts[0]);

  await deployer.deploy(zongToken);

  };
  