$ npm init -y
Wrote to D:\NFT\gomini-03-04-2025\package.json:

{
  "name": "gomini-03-04-2025",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}



afsar@LAPTOP-N7DVKU0K MINGW64 /d/NFT/gomini-03-04-2025
$ npm install --save-dev hardhat
npm WARN deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.
npm WARN deprecated glob@8.1.0: Glob versions prior to v9 are no longer supported
npm WARN deprecated ethereumjs-abi@0.6.8: This library has been deprecated and usage is discouraged.

added 247 packages, and audited 248 packages in 27s

55 packages are looking for funding
  run `npm fund` for details

3 low severity vulnerabilities

To address all issues, run:
  npm audit fix

Run `npm audit` for details.

afsar@LAPTOP-N7DVKU0K MINGW64 /d/NFT/gomini-03-04-2025
$ npm install --save-dev hardhat
npm WARN deprecated lodash.isequal@4.5.0: This package is deprecated. Use require('node:util').isDeepStrictEqual instead.
npm WARN deprecated multiaddr-to-uri@8.0.0: This module is deprecated, please upgrade to @multiformats/multiaddr-to-uri
npm WARN deprecated glob@7.2.3: Glob versions prior to v9 are no longer supported
npm WARN deprecated glob@7.2.3: Glob versions prior to v9 are no longer supported
npm WARN deprecated glob@5.0.15: Glob versions prior to v9 are no longer supported
npm WARN deprecated glob@7.1.7: Glob versions prior to v9 are no longer supported
npm WARN deprecated multiaddr@10.0.1: This module is deprecated, please upgrade to @multiformats/multiaddr
npm WARN deprecated ipfs-core-types@0.10.3: js-IPFS has been deprecated in favour of Helia - please see https://github.com/ipfs/js-ipfs/issues/4336 for details
npm WARN deprecated ipfs-core-utils@0.14.3: js-IPFS has been deprecated in favour of Helia - please see https://github.com/ipfs/js-ipfs/issues/4336 for details
npm WARN deprecated ipfs-http-client@56.0.3: js-IPFS has been deprecated in favour of Helia - please see https://github.com/ipfs/js-ipfs/issues/4336 for details

added 401 packages, and audited 649 packages in 51s

104 packages are looking for funding
  run `npm fund` for details

16 vulnerabilities (13 low, 3 high)

To address issues that do not require attention, run:
  npm audit fix

To address all issues possible (including breaking changes), run:
  npm audit fix --force

Some issues need review, and may require choosing
a different dependency.

Run `npm audit` for details.

afsar@LAPTOP-N7DVKU0K MINGW64 /d/NFT/gomini-03-04-2025
$ npx hardhat
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

Welcome to Hardhat v2.22.19

√ What do you want to do? · Create a JavaScript project
√ Hardhat project root: · D:\NFT\gomini-03-04-2025
√ Do you want to add a .gitignore? (Y/n) · y

Project created

See the README.md file for some example tasks you can run

Give Hardhat a star on Github if you're enjoying it!

     https://github.com/NomicFoundation/hardhat


DEPRECATION WARNING

 Initializing a project with npx hardhat is deprecated and will be removed in the future.
 Please use npx hardhat init instead.



afsar@LAPTOP-N7DVKU0K MINGW64 /d/NFT/gomini-03-04-2025
$ npm install --save-dev @nomicfoundation/hardhat-toolbox dotenv
npm WARN idealTree Removing dependencies.dotenv in favor of devDependencies.dotenv

up to date, audited 649 packages in 3s

104 packages are looking for funding
  run `npm fund` for details

16 vulnerabilities (13 low, 3 high)

To address issues that do not require attention, run:
  npm audit fix

To address all issues possible (including breaking changes), run:
  npm audit fix --force

Some issues need review, and may require choosing
a different dependency.

Run `npm audit` for details.

afsar@LAPTOP-N7DVKU0K MINGW64 /d/NFT/gomini-03-04-2025
$ npx hardhat compile
Compiled 1 Solidity file successfully (evm target: paris).

afsar@LAPTOP-N7DVKU0K MINGW64 /d/NFT/gomini-03-04-2025
$ npx hardhat run scripts/deploy.js --network polygon_amoy
Deploying contracts with the account: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
CowRegistry deployed to 0x5e73679B61D14516ce7C30c7daC6F1da3C51D626

afsar@LAPTOP-N7DVKU0K MINGW64 /d/NFT/gomini-03-04-2025
$ npx hardhat run scripts/registerCow.js --network polygon_amoy
Registration TX: 0x45003d791fcb6be620c2d52f37ddfc0d1c88222d9d6926840e3a28371bf4c0ee
Cow registered!
Registered Cow Data: Result(7) [
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '0x0000000000000000000000000000000000000000',
  0n
]

afsar@LAPTOP-N7DVKU0K MINGW64 /d/NFT/gomini-03-04-2025
$ npx hardhat run scripts/registerCow.js --network polygon_amoy
Transaction mined in block: 20006759
Stored txHash: 0x876c7ccda83d5f4b9db4fa51127c9596bf948f22c9c1b940808cf1064bb0859e
Registered Cow Data: Result(7) [
  'COW-001',
  'Holstein',
  '2023-01-15',
  'Excellent',
  'QmX9JHgv2NJKLp9...',
  '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  1743702390n
]

afsar@LAPTOP-N7DVKU0K MINGW64 /d/NFT/gomini-03-04-2025
$ ipfs pin ls | grep QmY31ecPhegeZ9vMiRjqvj1VZVUCWW4rbGSbps2he544TB
QmY31ecPhegeZ9vMiRjqvj1VZVUCWW4rbGSbps2he544TB recursive

afsar@LAPTOP-N7DVKU0K MINGW64 /d/NFT/gomini-03-04-2025
$ ipfs pin ls | grep QmY31ecPhegeZ9vMiRjqvj1VZVUCWW4rbGSbps2he544TB
QmY31ecPhegeZ9vMiRjqvj1VZVUCWW4rbGSbps2he544TB recursive

afsar@LAPTOP-N7DVKU0K MINGW64 /d/NFT/gomini-03-04-2025
$ npx hardhat run scripts/registerCow.js --network polygon_amoy
Transaction mined in block: 20006807
Stored txHash: 0x938003d16d17f3e5bbdcb9a8fbce9d237a4f61457b93cfdccb7583b41e161335
Registered Cow Data: Result(7) [
  'COW-001',
  'Holstein',
  '2023-01-15',
  'Excellent',
  'QmY31ecPhegeZ9vMiRjqvj1VZVUCWW4rbGSbps2he544TB...',
  '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  1743702492n
]

afsar@LAPTOP-N7DVKU0K MINGW64 /d/NFT/gomini-03-04-2025
$ ipfs pin ls
QmUNLLsPACCz1vLxQVkXqqLX5R1X345qqfHbsf67hvA3Nn recursive
QmY31ecPhegeZ9vMiRjqvj1VZVUCWW4rbGSbps2he544TB recursive

afsar@LAPTOP-N7DVKU0K MINGW64 /d/NFT/gomini-03-04-2025
$ npx hardhat run scripts/registerCow.js --network polygon_amoy
Image uploaded to IPFS with CID: QmQCc4sZEHP8s95Z5uWZDVjxVw4HbDxqrU1pqETijN5ghX
Metadata uploaded to IPFS with CID: QmPbqF3UrGAkRHKYv5RfGkBFnwFE1tqd5bYH1auStkJSSd
Transaction hash: 0x574dbd2b35277ad5a66b1f7001484007501be33bc89d09b3110af53188c154dc
Registered in block 20007236
Stored cow data: Result(7) [
  'COW-001',
  'Holstein',
  '2023-01-15',
  'Excellent',
  'QmPbqF3UrGAkRHKYv5RfGkBFnwFE1tqd5bYH1auStkJSSd',
  '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  1743703404n
]

afsar@LAPTOP-N7DVKU0K MINGW64 /d/NFT/gomini-03-04-2025
$ npx hardhat compile
DeclarationError: Undeclared identifier.
  --> contracts/CowRegistry.sol:71:9:
   |
71 |         _setTokenURI(tokenId, string(abi.encodePacked("ipfs://", _ipfsHash)));
   |         ^^^^^^^^^^^^


DeclarationError: Undeclared identifier.
   --> contracts/CowRegistry.sol:162:27:
    |
162 |             tokenIds[i] = tokenOfOwnerByIndex(farmer, i);
    |                           ^^^^^^^^^^^^^^^^^^^


Error HH600: Compilation failed

For more info go to https://hardhat.org/HH600 or run Hardhat with --show-stack-traces

afsar@LAPTOP-N7DVKU0K MINGW64 /d/NFT/gomini-03-04-2025
$ npx hardhat compile
DeclarationError: Undeclared identifier.
  --> contracts/CowRegistry.sol:65:9:
   |
65 |         _setTokenURI(tokenId, string(abi.encodePacked("ipfs://", _ipfsHash)));
   |         ^^^^^^^^^^^^


DeclarationError: Undeclared identifier. "getCowByTxHash" is not (or not yet) visible at this point.
   --> contracts/CowRegistry.sol:119:16:
    |
119 |         return getCowByTxHash(txHash);
    |                ^^^^^^^^^^^^^^


DeclarationError: Undeclared identifier.
   --> contracts/CowRegistry.sol:132:27:
    |
132 |             tokenIds[i] = tokenOfOwnerByIndex(farmer, i);
    |                           ^^^^^^^^^^^^^^^^^^^


Error HH600: Compilation failed

For more info go to https://hardhat.org/HH600 or run Hardhat with --show-stack-traces

afsar@LAPTOP-N7DVKU0K MINGW64 /d/NFT/gomini-03-04-2025
$ npx hardhat compile
DeclarationError: Undeclared identifier.
  --> contracts/CowRegistry.sol:71:9:
   |
71 |         _setTokenURI(tokenId, string(abi.encodePacked("ipfs://", _ipfsHash)));
   |         ^^^^^^^^^^^^


DeclarationError: Undeclared identifier.
   --> contracts/CowRegistry.sol:162:27:
    |
162 |             tokenIds[i] = tokenOfOwnerByIndex(farmer, i);
    |                           ^^^^^^^^^^^^^^^^^^^


Error HH600: Compilation failed

For more info go to https://hardhat.org/HH600 or run Hardhat with --show-stack-traces

afsar@LAPTOP-N7DVKU0K MINGW64 /d/NFT/gomini-03-04-2025
$ npx hardhat compile
Nothing to compile

afsar@LAPTOP-N7DVKU0K MINGW64 /d/NFT/gomini-03-04-2025
$ npx hardhat compile
TypeError: Derived contract must override function "_burn". Two or more base classes define function with same name and parameter types.
 --> contracts/CowRegistry.sol:9:1:
  |
9 | contract CowRegistry is ERC721, ERC721URIStorage, Ownable {
  | ^ (Relevant source part starts here and spans across multiple lines).
Note: Definition in "ERC721":
   --> @openzeppelin/contracts/token/ERC721/ERC721.sol:299:5:
    |
299 |     function _burn(uint256 tokenId) internal virtual {
    |     ^ (Relevant source part starts here and spans across multiple lines).
Note: Definition in "ERC721URIStorage":
  --> @openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol:67:5:
   |
67 |     function _burn(uint256 tokenId) internal virtual override {
   |     ^ (Relevant source part starts here and spans across multiple lines).


TypeError: Wrong argument count for modifier invocation: 1 arguments given but expected 0.
  --> contracts/CowRegistry.sol:40:9:
   |
40 |         Ownable(msg.sender)
   |         ^^^^^^^^^^^^^^^^^^^


Error HH600: Compilation failed

For more info go to https://hardhat.org/HH600 or run Hardhat with --show-stack-traces

afsar@LAPTOP-N7DVKU0K MINGW64 /d/NFT/gomini-03-04-2025
$ npx hardhat compile
Nothing to compile

afsar@LAPTOP-N7DVKU0K MINGW64 /d/NFT/gomini-03-04-2025
$ npx hardhat run scripts/cowRegistry.js --network polygon_amoy
Error HH601: Script scripts/cowRegistry.js doesn't exist.

For more info go to https://hardhat.org/HH601 or run Hardhat with --show-stack-traces

afsar@LAPTOP-N7DVKU0K MINGW64 /d/NFT/gomini-03-04-2025
$ npx hardhat run scripts/registerCow.js --network polygon_amoy
Compiled 1 Solidity file successfully (evm target: paris).

D:\NFT\gomini-03-04-2025\scripts\registerCow.js:2
const { parseEther } = ethers.utils;
        ^
TypeError: Cannot destructure property 'parseEther' of 'ethers.utils' as it is undefined.
    at Object.<anonymous> (D:\NFT\gomini-03-04-2025\scripts\registerCow.js:2:9)
    at Module._compile (node:internal/modules/cjs/loader:1529:14)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1613:10)
    at Module.load (node:internal/modules/cjs/loader:1275:32)
    at Function.Module._load (node:internal/modules/cjs/loader:1096:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:164:12)
    at node:internal/main/run_main_module:28:49

afsar@LAPTOP-N7DVKU0K MINGW64 /d/NFT/gomini-03-04-2025
$ npm install @nomiclabs/hardhat-ethers ethers
npm ERR! code ERESOLVE
npm ERR! ERESOLVE could not resolve
npm ERR!
npm ERR! While resolving: nft-project@1.0.0
npm ERR! Found: ethers@6.13.5
npm ERR! node_modules/ethers
npm ERR!   peer ethers@"^6.1.0" from @nomicfoundation/hardhat-chai-matchers@2.0.8
npm ERR!   node_modules/@nomicfoundation/hardhat-chai-matchers
npm ERR!     peer @nomicfoundation/hardhat-chai-matchers@"^2.0.0" from @nomicfoundation/hardhat-toolbox@5.0.0
npm ERR!     node_modules/@nomicfoundation/hardhat-toolbox
npm ERR!       dev @nomicfoundation/hardhat-toolbox@"^5.0.0" from the root project
npm ERR!   peer ethers@"^6.1.0" from @nomicfoundation/hardhat-ethers@3.0.8
npm ERR!   node_modules/@nomicfoundation/hardhat-ethers
npm ERR!     peer @nomicfoundation/hardhat-ethers@"^3.0.0" from @nomicfoundation/hardhat-chai-matchers@2.0.8
npm ERR!     node_modules/@nomicfoundation/hardhat-chai-matchers
npm ERR!       peer @nomicfoundation/hardhat-chai-matchers@"^2.0.0" from @nomicfoundation/hardhat-toolbox@5.0.0
npm ERR!       node_modules/@nomicfoundation/hardhat-toolbox
npm ERR!         dev @nomicfoundation/hardhat-toolbox@"^5.0.0" from the root project
npm ERR!     peer @nomicfoundation/hardhat-ethers@"^3.0.4" from @nomicfoundation/hardhat-ignition-ethers@0.15.10
npm ERR!     node_modules/@nomicfoundation/hardhat-ignition-ethers
npm ERR!       peer @nomicfoundation/hardhat-ignition-ethers@"^0.15.0" from @nomicfoundation/hardhat-toolbox@5.0.0
npm ERR!       node_modules/@nomicfoundation/hardhat-toolbox
npm ERR!         dev @nomicfoundation/hardhat-toolbox@"^5.0.0" from the root project
npm ERR!     1 more (@nomicfoundation/hardhat-toolbox)
npm ERR!   6 more (@nomicfoundation/hardhat-ignition-ethers, ...)
npm ERR!
npm ERR! Could not resolve dependency:
npm ERR! @nomiclabs/hardhat-ethers@"*" from the root project
npm ERR!
npm ERR! Conflicting peer dependency: ethers@5.8.0
npm ERR! node_modules/ethers
npm ERR!   peer ethers@"^5.0.0" from @nomiclabs/hardhat-ethers@2.2.3
npm ERR!   node_modules/@nomiclabs/hardhat-ethers
npm ERR!     @nomiclabs/hardhat-ethers@"*" from the root project
npm ERR!
npm ERR! Fix the upstream dependency conflict, or retry
npm ERR! this command with --force, or --legacy-peer-deps
npm ERR! to accept an incorrect (and potentially broken) dependency resolution.
npm ERR!
npm ERR! See C:\Users\afsar\AppData\Local\npm-cache\eresolve-report.txt for a full report.

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\afsar\AppData\Local\npm-cache\_logs\2025-04-03T19_56_07_313Z-debug-0.log

afsar@LAPTOP-N7DVKU0K MINGW64 /d/NFT/gomini-03-04-2025
$ npm uninstall @nomiclabs/hardhat-ethers ethers

up to date, audited 649 packages in 6s

104 packages are looking for funding
  run `npm fund` for details

16 vulnerabilities (13 low, 3 high)

To address issues that do not require attention, run:
  npm audit fix

To address all issues possible (including breaking changes), run:
  npm audit fix --force

Some issues need review, and may require choosing
a different dependency.

Run `npm audit` for details.

afsar@LAPTOP-N7DVKU0K MINGW64 /d/NFT/gomini-03-04-2025
$ npm install --legacy-peer-deps @nomiclabs/hardhat-ethers@npm:@nomicfoundation/hardhat-ethers@^3.0.0 ethers@^6.0.0

added 1 package, removed 84 packages, and audited 566 packages in 4s

100 packages are looking for funding
  run `npm fund` for details

6 vulnerabilities (3 low, 3 high)

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.

afsar@LAPTOP-N7DVKU0K MINGW64 /d/NFT/gomini-03-04-2025
$ npx hardhat run scripts/registerCow.js --network polygon_amoy
An unexpected error occurred:

Error: Cannot find module '@nomicfoundation/hardhat-ethers'
Require stack:
- D:\NFT\gomini-03-04-2025\hardhat.config.js
- D:\NFT\gomini-03-04-2025\node_modules\hardhat\internal\core\config\config-loading.js
- D:\NFT\gomini-03-04-2025\node_modules\hardhat\internal\cli\cli.js
- D:\NFT\gomini-03-04-2025\node_modules\hardhat\internal\cli\bootstrap.js
    at Function.Module._resolveFilename (node:internal/modules/cjs/loader:1212:15)
    at Function.Module._load (node:internal/modules/cjs/loader:1043:27)
    at Module.require (node:internal/modules/cjs/loader:1298:19)
    at require (node:internal/modules/helpers:182:18)
    at Object.<anonymous> (D:\NFT\gomini-03-04-2025\hardhat.config.js:3:1)
    at Module._compile (node:internal/modules/cjs/loader:1529:14)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1613:10)
    at Module.load (node:internal/modules/cjs/loader:1275:32)
    at Function.Module._load (node:internal/modules/cjs/loader:1096:12)
    at Module.require (node:internal/modules/cjs/loader:1298:19) {
  code: 'MODULE_NOT_FOUND',
  requireStack: [
    'D:\\NFT\\gomini-03-04-2025\\hardhat.config.js',
    'D:\\NFT\\gomini-03-04-2025\\node_modules\\hardhat\\internal\\core\\config\\config-loading.js',
    'D:\\NFT\\gomini-03-04-2025\\node_modules\\hardhat\\internal\\cli\\cli.js',
    'D:\\NFT\\gomini-03-04-2025\\node_modules\\hardhat\\internal\\cli\\bootstrap.js'
  ]
}

afsar@LAPTOP-N7DVKU0K MINGW64 /d/NFT/gomini-03-04-2025
$ npx hardhat compile
Error HH801: Plugin @nomicfoundation/hardhat-toolbox requires the following dependencies to be installed: @nomicfoundation/hardhat-chai-matchers, @nomicfoundation/hardhat-ethers, @nomicfoundation/hardhat-ignition-ethers, @types/chai, @types/mocha, chai, ts-node, typechain.
Please run: npm install --save-dev "@nomicfoundation/hardhat-chai-matchers@^2.0.0" "@nomicfoundation/hardhat-ethers@^3.0.0" "@nomicfoundation/hardhat-ignition-ethers@^0.15.0" "@types/chai@^4.2.0" "@types/mocha@>=9.1.0" "chai@^4.2.0" "ts-node@>=8.0.0" "typechain@^8.3.0"

For more info go to https://hardhat.org/HH801 or run Hardhat with --show-stack-traces

afsar@LAPTOP-N7DVKU0K MINGW64 /d/NFT/gomini-03-04-2025
$ rm -rf node_modules package-lock.json 

afsar@LAPTOP-N7DVKU0K MINGW64 /d/NFT/gomini-03-04-2025
$ npm install
npm WARN deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.
npm WARN deprecated lodash.isequal@4.5.0: This package is deprecated. Use require('node:util').isDeepStrictEqual instead.
npm WARN deprecated multiaddr-to-uri@8.0.0: This module is deprecated, please upgrade to @multiformats/multiaddr-to-uri
npm WARN deprecated glob@8.1.0: Glob versions prior to v9 are no longer supported
npm WARN deprecated glob@7.2.3: Glob versions prior to v9 are no longer supported
npm WARN deprecated glob@5.0.15: Glob versions prior to v9 are no longer supported
npm WARN deprecated glob@7.2.3: Glob versions prior to v9 are no longer supported
npm WARN deprecated glob@7.1.7: Glob versions prior to v9 are no longer supported
npm WARN deprecated ethereumjs-abi@0.6.8: This library has been deprecated and usage is discouraged.
npm WARN deprecated multiaddr@10.0.1: This module is deprecated, please upgrade to @multiformats/multiaddr
npm WARN deprecated ipfs-core-types@0.10.3: js-IPFS has been deprecated in favour of Helia - please see https://github.com/ipfs/js-ipfs/issues/4336 for details
npm WARN deprecated ipfs-core-utils@0.14.3: js-IPFS has been deprecated in favour of Helia - please see https://github.com/ipfs/js-ipfs/issues/4336 for details
npm WARN deprecated ipfs-http-client@56.0.3: js-IPFS has been deprecated in favour of Helia - please see https://github.com/ipfs/js-ipfs/issues/4336 for details

added 648 packages, and audited 649 packages in 2m

104 packages are looking for funding
  run `npm fund` for details

16 vulnerabilities (13 low, 3 high)

To address issues that do not require attention, run:
  npm audit fix

To address all issues possible (including breaking changes), run:
  npm audit fix --force

Some issues need review, and may require choosing
a different dependency.

Run `npm audit` for details.

afsar@LAPTOP-N7DVKU0K MINGW64 /d/NFT/gomini-03-04-2025
$ npx hardhat compile
Compiled 1 Solidity file successfully (evm target: paris).

afsar@LAPTOP-N7DVKU0K MINGW64 /d/NFT/gomini-03-04-2025
$ npx hardhat run scripts/deploy.js --network polygon_amoy
Deploying contract with account: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
TypeError: cowRegistry.deployed is not a function
    at main (D:\NFT\gomini-03-04-2025\scripts\deploy.js:14:21)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)

afsar@LAPTOP-N7DVKU0K MINGW64 /d/NFT/gomini-03-04-2025
$ npx hardhat run scripts/deploy.js --network polygon_amoy
Deploying contract with account: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
TypeError: cowRegistry.deployed is not a function
    at main (D:\NFT\gomini-03-04-2025\scripts\deploy.js:14:21)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)

afsar@LAPTOP-N7DVKU0K MINGW64 /d/NFT/gomini-03-04-2025
$ npx hardhat run scripts/deploy.js --network polygon_amoy
Deploying contract with account: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
ProviderError: insufficient funds for gas * price + value: balance 25434015501896903, tx cost 50286000003017160, overshot 24851984501120257
    at HttpProvider.request (D:\NFT\gomini-03-04-2025\node_modules\hardhat\src\internal\core\providers\http.ts:107:21)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)
    at HardhatEthersSigner.sendTransaction (D:\NFT\gomini-03-04-2025\node_modules\@nomicfoundation\hardhat-ethers\src\signers.ts:125:18)
    at ContractFactory.deploy (D:\NFT\gomini-03-04-2025\node_modules\ethers\src.ts\contract\factory.ts:111:24)
    at main (D:\NFT\gomini-03-04-2025\scripts\deploy.js:12:23)

afsar@LAPTOP-N7DVKU0K MINGW64 /d/NFT/gomini-03-04-2025
$ npx hardhat balance --network polygon_amoy
Error HH303: Unrecognized task 'balance'

For more info go to https://hardhat.org/HH303 or run Hardhat with --show-stack-traces

afsar@LAPTOP-N7DVKU0K MINGW64 /d/NFT/gomini-03-04-2025
$ npx hardhat node
Error: listen EADDRINUSE: address already in use 127.0.0.1:8545
    at Server.setupListenHandle [as _listen2] (node:net:1908:16)
    at listenInCluster (node:net:1965:12)
    at doListen (node:net:2139:7)
    at processTicksAndRejections (node:internal/process/task_queues:83:21)

afsar@LAPTOP-N7DVKU0K MINGW64 /d/NFT/gomini-03-04-2025
$ npx hardhat balance --network polygonMumbai
Error HH303: Unrecognized task 'balance'

For more info go to https://hardhat.org/HH303 or run Hardhat with --show-stack-traces

afsar@LAPTOP-N7DVKU0K MINGW64 /d/NFT/gomini-03-04-2025
$ npx hardhat run scripts/deploy.js --network polygonMumbai
Compiled 1 Solidity file successfully (evm target: paris).
Deploying contract with account: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
For more info go to https://hardhat.org/HH303 or run Hardhat with --show-stack-traces

afsar@LAPTOP-N7DVKU0K MINGW64 /d/NFT/gomini-03-04-2025
$ npx hardhat run scripts/deploy.js --network polygonMumbai
Compiled 1 Solidity file successfully (evm target: paris).
Deploying contract with account: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
Compiled 1 Solidity file successfully (evm target: paris).
Deploying contract with account: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
Deploying contract with account: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
TypeError: registerCow.deployed is not a function
    at main (D:\NFT\gomini-03-04-2025\scripts\deploy.js:14:21)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)

afsar@LAPTOP-N7DVKU0K MINGW64 /d/NFT/gomini-03-04-2025
$ npx hardhat run scripts/deploy.js --network polygonMumbai
Deploying contract with account: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
TypeError: registerCow.deployed is not a function
    at main (D:\NFT\gomini-03-04-2025\scripts\deploy.js:14:21)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)

afsar@LAPTOP-N7DVKU0K MINGW64 /d/NFT/gomini-03-04-2025
$ npx hardhat compile
Compiled 14 Solidity files successfully (evm target: paris).

afsar@LAPTOP-N7DVKU0K MINGW64 /d/NFT/gomini-03-04-2025
$ npx hardhat run scripts/deploy.js --network polygonMumbai
Deploying contracts with the account: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
TypeError: deployer.getBalance is not a function
    at main (D:\NFT\gomini-03-04-2025\scripts\deploy.js:7:51)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)

afsar@LAPTOP-N7DVKU0K MINGW64 /d/NFT/gomini-03-04-2025
$ npx hardhat run scripts/deploy.js --network polygonMumbai
Deploying contracts with the account: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
Account balance: 9999995361765304911922
TypeError: farmerCowRegistry.deployed is not a function
    at main (D:\NFT\gomini-03-04-2025\scripts\deploy.js:14:27)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)

afsar@LAPTOP-N7DVKU0K MINGW64 /d/NFT/gomini-03-04-2025
$ npx hardhat run scripts/deploy.js --network polygonMumbai
Compiled 1 Solidity file successfully (evm target: paris).
Deploying contracts with the account: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
Account balance: 9999994775470300861282
TypeError: farmerCowRegistry.deployed is not a function
    at main (D:\NFT\gomini-03-04-2025\scripts\deploy.js:14:27)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)

afsar@LAPTOP-N7DVKU0K MINGW64 /d/NFT/gomini-03-04-2025
$ npx hardhat run scripts/deploy.js --network polygonMumbai
Deploying contracts with the account: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
Account balance: 9999994245254884130194
FarmerCowRegistry deployed to: 0x9A9f2CCfdE556A7E9Ff0848998Aa4a0CFD8863AE

afsar@LAPTOP-N7DVKU0K MINGW64 /d/NFT/gomini-03-04-2025
$ npx hardhat verify --network polygonMumbai 0x9A9f2CCfdE556A7E9Ff0848998Aa4a0CFD8863AE
[INFO] Sourcify Verification Skipped: Sourcify verification is currently disabled. To enable it, add the following entry to your Hardhat configuration:

sourcify: {
  enabled: true
}

Or set 'enabled' to false to hide this message.

For more information, visit https://hardhat.org/hardhat-runner/plugins/nomicfoundation-hardhat-verify#verifying-on-sourcify
hardhat-verify found one or more errors during the verification process:

Etherscan:
Trying to verify a contract in a network with chain id 31337, but the plugin doesn't recognize it as a supported chain.

You can manually add support for it by following these instructions: https://hardhat.org/verify-custom-networks

To see the list of supported networks, run this command:

  npx hardhat verify --list-networks



afsar@LAPTOP-N7DVKU0K MINGW64 /d/NFT/gomini-03-04-2025
$ npx hardhat run scripts/interact.js --network polygonMumbai
Depositing...
Deposit successful
Gomini wallet balance: 0.1 MATIC

afsar@LAPTOP-N7DVKU0K MINGW64 /d/NFT/gomini-03-04-2025
$ npx hardhat run scripts/uploadToIPFS.js --network polygonMumbai
(node:2852) Warning: Accessing non-existent property 'uploadCowImage' of module exports inside circular dependency
(Use `node --trace-warnings ...` to show where the warning was created)
(node:2852) Warning: Accessing non-existent property 'createCowMetadata' of module exports inside circular dependency
Uploading image to IPFS...
TypeError: uploadCowImage is not a function
    at main (D:\NFT\gomini-03-04-2025\scripts\uploadToIPFS.js:13:26)

afsar@LAPTOP-N7DVKU0K MINGW64 /d/NFT/gomini-03-04-2025
$ npx hardhat run scripts/uploadToIPFS.js --network polygonMumbai

afsar@LAPTOP-N7DVKU0K MINGW64 /d/NFT/gomini-03-04-2025
$ npx hardhat run scripts/uploadToIPFS.js --network polygonMumbai

afsar@LAPTOP-N7DVKU0K MINGW64 /d/NFT/gomini-03-04-2025
$ npx hardhat run scripts/uploadToIPFS.js --network polygonMumbai

afsar@LAPTOP-N7DVKU0K MINGW64 /d/NFT/gomini-03-04-2025
$ npx hardhat run scripts/uploadToIPFS.js --network polygonMumbai

Usage: node scripts/uploadToIPFS.js <path-to-image>

Example: node scripts/uploadToIPFS.js ./cow.jpg


afsar@LAPTOP-N7DVKU0K MINGW64 /d/NFT/gomini-03-04-2025
$ npx hardhat run scripts/uploadToIPFS.js --network polygonMumbai

afsar@LAPTOP-N7DVKU0K MINGW64 /d/NFT/gomini-03-04-2025
$ npx hardhat run scripts/cowRegistry.js --network polygonMumbai
Error: Cannot find module './ipfsUploader'
Require stack:
- D:\NFT\gomini-03-04-2025\scripts\cowRegistry.js
    at Function.Module._resolveFilename (node:internal/modules/cjs/loader:1212:15)
    at Function.Module._load (node:internal/modules/cjs/loader:1043:27)
    at Module.require (node:internal/modules/cjs/loader:1298:19)
    at require (node:internal/modules/helpers:182:18)
    at Object.<anonymous> (D:\NFT\gomini-03-04-2025\scripts\cowRegistry.js:2:29)
    at Module._compile (node:internal/modules/cjs/loader:1529:14)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1613:10)
    at Module.load (node:internal/modules/cjs/loader:1275:32)
    at Function.Module._load (node:internal/modules/cjs/loader:1096:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:164:12)

afsar@LAPTOP-N7DVKU0K MINGW64 /d/NFT/gomini-03-04-2025
$ npx hardhat run scripts/cowRegistry.js --network polygonMumbai
Uploading cow image and metadata to IPFS...

    IPFS Upload Results:
    Image CID: QmQCc4sZEHP8s95Z5uWZDVjxVw4HbDxqrU1pqETijN5ghX
    Metadata CID: QmY9YGhHGTWyds18v8bEgHgJMrCa8Qsm2S1uxmzsV6kqvM
    Image URL: https://ipfs.io/ipfs/QmQCc4sZEHP8s95Z5uWZDVjxVw4HbDxqrU1pqETijN5ghX
    Metadata URL: https://ipfs.io/ipfs/QmY9YGhHGTWyds18v8bEgHgJMrCa8Qsm2S1uxmzsV6kqvM

Registering cow on blockchain...

    Cow registered successfully!
    Transaction hash: 0x5b2dfb22a4fe7d7293351a6549481236db7e1653a93a570429776e3d00310cc4
    View on Polygonscan: https://mumbai.polygonscan.com/tx/0x5b2dfb22a4fe7d7293351a6549481236db7e1653a93a570429776e3d00310cc4

Deployment details saved to deployment-info.json

afsar@LAPTOP-N7DVKU0K MINGW64 /d/NFT/gomini-03-04-2025
$ npx hardhat run scripts/queryCow.js --network polygonMumbai
TypeError: Cannot mix BigInt and other types, use explicit conversions
    at main (D:\NFT\gomini-03-04-2025\scripts\queryCow.js:13:42)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)

afsar@LAPTOP-N7DVKU0K MINGW64 /d/NFT/gomini-03-04-2025
$ npx hardhat run scripts/queryCow.js --network polygonMumbai

    Cow Details (Token ID: 1):
    --------------------------------
    Breed: Holstein
    Birth Date: 1/1/2022, 5:30:00 am
    Health Status: Healthy
    Owner: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
    IPFS Metadata: https://ipfs.io/ipfs/QmY9YGhHGTWyds18v8bEgHgJMrCa8Qsm2S1uxmzsV6kqvM
    Registration Timestamp: 1743802940
    Price: 0.05 MATIC
    Farmer TX ID: TX-001


afsar@LAPTOP-N7DVKU0K MINGW64 /d/NFT/gomini-03-04-2025
$ npx hardhat run scripts/cowRegistry.js --network polygonMumbai
Uploading cow image and metadata to IPFS...

    IPFS Upload Results:
    Image CID: QmQCc4sZEHP8s95Z5uWZDVjxVw4HbDxqrU1pqETijN5ghX
    Metadata CID: QmY9YGhHGTWyds18v8bEgHgJMrCa8Qsm2S1uxmzsV6kqvM
    Image URL: http://localhost:8080/ipfs/QmQCc4sZEHP8s95Z5uWZDVjxVw4HbDxqrU1pqETijN5ghX
    Metadata URL: http://localhost:8080/ipfs/QmY9YGhHGTWyds18v8bEgHgJMrCa8Qsm2S1uxmzsV6kqvM

Registering cow on blockchain...
ProviderError: Error: VM Exception while processing transaction: reverted with reason string 'Insufficient balance in Gomini wallet'
    at HttpProvider.request (D:\NFT\gomini-03-04-2025\node_modules\hardhat\src\internal\core\providers\http.ts:107:21)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)
    at HardhatEthersProvider.estimateGas (D:\NFT\gomini-03-04-2025\node_modules\@nomicfoundation\hardhat-ethers\src\internal\hardhat-ethers-provider.ts:246:27)
    at D:\NFT\gomini-03-04-2025\node_modules\@nomicfoundation\hardhat-ethers\src\signers.ts:235:35
    at async Promise.all (index 0)
    at HardhatEthersSigner._sendUncheckedTransaction (D:\NFT\gomini-03-04-2025\node_modules\@nomicfoundation\hardhat-ethers\src\signers.ts:256:7)
    at HardhatEthersSigner.sendTransaction (D:\NFT\gomini-03-04-2025\node_modules\@nomicfoundation\hardhat-ethers\src\signers.ts:125:18)
    at send (D:\NFT\gomini-03-04-2025\node_modules\ethers\src.ts\contract\contract.ts:313:20)
    at Proxy.registerCow (D:\NFT\gomini-03-04-2025\node_modules\ethers\src.ts\contract\contract.ts:352:16)
    at main (D:\NFT\gomini-03-04-2025\scripts\cowRegistry.js:35:14)

afsar@LAPTOP-N7DVKU0K MINGW64 /d/NFT/gomini-03-04-2025
$ npx hardhat run scripts/cowRegistry.js --network polygonMumbai
Uploading cow image and metadata to IPFS...

    IPFS Upload Results:
    Image CID: QmQCc4sZEHP8s95Z5uWZDVjxVw4HbDxqrU1pqETijN5ghX
    Metadata CID: QmY9YGhHGTWyds18v8bEgHgJMrCa8Qsm2S1uxmzsV6kqvM
    Image URL: http://localhost:8080/ipfs/QmQCc4sZEHP8s95Z5uWZDVjxVw4HbDxqrU1pqETijN5ghX
    Metadata URL: http://localhost:8080/ipfs/QmY9YGhHGTWyds18v8bEgHgJMrCa8Qsm2S1uxmzsV6kqvM

Registering cow on blockchain...
ProviderError: Error: VM Exception while processing transaction: reverted with reason string 'Insufficient balance in Gomini wallet'
    at HttpProvider.request (D:\NFT\gomini-03-04-2025\node_modules\hardhat\src\internal\core\providers\http.ts:107:21)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)
    at HardhatEthersProvider.estimateGas (D:\NFT\gomini-03-04-2025\node_modules\@nomicfoundation\hardhat-ethers\src\internal\hardhat-ethers-provider.ts:246:27)
    at D:\NFT\gomini-03-04-2025\node_modules\@nomicfoundation\hardhat-ethers\src\signers.ts:235:35
    at async Promise.all (index 0)
    at HardhatEthersSigner._sendUncheckedTransaction (D:\NFT\gomini-03-04-2025\node_modules\@nomicfoundation\hardhat-ethers\src\signers.ts:256:7)
    at HardhatEthersSigner.sendTransaction (D:\NFT\gomini-03-04-2025\node_modules\@nomicfoundation\hardhat-ethers\src\signers.ts:125:18)
    at send (D:\NFT\gomini-03-04-2025\node_modules\ethers\src.ts\contract\contract.ts:313:20)
    at Proxy.registerCow (D:\NFT\gomini-03-04-2025\node_modules\ethers\src.ts\contract\contract.ts:352:16)
    at main (D:\NFT\gomini-03-04-2025\scripts\cowRegistry.js:35:14)

afsar@LAPTOP-N7DVKU0K MINGW64 /d/NFT/gomini-03-04-2025
$ npx hardhat run scripts/cowRegistry.js --network polygonMumbai
Uploading cow image and metadata to IPFS...

    IPFS Upload Results:
    Image CID: QmQCc4sZEHP8s95Z5uWZDVjxVw4HbDxqrU1pqETijN5ghX
    Metadata CID: QmY9YGhHGTWyds18v8bEgHgJMrCa8Qsm2S1uxmzsV6kqvM
    Image URL: http://localhost:8080/ipfs/QmQCc4sZEHP8s95Z5uWZDVjxVw4HbDxqrU1pqETijN5ghX
    Metadata URL: http://localhost:8080/ipfs/QmY9YGhHGTWyds18v8bEgHgJMrCa8Qsm2S1uxmzsV6kqvM

Registering cow on blockchain...
ProviderError: Error: VM Exception while processing transaction: reverted with reason string 'Insufficient balance in Gomini wallet'
    at HttpProvider.request (D:\NFT\gomini-03-04-2025\node_modules\hardhat\src\internal\core\providers\http.ts:107:21)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)
    at HardhatEthersProvider.estimateGas (D:\NFT\gomini-03-04-2025\node_modules\@nomicfoundation\hardhat-ethers\src\internal\hardhat-ethers-provider.ts:246:27)
    at D:\NFT\gomini-03-04-2025\node_modules\@nomicfoundation\hardhat-ethers\src\signers.ts:235:35
    at async Promise.all (index 0)
    at HardhatEthersSigner._sendUncheckedTransaction (D:\NFT\gomini-03-04-2025\node_modules\@nomicfoundation\hardhat-ethers\src\signers.ts:256:7)
    at HardhatEthersSigner.sendTransaction (D:\NFT\gomini-03-04-2025\node_modules\@nomicfoundation\hardhat-ethers\src\signers.ts:125:18)
    at send (D:\NFT\gomini-03-04-2025\node_modules\ethers\src.ts\contract\contract.ts:313:20)
    at Proxy.registerCow (D:\NFT\gomini-03-04-2025\node_modules\ethers\src.ts\contract\contract.ts:352:16)
    at main (D:\NFT\gomini-03-04-2025\scripts\cowRegistry.js:35:14)

afsar@LAPTOP-N7DVKU0K MINGW64 /d/NFT/gomini-03-04-2025
$ npx hardhat run scripts/cowRegistry.js --network polygonMumbai
Uploading cow image and metadata to IPFS...

    IPFS Upload Results:
    Image CID: QmQCc4sZEHP8s95Z5uWZDVjxVw4HbDxqrU1pqETijN5ghX
    Metadata CID: QmY9YGhHGTWyds18v8bEgHgJMrCa8Qsm2S1uxmzsV6kqvM
    Image URL: http://localhost:8080/ipfs/QmQCc4sZEHP8s95Z5uWZDVjxVw4HbDxqrU1pqETijN5ghX
    Metadata URL: http://localhost:8080/ipfs/QmY9YGhHGTWyds18v8bEgHgJMrCa8Qsm2S1uxmzsV6kqvM

Registering cow on blockchain...
ProviderError: Error: VM Exception while processing transaction: reverted with reason string 'Insufficient balance in Gomini wallet'
    at HttpProvider.request (D:\NFT\gomini-03-04-2025\node_modules\hardhat\src\internal\core\providers\http.ts:107:21)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)
    at HardhatEthersProvider.estimateGas (D:\NFT\gomini-03-04-2025\node_modules\@nomicfoundation\hardhat-ethers\src\internal\hardhat-ethers-provider.ts:246:27)
    at D:\NFT\gomini-03-04-2025\node_modules\@nomicfoundation\hardhat-ethers\src\signers.ts:235:35
    at async Promise.all (index 0)
    at HardhatEthersSigner._sendUncheckedTransaction (D:\NFT\gomini-03-04-2025\node_modules\@nomicfoundation\hardhat-ethers\src\signers.ts:256:7)
    at HardhatEthersProvider.estimateGas (D:\NFT\gomini-03-04-2025\node_modules\@nomicfoundation\hardhat-ethers\src\internal\hardhat-ethers-provider.ts:246:27)
    at D:\NFT\gomini-03-04-2025\node_modules\@nomicfoundation\hardhat-ethers\src\signers.ts:235:35
    at async Promise.all (index 0)
    at HardhatEthersSigner._sendUncheckedTransaction (D:\NFT\gomini-03-04-2025\node_modules\@nomicfoundation\hardhat-ethers\src\signers.ts:256:7)
    at HardhatEthersSigner.sendTransaction (D:\NFT\gomini-03-04-2025\node_modules\@nomicfoundation\hardhat-ethers\src\signers.ts:125:18)
    at HardhatEthersProvider.estimateGas (D:\NFT\gomini-03-04-2025\node_modules\@nomicfoundation\hardhat-ethers\src\internal\hardhat-ethers-provider.ts:246:27)
    at D:\NFT\gomini-03-04-2025\node_modules\@nomicfoundation\hardhat-ethers\src\signers.ts:235:35
    at async Promise.all (index 0)
    at HardhatEthersSigner._sendUncheckedTransaction (D:\NFT\gomini-03-04-2025\node_modules\@nomicfoundation\hardhat-ethers\src\signers.ts:256:7)
thers-provider.ts:246:27)
    at D:\NFT\gomini-03-04-2025\node_modules\@nomicfoundation\hardhat-ethers\src\signers.ts:235:35
    at async Promise.all (index 0)
    at HardhatEthersSigner._sendUncheckedTransaction (D:\NFT\gomini-03-04-2025\node_modules\@nomicfoundation\hardhat-ethers\src\signers.ts:256:7)
    at async Promise.all (index 0)
    at HardhatEthersSigner._sendUncheckedTransaction (D:\NFT\gomini-03-04-2025\node_modules\@nomicfoundation\hardhat-ethers\src\signers.ts:256:7)
    at HardhatEthersSigner._sendUncheckedTransaction (D:\NFT\gomini-03-04-2025\node_modules\@nomicfoundation\hardhat-ethers\src\signers.ts:256:7)
s.ts:256:7)
    at HardhatEthersSigner.sendTransaction (D:\NFT\gomini-03-04-2025\node_modules\@nomicfoundation\hardhat-ethers\src\signers.ts:125:1    at HardhatEthersSigner.sendTransaction (D:\NFT\gomini-03-04-2025\node_modules\@nomicfoundation\hardhat-ethers\src\signers.ts:125:18)
    at send (D:\NFT\gomini-03-04-2025\node_modules\ethers\src.ts\contract\contract.ts:313:20)
    at Proxy.registerCow (D:\NFT\gomini-03-04-2025\node_modules\ethers\src.ts\contract\contract.ts:352:16)
    at main (D:\NFT\gomini-03-04-2025\scripts\cowRegistry.js:35:14)

afsar@LAPTOP-N7DVKU0K MINGW64 /d/NFT/gomini-03-04-2025
$ npx hardhat run scripts/cowRegistry.js --network polygonMumbai
Current Gomini balance: 0.05 MATIC
Depositing 10.0 MATIC to Gomini wallet...
Deposit successful!
Uploading cow data to IPFS...

    IPFS Upload Results:
    Image CID: QmQCc4sZEHP8s95Z5uWZDVjxVw4HbDxqrU1pqETijN5ghX
    Metadata CID: QmahUFKpWViGyjSsv2bDWXQig2TWD6PY7tGy27KZ4DCu5L
    Image URL: http://localhost:8080/ipfs/QmQCc4sZEHP8s95Z5uWZDVjxVw4HbDxqrU1pqETijN5ghX
    Metadata URL: http://localhost:8080/ipfs/QmahUFKpWViGyjSsv2bDWXQig2TWD6PY7tGy27KZ4DCu5L

Registering cow on blockchain...

    Cow registered successfully!
    Transaction hash: 0x719db44a3d6de72369eb9757b488d6ea267dd9d1a058d83273569d7df33f93c5
    View on Polygonscan: https://mumbai.polygonscan.com/tx/0x719db44a3d6de72369eb9757b488d6ea267dd9d1a058d83273569d7df33f93c5

Remaining Gomini balance: 9.65 MATIC

afsar@LAPTOP-N7DVKU0K MINGW64 /d/NFT/gomini-03-04-2025
$ npx hardhat run scripts/queryCow.js --network polygonMumbai

    Cow Details (Token ID: 1):
    --------------------------------
    Breed: Holstein
    Birth Date: 1/1/2022, 5:30:00 am
    Health Status: Healthy
    Owner: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
    IPFS Metadata: https://ipfs.io/ipfs/QmY9YGhHGTWyds18v8bEgHgJMrCa8Qsm2S1uxmzsV6kqvM
    Registration Timestamp: 1743802940
    Price: 0.05 MATIC
    Farmer TX ID: TX-001


afsar@LAPTOP-N7DVKU0K MINGW64 /d/NFT/gomini-03-04-2025
$ npx hardhat run scripts/queryCow.js --network polygonMumbai

    Cow Details (Token ID: 2):
    --------------------------------
    Breed: Holstein
    Birth Date: 1/1/2022, 5:30:00 am
    Health Status: Healthy
    Owner: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
    IPFS Metadata: https://ipfs.io/ipfs/QmahUFKpWViGyjSsv2bDWXQig2TWD6PY7tGy27KZ4DCu5L
    Registration Timestamp: 1743803708
    Price: 0.4 MATIC
    Farmer TX ID: TX-001


afsar@LAPTOP-N7DVKU0K MINGW64 /d/NFT/gomini-03-04-2025
$ npx hardhat run scripts/queryCow.js --network polygonMumbai
ProviderError: Error: VM Exception while processing transaction: reverted with reason string 'Cow does not exist'
    at HttpProvider.request (D:\NFT\gomini-03-04-2025\node_modules\hardhat\src\internal\core\providers\http.ts:107:21)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)
    at staticCallResult (D:\NFT\gomini-03-04-2025\node_modules\ethers\src.ts\contract\contract.ts:337:22)
    at staticCall (D:\NFT\gomini-03-04-2025\node_modules\ethers\src.ts\contract\contract.ts:303:24)
    at Proxy.getCowDetails (D:\NFT\gomini-03-04-2025\node_modules\ethers\src.ts\contract\contract.ts:351:41)
    at main (D:\NFT\gomini-03-04-2025\scripts\queryCow.js:8:15)

afsar@LAPTOP-N7DVKU0K MINGW64 /d/NFT/gomini-03-04-2025
$ npx hardhat run scripts/cowRegistry.js --network polygonMumbai
Current Gomini balance: 9.65 MATIC
Depositing 10.0 MATIC to Gomini wallet...
Deposit successful!
Uploading cow data to IPFS...

    IPFS Upload Results:
    Image CID: QmQCc4sZEHP8s95Z5uWZDVjxVw4HbDxqrU1pqETijN5ghX
    Metadata CID: QmahUFKpWViGyjSsv2bDWXQig2TWD6PY7tGy27KZ4DCu5L
    Image URL: http://localhost:8080/ipfs/QmQCc4sZEHP8s95Z5uWZDVjxVw4HbDxqrU1pqETijN5ghX
    Metadata URL: http://localhost:8080/ipfs/QmahUFKpWViGyjSsv2bDWXQig2TWD6PY7tGy27KZ4DCu5L

Registering cow on blockchain...

    Cow registered successfully!
    Transaction hash: 0x77f0d512ef9fc45a3f4ef9fca48fb51a210c6b82a6e37ef3a57c623446d3dec3
    View on Polygonscan: https://mumbai.polygonscan.com/tx/0x77f0d512ef9fc45a3f4ef9fca48fb51a210c6b82a6e37ef3a57c623446d3dec3

Remaining Gomini balance: 10.65 MATIC

afsar@LAPTOP-N7DVKU0K MINGW64 /d/NFT/gomini-03-04-2025
$ npx hardhat run scripts/cowRegistry.js --network polygonMumbai
Current Gomini balance: 10.65 MATIC
Uploading cow data to IPFS...

    IPFS Upload Results:
    Image CID: QmQCc4sZEHP8s95Z5uWZDVjxVw4HbDxqrU1pqETijN5ghX
    Metadata CID: QmahUFKpWViGyjSsv2bDWXQig2TWD6PY7tGy27KZ4DCu5L
    Image URL: http://localhost:8080/ipfs/QmQCc4sZEHP8s95Z5uWZDVjxVw4HbDxqrU1pqETijN5ghX
    Metadata URL: http://localhost:8080/ipfs/QmahUFKpWViGyjSsv2bDWXQig2TWD6PY7tGy27KZ4DCu5L

Registering cow on blockchain...

    Cow registered successfully!
    Transaction hash: 0x139a5e7cdc1797d5624a8cc2b94e83efdbaa3c3bdd3c15320d48dff5144ba985
    View on Polygonscan: https://mumbai.polygonscan.com/tx/0x139a5e7cdc1797d5624a8cc2b94e83efdbaa3c3bdd3c15320d48dff5144ba985

Remaining Gomini balance: 0.65 MATIC

afsar@LAPTOP-N7DVKU0K MINGW64 /d/NFT/gomini-03-04-2025
$ npx hardhat run scripts/cowRegistry.js --network polygonMumbai
currentBalance 650000000000000000n
Current Gomini balance: 0.65 MATIC
Depositing 10.0 MATIC to Gomini wallet...
Deposit successful!
Uploading cow data to IPFS...

    IPFS Upload Results:
    Image CID: QmQCc4sZEHP8s95Z5uWZDVjxVw4HbDxqrU1pqETijN5ghX
    Metadata CID: QmahUFKpWViGyjSsv2bDWXQig2TWD6PY7tGy27KZ4DCu5L
    Image URL: http://localhost:8080/ipfs/QmQCc4sZEHP8s95Z5uWZDVjxVw4HbDxqrU1pqETijN5ghX
    Metadata URL: http://localhost:8080/ipfs/QmahUFKpWViGyjSsv2bDWXQig2TWD6PY7tGy27KZ4DCu5L

Registering cow on blockchain...

    Cow registered successfully!
    Transaction hash: 0x12e4e0fc8efa4f99c43ab94dad870d27e7fd7c4c343876c646b2c3d23d66eb82
    View on Polygonscan: https://mumbai.polygonscan.com/tx/0x12e4e0fc8efa4f99c43ab94dad870d27e7fd7c4c343876c646b2c3d23d66eb82

Remaining Gomini balance: 0.65 MATIC

afsar@LAPTOP-N7DVKU0K MINGW64 /d/NFT/gomini-03-04-2025
$ npx hardhat run scripts/cowRegistry.js --network polygonMumbai
Current Gomini balance: 0.65 MATIC
Depositing 10.0 MATIC to Gomini wallet...
Deposit successful!
Uploading cow data to IPFS...

    IPFS Upload Results:
    Image CID: QmQCc4sZEHP8s95Z5uWZDVjxVw4HbDxqrU1pqETijN5ghX
    Metadata CID: QmahUFKpWViGyjSsv2bDWXQig2TWD6PY7tGy27KZ4DCu5L
    Image URL: http://localhost:8080/ipfs/QmQCc4sZEHP8s95Z5uWZDVjxVw4HbDxqrU1pqETijN5ghX
    Metadata CID: QmahUFKpWViGyjSsv2bDWXQig2TWD6PY7tGy27KZ4DCu5L
    Image URL: http://localhost:8080/ipfs/QmQCc4sZEHP8s95Z5uWZDVjxVw4HbDxqrU1pqETijN5ghX
    Image URL: http://localhost:8080/ipfs/QmQCc4sZEHP8s95Z5uWZDVjxVw4HbDxqrU1pqETijN5ghX
    Metadata URL: http://localhost:8080/ipfs/QmahUFKpWViGyjSsv2bDWXQig2TWD6PY7tGy27KZ4DCu5L

Registering cow on blockchain...

Registering cow on blockchain...
Registering cow on blockchain...


    Cow registered successfully!
    Transaction hash: 0xe4a15aef429acf9b221831f894a15deff06107db2bc943d5ee3d9b9cc7cc6e2e
    View on Polygonscan: https://mumbai.polygonscan.com/tx/0xe4a15aef429acf9b221831f894a15deff06107db2bc943d5ee3d9b9cc7cc6e2e

Remaining Gomini balance: 0.65 MATIC

afsar@LAPTOP-N7DVKU0K MINGW64 /d/NFT/gomini-03-04-2025
$ git init
Initialized empty Git repository in D:/NFT/gomini-03-04-2025/.git/

afsar@LAPTOP-N7DVKU0K MINGW64 /d/NFT/gomini-03-04-2025 (master)
$