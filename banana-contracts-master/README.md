# Banana Contracts

NFTBanana deployed to 0xF62C8Bc1428d123Be3246C3950c0b5596a604C8F

BananaScoreService deployed to 0xFD94b05C52fEF5c8c688981d8B820fdc3f013973

This repository contains two smart contracts:
- NFTBanana.sol - ERC721 token representation
- BananaScoreService.sol - custom contract for storing users, their score and incrementing it
and their tests under test/ directory.

Things that could be improved in terms of Smart Contracts:
- creating new key/user on demand make no sense since if we use mapping in Solidity we don't have to set keys, if keys are addresses they already exist, and it's enough to just set values for them (for us it would be just score)
- calculations on arrays which has no fixed length may be dangerous in terms of gas limit when arrays are huge, at some point we may exceed gas limit and we will be unable to write/read using specific methods
- Counters from openzeppelin has been used for any numeric values and operations on them, it would be more efficient to implement these with the use of uint8 or uint16 if we would be sure that scoring would have it's limit
- for bigger security and trust proxy smart contract can be used to upgrade 'custom contract' created for sake of PoC to modify the behavior of a deployed contract without disrupting its users or requiring them to migrate to a new contract

Smart contracts tested and deployed with the use of Hardhat https://hardhat.org/

To test
```yarn test```

To compile
```yarn compile```

To deploy
```yarn deploy```
