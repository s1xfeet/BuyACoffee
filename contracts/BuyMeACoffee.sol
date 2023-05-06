//SPDX-License-Identifier: Unlicense

// contracts/BuyMeACoffee.sol
pragma solidity ^0.8.18;

// Switch this to your own contract address once deployed, for bookkeeping!
// Example Contract Address on Goerli: 0xDBa03676a2fBb6711CB652beF5B7416A53c1421D

contract BuyMeACoffee {
    // Event to emit when a Memo is created.
    event NewMemo(
        address indexed from,
        uint256 timestamp,
        string name,
        string message
    );
    
    // Memo struct.
    struct Memo {
        address from;
        uint256 timestamp;
        string name;
        string message;
    }
    
    // Address of contract deployer. Marked payable so that
    // we can withdraw to this address later.
    address payable owner;

    // List of all memos received from coffee purchases.
    Memo[] memos;

    constructor() {
        // Store the address of the deployer as a payable address.
        // When we withdraw funds, we'll withdraw here.
        owner = payable(msg.sender);
    }

    /**
     * @dev buy a coffee for owner (sends an ETH tip and leaves a memo)
     * @param _name name of the coffee purchaser
     * @param _message a nice message from the purchaser
     */
    function buyCoffee(string memory _name, string memory _message) public payable {
        require(msg.value > 0, "Cant buy coffee with 0 eth");

        // Add to storage
        memos.push(Memo(
            msg.sender,
            block.timestamp,
            _name,
            _message
        ));
        
        emit NewMemo(
            msg.sender,
            block.timestamp,
            _name,
            _message
        );
    }

    // send contract balance to owner
    function withdrawTips() public{
        require(owner.send(address(this).balance));
    }

    // retrieve all memos stored, returns an array of type 'Memo' 
    function getMemos() public view returns(Memo[]memory){
        return memos;
    }
}