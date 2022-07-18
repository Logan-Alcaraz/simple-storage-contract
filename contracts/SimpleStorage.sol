// SPDX-License-Identifier: MIT

pragma solidity 0.8.8;                                                              //initializes to version 0.8.8

contract SimpleStorage {                                                            // creates SimpleStorage contract
    uint256 favoriteNumber;                                                         // initializes favoriteNumber variable (0)

    struct People {                                                                 // creates Person structure that holds a favorite number and name
        uint256 favoriteNumber;
        string name;
    }
    
    People[] public people;                                                         // creates a public array that holds People structures

    mapping(string => uint256) public nameToFavoriteNumber;                         // maps from a name to a favorite number

    function store(uint256 _favoriteNumber) public {                                // function that takes a favorite number parameter and stores it on
        favoriteNumber = _favoriteNumber;                                           // the blockchain
    }
   
    function retrieve() public view returns (uint256) {                             // function that retrieves a favorite number from the blockchain
        return favoriteNumber;
    }

    function addPerson(string memory _name, uint256 _favoriteNumber) public {       // function that takes a name and favorite number and stores it in
        people.push(People(_favoriteNumber, _name));                                //the People array and in the mapping array on the blockchain
        nameToFavoriteNumber[_name] = _favoriteNumber;
    }
}