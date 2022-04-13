// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "./ZongICO.sol";

contract DAO is zongICO(payable(msg.sender)) {


    /* ZONG enters the metaverse  */

    struct Proposal {
        uint id;
        string name;
        // uint amount;
        // address payable recipient;
        uint votes;
        uint end;
        bool executed;
    }

    mapping(address => bool) public zongTokenHolder;
    mapping(address => mapping(uint => bool)) public votes;
    mapping(uint => Proposal) public Proposals;

    uint public totalShares;
    uint public zongInCirculation;
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
       // require(block.timestamp < saleEnd, "Contributions have ended");     
        zongTokenHolder[msg.sender] = true;
        invest();
        zongInCirculation += msg.value;
    }


    function transferZong(uint amount, address to) external {
        require(balances[msg.sender] >= amount);
        balances[msg.sender] -= amount;
        balances[to] += amount;
        zongTokenHolder[to] = true;
    }

    function createProposal(string memory name /*uint amount, address payable recipient*/) public {
        //require(availableFunds >= amount);
        Proposals[nextProposalId] = Proposal(
            nextProposalId,
            name,
            // amount,
            // recipient,
            0,
            voteTime = block.timestamp,
            false
        );
        //availableFunds -= amount;
        nextProposalId ++;
    }

    function vote(uint proposalId) external {
        Proposal storage proposal = Proposals[proposalId];
        require(votes[msg.sender][proposalId] == false);
        //require(block.timestamp < proposal.end);

        votes[msg.sender][proposalId] = true;
        proposal.votes += balances[msg.sender];

    }

    function hasVoted(uint proposalId) public view returns(bool) {
        if(votes[msg.sender][proposalId]){
            return true;
        }else{
            return false;
        }
    }

    function executeProposal(uint proposalId) view external {
        Proposal storage proposal = Proposals[proposalId];
        //require(block.timestamp >= proposal.end);
        require(proposal.executed == false);
        proposal.executed == true;
        //require((proposal.votes / totalShares) +100 <= quorum);
        //proposal.recipient.transfer(proposal.amount);

    }

    function currentTime() public view returns(uint)  {
        return block.timestamp;
    }

  

}
