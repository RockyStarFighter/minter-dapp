require('dotenv').config();
const basePath = process.cwd();
const fs = require("fs");
const { MODE } = require(`${basePath}/constants/blend_mode.js`);
const { NETWORK } = require(`${basePath}/constants/network.js`);

const network = NETWORK.eth;

// General metadata for Ethereum
const namePrefix = "LegendoftheMaskMaker.xyz";
const description = "The Legend of the Mask Maker is a collection of NFT Access Passes for access to the Alpha release of the video game � �Legend of the Mask Maker�";
const baseUri = "ipfs://NewUriToReplace"; // This will be replaced automatically

// If you have selected Solana then the collection starts from 0 automatically
const layerConfigurations = [
  {
    growEditionSizeTo: 1999,
    layersOrder: [
      { name: "01 Background" },
      { name: "02 TC Frame" },
      { name: "03 Image Frame" },
      { name: "04 Game Options Frame" },
      { name: "05 Game Options Text" },
      { name: "06 Mask Game Icon" },
      { name: "07 Cross Sword Game Icon" },
      { name: "08 Cherry Blossom Game Icon" },
      { name: "09 Archer Game Icon" },
      { name: "10 Kit Mask In Game Upgrade" },
      { name: "11 Tail" },
      { name: "12 Body" },
      { name: "13 Body Accent" },
      { name: "14 Head" },
      { name: "15 Face Accent" },
      { name: "16 Eyes" },
      { name: "17 Muzzle" },
      { name: "18 Nose" },
      { name: "19 Ears" },
      { name: "20 Mouth" },
    ],
  }, {
    growEditionSizeTo: 2999,
    layersOrder: [
      { name: "01 Background" },
      { name: "02 TC Frame" },
      { name: "03 Image Frame" },
      { name: "04 Game Options Frame" },
      { name: "05 Game Options Text" },
      { name: "06 Mask Game Icon" },
      { name: "07 Cross Sword Game Icon" },
      { name: "08 Cherry Blossom Game Icon" },
      { name: "09 Archer Game Icon" },
      { name: "10 Kit Mask In Game Upgrade" },
      { name: "11 Tail" },
      { name: "12 Body" },
      { name: "13 Body Accent" },
      { name: "14 Head" },
      { name: "15 Face Accent" },
      { name: "16 Eyes" },
      { name: "17 Muzzle" },
      { name: "18 Nose" },
      { name: "19 Ears" },
      { name: "20 Mouth" },
      { name: "21 Hat Addon" },
    ],
  }, {
    growEditionSizeTo: 3999,
    layersOrder: [
      { name: "01 Background" },
      { name: "02 TC Frame" },
      { name: "03 Image Frame" },
      { name: "04 Game Options Frame" },
      { name: "05 Game Options Text" },
      { name: "06 Mask Game Icon" },
      { name: "07 Cross Sword Game Icon" },
      { name: "08 Cherry Blossom Game Icon" },
      { name: "09 Archer Game Icon" },
      { name: "10 Kit Mask In Game Upgrade" },
      { name: "11 Tail" },
      { name: "12 Body" },
      { name: "13 Body Accent" },
      { name: "14 Head" },
      { name: "15 Face Accent" },
      { name: "16 Eyes" },
      { name: "17 Muzzle" },
      { name: "18 Nose" },
      { name: "19 Ears" },
      { name: "20 Mouth" },
      { name: "22 Weapons Addon" },
    ],
  },
];

const shuffleLayerConfigurations = true;

const debugLogs = false;

const format = {
  width: 1500,
  height: 1500,
  smoothing: false,
};

const extraMetadata = {
  external_url: "https://LegendoftheMaskMaker.xyz", // Replace with your website or remove this line if you do not have one.
};

// NFTPort Info

// ** REQUIRED **
const AUTH = process.env.NFTPORT_API_KEY; // Set this in the .env file to prevent exposing your API key when pushing to Github
const LIMIT = 5; // Your API key rate limit
const CHAIN = 'polygon'; // only rinkeby or polygon

// REQUIRED CONTRACT DETAILS THAT CANNOT BE UPDATED LATER!
const CONTRACT_NAME = 'LegendoftheMaskMaker.xyz';
const CONTRACT_SYMBOL = 'LOTMM';
const METADATA_UPDATABLE = true; // set to false if you don't want to allow metadata updates after minting
const OWNER_ADDRESS = '0x7aA2c84cfCc077c4bF721a63C2101e543Df62CFb';
const TREASURY_ADDRESS = '0x7aA2c84cfCc077c4bF721a63C2101e543Df62CFb';
const MAX_SUPPLY = 5000; // The maximum number of NFTs that can be minted. CANNOT BE UPDATED!
const MINT_PRICE = 9; // Minting price per NFT. Rinkeby = ETH, Polygon = MATIC. CANNOT BE UPDATED!
const TOKENS_PER_MINT = 10; // maximum number of NFTs a user can mint in a single transaction. CANNOT BE UPDATED!

// REQUIRED CONTRACT DETAILS THAT CAN BE UPDATED LATER.
const PUBLIC_MINT_START_DATE = "2022-04-11T11:30:48+00:00"; // This is required. Eg: 2022-02-08T11:30:48+00:00

// OPTIONAL CONTRACT DETAILS THAT CAN BE UPDATED LATER.
const PRESALE_MINT_START_DATE = "2022-04-08T11:30:48+00:00"; // Optional. Eg: 2022-02-08T11:30:48+00:00
const ROYALTY_SHARE = 1000; // Percentage of the token price that goes to the royalty address. 100 bps = 1%
const ROYALTY_ADDRESS = "0x7aA2c84cfCc077c4bF721a63C2101e543Df62CFb"; // Address that will receive the royalty
const BASE_URI = null; // only update if you want to manually set the base uri
const PREREVEAL_TOKEN_URI = null; // only update if you want to manually set the prereveal token uri
const PRESALE_WHITELISTED_ADDRESSES = []; // only update if you want to manually set the whitelisted addresses

// ** OPTIONAL **
let CONTRACT_ADDRESS = "YOUR CONTRACT ADDRESS"; // If you want to manually include it

// Generic Metadata is optional if you want to reveal your NFTs
const GENERIC = true; // Set to true if you want to upload generic metas and reveal the real NFTs in the future
const GENERIC_TITLE = CONTRACT_NAME; // Replace with what you want the generic titles to say if you want it to be different from the contract name.
const GENERIC_DESCRIPTION = "Which in game upgrade did you get with your NFT? Check the color code of the Kitsune Mask next to the title Legend of the Mask Maker."; // Replace with what you want the generic descriptions to say.
const GENERIC_IMAGE = "https://ipfs.io/ipfs/bafybeie5eolbtyjodhv6blewdauz6ibbiuoda66n4f3d6crr36fx7utxla"; // Replace with your generic image that will display for all NFTs pre-reveal.

// Automatically set contract address if deployed using the deployContract.js script
try {
  const rawContractData = fs.readFileSync(
    `${basePath}/build/contract/_contract.json`
  );
  const contractData = JSON.parse(rawContractData);
  if (contractData.response === "OK" && contractData.error === null) {
    CONTRACT_ADDRESS = contractData.contract_address;
  }
} catch (error) {
  // Do nothing, falling back to manual contract address
}
// END NFTPort Info

const solanaMetadata = {
  symbol: "YC",
  seller_fee_basis_points: 1000, // Define how much % you want from secondary market sales 1000 = 10%
  external_url: "https://www.youtube.com/c/hashlipsnft",
  creators: [
    {
      address: "7fXNuer5sbZtaTEPhtJ5g5gNtuyRoKkvxdjEjEnPN4mC",
      share: 100,
    },
  ],
};

const gif = {
  export: false,
  repeat: 0,
  quality: 100,
  delay: 500,
};

const text = {
  only: false,
  color: "#ffffff",
  size: 20,
  xGap: 40,
  yGap: 40,
  align: "left",
  baseline: "top",
  weight: "regular",
  family: "Courier",
  spacer: " => ",
};

const pixelFormat = {
  ratio: 2 / 128,
};

const background = {
  generate: true,
  brightness: "80%",
  static: false,
  default: "#000000",
};

const rarityDelimiter = "#";

const uniqueDnaTorrance = 10000;

const preview = {
  thumbPerRow: 5,
  thumbWidth: 50,
  imageRatio: format.height / format.width,
  imageName: "preview.png",
};

const preview_gif = {
  numberOfImages: 5,
  order: "ASC", // ASC, DESC, MIXED
  repeat: 0,
  quality: 100,
  delay: 500,
  imageName: "preview.gif",
};

module.exports = {
  format,
  baseUri,
  description,
  background,
  uniqueDnaTorrance,
  layerConfigurations,
  rarityDelimiter,
  preview,
  shuffleLayerConfigurations,
  debugLogs,
  extraMetadata,
  pixelFormat,
  text,
  namePrefix,
  network,
  solanaMetadata,
  gif,
  preview_gif,
  AUTH,
  LIMIT,
  CONTRACT_ADDRESS,
  OWNER_ADDRESS,
  TREASURY_ADDRESS,
  CHAIN,
  GENERIC,
  GENERIC_TITLE,
  GENERIC_DESCRIPTION,
  GENERIC_IMAGE,
  CONTRACT_NAME,
  CONTRACT_SYMBOL,
  METADATA_UPDATABLE,
  ROYALTY_SHARE,
  ROYALTY_ADDRESS,
  MAX_SUPPLY,
  MINT_PRICE,
  TOKENS_PER_MINT,
  PRESALE_MINT_START_DATE,
  PUBLIC_MINT_START_DATE,
  BASE_URI,
  PREREVEAL_TOKEN_URI,
  PRESALE_WHITELISTED_ADDRESSES
};
