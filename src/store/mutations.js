import * as TYPES from "./types";
import * as API from "../assets/js/Common/API"
import axios from 'axios'
import * as BASEJS from '../assets/js/Common/base'
const mutations = {
	[TYPES.SET_ACCOUNT](state, v) {
		state.account = v;
	},
	[TYPES.SET_ISCONNECTED](state, v) {
		state.isConnected = v;
	},
	[TYPES.SET_CHAINID](state, v) {
		state.chainId = v;
	},
	[TYPES.SET_DRIZZLE](state, v) {
		state.drizzle = v;
	},
	[TYPES.SET_ACCOUNTADDR](state, v) {
		state.accountAddr = v;
	},
	[TYPES.set_drizzle](state, v) {
		state.drizzle = v;
	},
	[TYPES.GET_MYCATINFOS](state, v) {
		//我的猫咪
		const { create, urlSource } = require("ipfs-http-client");
    state.ipfs = create({
      host: "ipfs.infura.io",
      port: "5001",
      protocol: "https",
		});
		const accountAddr = state.accountAddr;
		const TomCatNFT = state.drizzle.contracts.TomCatNFT;
		// console.log(state.drizzle.contracts)
		// console.log(state.drizzle.contracts["TomCatNFT"])
		
	
		state.drizzle.contracts["TomCatNFT"].methods.balanceOf(accountAddr).call().then((amount) => {
			//console.log(amount)
			state.myInfo.totalAmount = parseInt(amount) + parseInt(state.myInfo.sellingCatNum);
				
			for (var i = 0; i < parseInt(amount); i++) {
				state.drizzle.contracts["TomCatNFT"].methods.tokenOfOwnerByIndex(accountAddr, i).call().then((catId) => {
				//	console.log(catId)
					state.drizzle.contracts["TomCatNFT"].methods.id2CatInfoMap(catId).call().then((catInfo) => {
						//console.log(catInfo)
						if (state.myInfo.myCatInfos[catId] == null) {
							state.myInfo.myCatInfos[catId] = {};
						}
						state.myInfo.myCatInfos[catId].name = catInfo.name;
						state.myInfo.myCatInfos[catId].desc = catInfo.desc;
						state.myInfo.myCatInfos[catId].isBreeding = catInfo.isBreeding;
						state.myInfo.myCatInfos[catId].id = catId;
						state.myInfo.myCatInfos[catId].motherId = catInfo.motherId;

						state.drizzle.contracts["TomCatNFT"].methods.tokenURI(catId).call().then((ipfsHash) => {
							ipfsHash.length < 20 ? (ipfsHash = state.defaultIPFSHash): ipfsHash;
							state.myInfo.myCatInfos[catId].ipfsHash = state.ipfsUrl + ipfsHash;
						});
					});
				});
			}
      console.log(state.myInfo.myCatInfos);
		});
	},
	[TYPES.GET_TRADEMARKETINFO](state, v) {
		//交易市场
		const { create, urlSource } = require("ipfs-http-client");
    state.ipfs = create({
      host: "ipfs.infura.io",
      port: "5001",
      protocol: "https",
		});
		//const accountAddr = state.accountAddr;
	//	console.log(state.drizzle.contracts.TomCatNFT)
		state.drizzle.contracts.TomCatNFT.methods.balanceOf(state.drizzle.contracts.TradeMarket.address).call().then(async (v) => {
			state.tomCatNFTInfo.sellingCatNum = parseInt(v);
     // this.setState({tomCatNFTInfo});
		 state.tradeMarketInfo.sellingCatIds = [];
      
      state.drizzle.contracts.TradeMarket.methods.getOrderIds(0, state.pageSize < state.tomCatNFTInfo.sellingCatNum ? state.pageSize : state.tomCatNFTInfo.sellingCatNum, state.priceDescending).call().then(catIds => {
        catIds.map(catId => {
          state.drizzle.contracts.TomCatNFT.methods.id2CatInfoMap(catId).call().then(catInfo => {
            if (state.tradeMarketInfo.sellingCatInfos[catId] == null) {
              state.tradeMarketInfo.sellingCatInfos[catId] = {};
            }
            state.tradeMarketInfo.sellingCatInfos[catId].name = catInfo.name;
            state.tradeMarketInfo.sellingCatInfos[catId].desc = catInfo.desc;
            state.tradeMarketInfo.sellingCatInfos[catId].isBreeding = catInfo.isBreeding;
						state.tradeMarketInfo.sellingCatInfos[catId].motherId = catInfo.motherId;
						state.tradeMarketInfo.sellingCatInfos[catId].Id = catId;
            //this.setState({tradeMarketInfo});
          });
          state.drizzle.contracts.TomCatNFT.methods.tokenURI(catId).call().then(ipfsHash => {
            if (state.tradeMarketInfo.sellingCatInfos[catId] == null) {
              state.tradeMarketInfo.sellingCatInfos[catId] = {};
            }
            state.tradeMarketInfo.sellingCatInfos[catId].ipfsHash = ipfsHash.length < 20 ?  (state.ipfsUrl + state.defaultIPFSHash) :( state.ipfsUrl + ipfsHash);
           // this.setState({tradeMarketInfo});
          });
          state.drizzle.contracts.TradeMarket.methods.tokenOrderMap(catId).call().then(catInfo => {
            if (state.tradeMarketInfo.sellingCatInfos[catId] == null) {
              state.tradeMarketInfo.sellingCatInfos[catId] = {};
            }
            state.tradeMarketInfo.sellingCatInfos[catId].price = catInfo.price;
           // this.setState({tradeMarketInfo});
          });
        });
      });
		});
		
		console.log(state.tradeMarketInfo.sellingCatInfos)
	},
	
}
export default mutations