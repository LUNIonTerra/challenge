// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";

interface BananaToken {
    function mint(address receiver) external returns (uint256);
}

contract BananaScoreService {
    using Counters for Counters.Counter;
    address public collectibleTokenAddress;

    struct User {
        bool initialized;
        Counters.Counter score;
    }

    constructor(
        address _tokenAddress
    ) {
        collectibleTokenAddress = _tokenAddress;
    }

    mapping(address => User) public userScores;
    address[] public users;

    event NewUserCreated(address indexed user);
    event ScoreIncremented(address indexed user, uint256 newScore);

    /**
     * @notice method for initializing user calling this method.
     * This is required for user to later increment score.
     */
    function createUser() external userDoesNotExists {
        userScores[msg.sender].initialized = true;
        users.push(msg.sender);
        emit NewUserCreated(msg.sender);
    }

    /**
     * @notice method which allows user to increment score.
     */
    function incrementScore() external userExists {
        userScores[msg.sender].score.increment();
        BananaToken(collectibleTokenAddress).mint(msg.sender);
        emit ScoreIncremented(msg.sender, userScores[msg.sender].score.current());
    }

    /**
     * @notice method list all users which has been initialized.
     */
    function listAllUsers() external view returns (address[] memory) {
        return users;
    }

    /**
     * @notice method go get score for single user based on his address.
     */
    function getScoreForUser(address _userAddress) external view returns (uint256) {
        return userScores[_userAddress].score.current();
    }

    /**
     * @notice method calculating total score for all users.
     * BEWARE - even if view/pure functions dont cost gas they
     * have gas limit as well (but computation are made by public nodes we are connected to).
     * So we should not operate on huge data sets in Smart Contracts to provide reliable system.
     */
    function getTotalScoreForAllUsers() external view returns (uint256) {
        uint256 total = 0;
        for (uint256 i = 0; i < users.length; i++) {
            total += userScores[users[i]].score.current();
        }
        return total;
    }

    /**
     * @notice modifier checking if user exists/has been initialized.
     */
    modifier userExists() {
        require(userScores[msg.sender].initialized, "User does not exist");
        _;
    }

    /**
     * @notice modifier checking if user does not exists/has not been initialized yet.
     */
    modifier userDoesNotExists() {
        require(!userScores[msg.sender].initialized, "User already exist");
        _;
    }
}