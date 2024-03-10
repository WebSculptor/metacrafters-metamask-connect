// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleContract {
    uint256 public data;

    // Function to set data
    function setData(uint256 _data) public {
        data = _data;
    }

    // Function to double the data
    function doubleData() public {
        data *= 2;
    }

    // Function to get the current data
    function getData() public view returns (uint256) {
        return data;
    }
}
