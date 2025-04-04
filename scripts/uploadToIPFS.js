const { create } = require('ipfs-http-client');
const fs = require('fs');
const path = require('path');

async function uploadToIPFS(filePath) {
  const ipfs = create({
    host: 'localhost',
    port: 5001,
    protocol: 'http'
  });

  try {
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    // Upload image
    const file = fs.readFileSync(filePath);
    const imageResult = await ipfs.add({
      path: path.basename(filePath),
      content: file
    });

    // Create metadata
    const metadata = {
      name: `Cow ${path.basename(filePath)}`,
      description: "Registered cow information",
      image: `ipfs://${imageResult.cid}`,
      attributes: []
    };

    // Upload metadata
    const metadataResult = await ipfs.add({
      path: 'metadata.json',
      content: JSON.stringify(metadata)
    });

    return {
      imageCID: imageResult.cid.toString(),
      metadataCID: metadataResult.cid.toString()
    };
  } catch (error) {
    console.error('Upload failed:', error);
    throw error;
  }
}

module.exports = { uploadToIPFS };