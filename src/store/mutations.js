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
	
}
export default mutations