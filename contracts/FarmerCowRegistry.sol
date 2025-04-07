// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FarmerCowRegistry is ERC721, Ownable {
    enum AdoptionStatus { Pending, Approved, Rejected, Registered }
    
    struct Cow {
        uint256 cowId;
        string breed;
        uint256 birthDate;
        string healthStatus;
        string ipfsHashMetaData;
        string ipfsImages;
        address farmerAddress;
        address adopterAddress;
        uint256 registrationTimestamp;
        string farmerTransactionId;
        uint256 price;
        AdoptionStatus status;
    }

    mapping(uint256 => Cow) private _cows;
    uint256 private _nextTokenId = 1;

    event CowRegistered(
        uint256 indexed cowId, 
        address indexed farmer,
        address indexed adopter,
        string ipfsHashMetaData
    );
    event AdoptionRequested(uint256 indexed cowId, address adopter);
    event AdoptionApproved(uint256 indexed cowId, address adopter);
    event AdoptionRejected(uint256 indexed cowId, address adopter);
    event AdoptionCanceled(uint256 indexed cowId, address adopter);

    constructor() ERC721("FarmerCowToken", "FCT") Ownable() {}

    function registerCow(
        string memory breed,
        uint256 birthDate,
        string memory healthStatus,
        string memory ipfsHashMetaData,
        string memory ipfsImages,
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
            ipfsHashMetaData: ipfsHashMetaData,
            ipfsImages: ipfsImages,
            farmerAddress: msg.sender,
            adopterAddress: adopter,
            registrationTimestamp: 0,
            farmerTransactionId: farmerTransactionId,
            price: price,
            status: AdoptionStatus.Pending
        });
        
        emit AdoptionRequested(cowId, adopter);
        return cowId;
    }

    function approveAdoption(uint256 cowId) external {
        require(_cows[cowId].adopterAddress == msg.sender, "Not the designated adopter");
        require(_cows[cowId].status == AdoptionStatus.Pending, "Invalid status");
        
        _cows[cowId].status = AdoptionStatus.Approved;
        _mintNFT(cowId);
        emit AdoptionApproved(cowId, msg.sender);
    }

    function rejectAdoption(uint256 cowId) external {
        require(_cows[cowId].adopterAddress == msg.sender, "Not the designated adopter");
        require(_cows[cowId].status == AdoptionStatus.Pending, "Invalid status");
        
        _cows[cowId].status = AdoptionStatus.Rejected;
        emit AdoptionRejected(cowId, msg.sender);
    }

    function cancelAdoption(uint256 cowId) external {
        require(_cows[cowId].farmerAddress == msg.sender, "Not the farmer");
        require(_cows[cowId].status == AdoptionStatus.Pending, "Invalid status");
        
        _cows[cowId].status = AdoptionStatus.Rejected;
        emit AdoptionCanceled(cowId, _cows[cowId].adopterAddress);
    }

    function _mintNFT(uint256 cowId) private {
        Cow storage cow = _cows[cowId];
        require(cow.status == AdoptionStatus.Approved, "Not approved");

        cow.registrationTimestamp = block.timestamp;
        cow.status = AdoptionStatus.Registered;
        _safeMint(cow.adopterAddress, cowId);
        
        emit CowRegistered(
            cowId, 
            cow.farmerAddress,
            cow.adopterAddress,
            cow.ipfsHashMetaData
        );
    }

    function getCowDetails(uint256 cowId) external view returns (Cow memory) {
        return _cows[cowId];
    }

    function getCowsByStatus(AdoptionStatus status) external view returns (Cow[] memory) {
        uint256 count = 0;
        for (uint256 i = 1; i < _nextTokenId; i++) {
            if (_cows[i].status == status) {
                count++;
            }
        }

        Cow[] memory result = new Cow[](count);
        uint256 index = 0;
        for (uint256 i = 1; i < _nextTokenId; i++) {
            if (_cows[i].status == status) {
                result[index] = _cows[i];
                index++;
            }
        }
        return result;
    }
}