// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "./zongICO.sol";

contract DAO is zongICO(payable(msg.sender)) {

    struct Proposal {
        uint id;
        string name;
        uint amount;
        address payable recipient;
        uint votes;
        uint end;
        bool executed;
    }

    mapping(address => bool) public investors;
    //mapping(address => uint) public shares;
    mapping(address => mapping(uint => bool)) public votes;
    mapping(uint => Proposal) public Proposals;

    uint public totalShares;
    uint public availableFunds;
    uint public contributionEnd;
    uint public nextProposalId;
    uint public voteTime;
    uint public quorum;
    
    //address public admin;

    //add back in to constructor - uint contributionTime, uint _voteTime, uint _quorum
    constructor(uint _quorum) { 
        require(_quorum > 0 && _quorum < 5, "Max Contributors reached");    
        //contributionEnd = block.timestamp + contributionTime;
        //voteTime = _voteTime;
        quorum = _quorum;
        //admin = msg.sender;
    }

    function contribute() payable external {
        require(block.timestamp < saleEnd, "Contributions have ended");     
        investors[msg.sender] = true;
        invest();
        availableFunds += msg.value;
    }

    function redeemShares(uint amount) external {
        require(balances[msg.sender] >= amount);
        //require(availableFunds >= amount);     
        balances[msg.sender] -= amount;
        availableFunds -= amount;
        payable(msg.sender).transfer(amount);
    }

    function transferZong(uint amount, address to) external {
        require(balances[msg.sender] >= amount);
        balances[msg.sender] -= amount;
        balances[to] += amount;
        investors[to] = true;
    }

    function createProposal(string memory name, uint amount, address payable recipient) public {
        require(availableFunds >= amount);
        Proposals[nextProposalId] = Proposal(
            nextProposalId,
            name,
            amount,
            recipient,
            0,
            voteTime = block.timestamp,
            false
        );
        availableFunds -= amount;
        nextProposalId ++;
    }

    function vote(uint proposalId) external {
        Proposal storage proposal = Proposals[proposalId];
        require(votes[msg.sender][proposalId] == false);
        require(block.timestamp < proposal.end);

        votes[msg.sender][proposalId] = true;
        proposal.votes = balances[msg.sender];

    }

    function executeProposal(uint proposalId) external {
        Proposal storage proposal = Proposals[proposalId];
        require(block.timestamp >= proposal.end);
        require(proposal.executed == false);
        //require((proposal.votes / totalShares) +100 <= quorum);
        proposal.recipient.transfer(proposal.amount);

    }

    function withdrawEther(uint amount, address payable to) internal {
        transferEther(amount, to);

    }

    function transferEther(uint amount, address payable to) internal {
        require(amount >= availableFunds);
        availableFunds -= amount;
        to.transfer(amount);
    }

}