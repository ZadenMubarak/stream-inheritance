// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0;

import './StreamVault.sol';

contract StreamInherit {

    struct Vault {
        address vaultAddress;
        address beneficiaryAddress;
        string beneficiaryMetaData;
    }

    mapping(address => Vault) vaultMapping;

    constructor() payable {
        require(msg.value > 0, "Send funds to the contract");
    }

    function createStreamVault(address payable _beneficiary, string memory _meta)public {
        StreamVault streamVaultAddress = new StreamVault(msg.sender, _beneficiary, _meta, address(this));
        vaultMapping[msg.sender] = Vault(address(streamVaultAddress), _beneficiary, _meta);
    }

    function closeVault(uint _balance) public {
        require(_balance > 0, "Balance must be greater than 0");
        require(vaultMapping[msg.sender].vaultAddress != address(0), "Zero Addr");
        IStreamVault(vaultMapping[msg.sender].vaultAddress).claim();
    }

    function callClaim(address vaultCreator) public {
        require(vaultMapping[vaultCreator].vaultAddress != address(0), "Zero Addr");
        require(vaultMapping[vaultCreator].beneficiaryAddress != address(0), "Zero Addr");
        require(vaultMapping[vaultCreator].beneficiaryAddress == msg.sender, "Not Beneficiary!");
        IStreamVault(vaultMapping[vaultCreator].vaultAddress).claim();
    }

    function streamOf(address _creator)external view returns(Vault memory _value){
        _value = vaultMapping[_creator];
    }

    receive() external payable {}
}
