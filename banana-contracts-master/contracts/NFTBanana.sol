// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTBanana is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter public totalMinted;
    address[] public tokenOwners;
    string public defaultTokenUri;

    constructor(
        string memory _defaultTokenURI
    ) ERC721("BananaNFT", "BNFT") {
        defaultTokenUri = _defaultTokenURI;
    }

    /**
     * @notice method which is used to mint nft to receiver address.
     * Method is also responsible for maintaining token owners table.
     * Available to call only by owner.
     */
    function mint(address receiver)
        public
        onlyOwner
        returns (uint256)
    {
        if (balanceOf(receiver) == 0) {
            tokenOwners.push(receiver);
        }
        uint256 newItemId = totalMinted.current();
        _mint(receiver, newItemId);
        _setTokenURI(newItemId, defaultTokenUri);
        totalMinted.increment();

        return newItemId;
    }

    /**
     * @notice method for receving total minted amount.
     */
    function getTotalMinted()
        public
        view
        returns (uint256)
    {
        return totalMinted.current();
    }

    /**
     * @notice method for receving list of all owners.
     */
    function getAllOwners()
        public
        view
        returns (address[] memory)
    {
        return tokenOwners;
    }
}