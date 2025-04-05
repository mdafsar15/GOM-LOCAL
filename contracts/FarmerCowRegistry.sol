// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract FarmerCowRegistry is ERC721, Ownable {
    enum AdoptionStatus { Pending, Approved, Rejected, Registered }
    
    struct Cow {
        uint256 cowId;
        string breed;
        uint256 birthDate;
        string healthStatus;
        string ipfsHash;
        address farmerAddress;
        address adopterAddress;
        uint256 registrationTimestamp;
        string farmerTransactionId;
        uint256 price;
        AdoptionStatus status;
    }

    // Mappings
    mapping(uint256 => Cow) private _cows;
    mapping(address => uint256[]) private _pendingAdoptions;
    mapping(address => uint256) private _gominiBalances;
    
    // Counter
    uint256 private _nextTokenId = 1;

    // Events
    event AdoptionRequested(uint256 indexed cowId, address farmer, address adopter);
    event AdoptionApproved(uint256 indexed cowId, address adopter);
    event AdoptionRejected(uint256 indexed cowId, address adopter);
    event CowRegistered(uint256 indexed cowId, address farmer);
    event DepositMade(address indexed farmer, uint256 amount);
    event WithdrawalMade(address indexed farmer, uint256 amount);

    constructor() ERC721("FarmerCowToken", "FCT") Ownable() {}

    // Adoption Functions
    function requestAdoption(
        string memory breed,
        uint256 birthDate,
        string memory healthStatus,
        string memory ipfsHash,
        string memory farmerTransactionId,
        uint256 price,
        address adopter
    ) external returns (uint256) {
        uint256 cowId = _nextTokenId++;
        _cows[cowId] = Cow({
            cowId: cowId,
            breed: breed,
            birthDate: birthDate,
            healthStatus: healthStatus,
            ipfsHash: ipfsHash,
            farmerAddress: msg.sender,
            adopterAddress: adopter,
            registrationTimestamp: 0,
            farmerTransactionId: farmerTransactionId,
            price: price,
            status: AdoptionStatus.Pending
        });
        
        _pendingAdoptions[adopter].push(cowId);
        emit AdoptionRequested(cowId, msg.sender, adopter);
        return cowId;
    }

    function approveAdoption(uint256 cowId) external {
        require(_cows[cowId].adopterAddress == msg.sender, "Not the designated adopter");
        require(_cows[cowId].status == AdoptionStatus.Pending, "Invalid status");
        
        _cows[cowId].status = AdoptionStatus.Approved;
        _registerCow(cowId);
        emit AdoptionApproved(cowId, msg.sender);
    }

    function rejectAdoption(uint256 cowId) external {
        require(_cows[cowId].adopterAddress == msg.sender, "Not the designated adopter");
        require(_cows[cowId].status == AdoptionStatus.Pending, "Invalid status");
        
        _cows[cowId].status = AdoptionStatus.Rejected;
        emit AdoptionRejected(cowId, msg.sender);
    }

    // Registration Function
    function _registerCow(uint256 cowId) private {
        Cow storage cow = _cows[cowId];
        require(cow.status == AdoptionStatus.Approved, "Not approved");
        require(_gominiBalances[cow.farmerAddress] >= cow.price, "Insufficient balance");

        _gominiBalances[cow.farmerAddress] -= cow.price;
        cow.registrationTimestamp = block.timestamp;
        cow.status = AdoptionStatus.Registered;
        _safeMint(cow.farmerAddress, cowId);
        
        emit CowRegistered(cowId, cow.farmerAddress);
    }

    // Gomini Wallet Functions
    function depositToGominiWallet() external payable {
        require(msg.value > 0, "Amount must be > 0");
        _gominiBalances[msg.sender] += msg.value;
        emit DepositMade(msg.sender, msg.value);
    }

    function withdrawFromGominiWallet(uint256 amount) external {
        require(amount > 0, "Amount must be > 0");
        require(_gominiBalances[msg.sender] >= amount, "Insufficient balance");
        
        _gominiBalances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
        emit WithdrawalMade(msg.sender, amount);
    }

    // View Functions
    function getPendingAdoptions(address adopter) external view returns (uint256[] memory) {
        return _pendingAdoptions[adopter];
    }

    function getCowDetails(uint256 cowId) external view returns (Cow memory) {
        return _cows[cowId];
    }

    function getGominiBalance(address farmer) external view returns (uint256) {
        return _gominiBalances[farmer];
    }

    function cowExists(uint256 cowId) external view returns (bool) {
        return _exists(cowId);
    }

    // Fallback functions
    receive() external payable {}
    fallback() external payable {}
}