// import { Drizzle } from "@drizzle/store";
// // import drizzleOptions from "../assets/js/Common/drizzleOptions";
// import drizzleOptions from "../assets/js/Common/drizzleOptions";
// let drizzle = new Drizzle(drizzleOptions)
// console.log(drizzle)
const state = {
	account: null,
	accountAddr:null,
	isConnected: null,
	chainId: null,
	drizzle:null,
	ipfs: null,
	approveTip: '授权TOM',
	tomCatNFT: null,
	tradeMarket:null,
	tomERC20: null,

	drizzleState: null,
	// tomCatNFT: drizzle.contracts.TomCatNFT,
	// tradeMarket: drizzle.contracts.TradeMarket,
	// tomERC20: drizzle.contracts.TomERC20,

	// drizzleState: drizzle.store.getState(),
	// accountAddr: props.drizzleState.accounts[0] != null ? props.drizzleState.accounts[0] : '0x0000000000000000000000000000000000000000',

	tomCatNFTInfo: {totalSupply: 0, breedingCatNum: 0, sellingCatNum: 0},  // 总量，种猫数量，正在交易中的猫数量
	tradeMarketInfo: {totalAmount: 0, dealCount: 0, breedingOwnerFee: 0, sellingCatInfos: {}},    // 总交易金额，总交易量，种猫拥有者的手续费收入
	myInfo: {totalAmount:0, sellingCatNum: 0, breedingFeeAmount: 0, myCatInfos: [], mySellingCatInfos: []},         // 账户拥有的猫总数，出售中猫咪数量，以及种猫手续费收入
	catInfo: {},
	approveTomERC20Tip: '授权Tom代币', 
	approveCatNFTTip: '授权猫咪NFT', 
	approvingTip: '授权中',
	curCatNFTId: 0,
	priceDescending: true,
	pageSize: 10,
	curPage: 0,
	approvedTom: 0,
	isBreeding: false,
	motherInfos: [],
	defaultIPFSHash: 'QmNtWjcfKTkJNfErtFMPwMV9F5C5DRKGUTHi4yjigtXP4N',
	curCatInfo: {ipfsHash: 'QmNtWjcfKTkJNfErtFMPwMV9F5C5DRKGUTHi4yjigtXP4N'},
	ipfsUrl: 'https://ipfs.io/ipfs/',
}
export default state