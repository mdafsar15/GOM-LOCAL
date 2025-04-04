// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract FarmerCowRegistry is ERC721, Ownable {
    // Struct to store cow information
    struct Cow {
        uint256 cowId;
        string breed;
        uint256 birthDate;
        string healthStatus;
        string ipfsHash;
        address farmerAddress;
        uint256 registrationTimestamp;
        string farmerTransactionId;
        uint256 price;
    }

    // Mapping from token ID to Cow struct
    mapping(uint256 => Cow) private _cows;

    // Mapping from farmer address to their balance in the Gomini wallet
    mapping(address => uint256) private _gominiBalances;

    // Counter for token IDs
    uint256 private _nextTokenId = 1;

    // Event declarations
    event CowRegistered(
        uint256 indexed cowId,
        address indexed farmer,
        uint256 price,
        uint256 tokenId,
        string transactionId
    );
    event DepositMade(address indexed farmer, uint256 amount);
    event WithdrawalMade(address indexed farmer, uint256 amount);

    constructor() ERC721("FarmerCowToken", "FCT") Ownable() {}

    /**
     * @dev Register a new cow with all details
     * @param breed The breed of the cow
     * @param birthDate Unix timestamp of cow's birth date
     * @param healthStatus Current health status of the cow
     * @param ipfsHash IPFS hash containing cow metadata and image
     * @param farmerTransactionId Farmer's transaction ID for reference
     * @param price Price of the cow in wei (1 Rs = ? wei, needs conversion)
     */
    function registerCow(
        string memory breed,
        uint256 birthDate,
        string memory healthStatus,
        string memory ipfsHash,
        string memory farmerTransactionId,
        uint256 price
    ) external returns (uint256, uint256) {
        require(price > 0, "Price must be greater than zero");
        require(_gominiBalances[msg.sender] >= price, "Insufficient balance in Gomini wallet");

        // Deduct the price from the Gomini wallet
        _gominiBalances[msg.sender] -= price;

        // Create new cow record
        uint256 tokenId = _nextTokenId++;
        Cow memory newCow = Cow({
            cowId: tokenId,
            breed: breed,
            birthDate: birthDate,
            healthStatus: healthStatus,
            ipfsHash: ipfsHash,
            farmerAddress: msg.sender,
            registrationTimestamp: block.timestamp,
            farmerTransactionId: farmerTransactionId,
            price: price
        });

        _cows[tokenId] = newCow;
        _safeMint(msg.sender, tokenId);

        emit CowRegistered(tokenId, msg.sender, price, tokenId, farmerTransactionId);
        return (tokenId, price);
    }

    /**
     * @dev Deposit funds into the Gomini wallet
     */
    function depositToGominiWallet() external payable {
        require(msg.value > 0, "Deposit amount must be greater than zero");
        _gominiBalances[msg.sender] += msg.value;
        emit DepositMade(msg.sender, msg.value);
    }

    /**
     * @dev Withdraw funds from the Gomini wallet
     * @param amount Amount to withdraw in wei
     */
    function withdrawFromGominiWallet(uint256 amount) external {
        require(amount > 0, "Withdrawal amount must be greater than zero");
        require(_gominiBalances[msg.sender] >= amount, "Insufficient balance in Gomini wallet");

        _gominiBalances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);

        emit WithdrawalMade(msg.sender, amount);
    }

    /**
     * @dev Get cow details by token ID
     * @param tokenId The ID of the cow token
     */
    function getCowDetails(uint256 tokenId) external view returns (Cow memory) {
        require(_exists(tokenId), "Cow does not exist");
        return _cows[tokenId];
    }

    /**
     * @dev Get Gomini wallet balance for a farmer
     * @param farmer Address of the farmer
     */
    function getGominiBalance(address farmer) external view returns (uint256) {
        return _gominiBalances[farmer];
    }

    /**
     * @dev Check if a cow exists by token ID
     * @param tokenId The ID of the cow token
     */
    function cowExists(uint256 tokenId) external view returns (bool) {
        return _exists(tokenId);
    }

    // Function to receive Ether. msg.data must be empty
    receive() external payable {}

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}
}