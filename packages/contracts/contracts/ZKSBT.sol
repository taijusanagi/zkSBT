// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract ZKSBT is ERC721Enumerable {
  constructor() ERC721("ZKSBT", "ZKSBT") {}

  mapping(uint256 => bytes32) hashes;

  function issue(address to, bytes32 hash) public {
    uint256 tokenId = totalSupply();
    _mint(to, tokenId);
    hashes[tokenId] = hash;
  }

  function verify(uint256 tokenId, bytes memory data) public view returns (bool) {
    return keccak256(data) == hashes[tokenId];
  }
}
