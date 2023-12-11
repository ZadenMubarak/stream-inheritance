// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.20;

interface IStreamVault {
    function claim() external;
    function pay() external payable;
}


contract StreamVault {
    string public beneficiaryMetaData;
    address public creatorAddress;
    address payable public beneficiary;

    address immutable ParentContract;

    constructor(address _creatorAddress, address payable _beneficiary, string memory _beneficiaryMetaData, address _parent) {
        creatorAddress = _creatorAddress;
        beneficiary = _beneficiary;
        beneficiaryMetaData = _beneficiaryMetaData;
        ParentContract = _parent;
    }

    function claim() public {
        require(msg.sender == ParentContract, "Only the beneficiary can claim");
        require(address(this).balance == 0, "No funds to claim");
        
        // Transfer funds to the beneficiary
        transferFunds(beneficiary, address(this).balance);
    }

    function transferFunds(address payable _to, uint256 amount) internal {
        require(amount > 0, "Amount must be greater than 0");
        (bool sent, ) = _to.call{value: amount}("");
        require(sent, "Failed to send Value");
    } 

    function isBeneficiary(address _beneficiaryToCheck)public view returns(bool _beneficiary){
        _beneficiary = beneficiary == _beneficiaryToCheck;
    }

    receive() external payable {}
}
