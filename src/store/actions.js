import * as TYPES from "./types"
const actions = {
  setAccount(vuex, v) {
    vuex.commit(TYPES.SET_ACCOUNT,v)
  },
  setAccountAddr(vuex, v) {
    vuex.commit(TYPES.SET_ACCOUNTADDR,v)
  },
  setIsConnected(vuex, v) {
    vuex.commit(TYPES.SET_ISCONNECTED,v)
  },
  setChainId(vuex, v) {
    vuex.commit(TYPES.SET_CHAINID,v)
  },
  setDrizzle(vuex, v) {
    vuex.commit(TYPES.SET_DRIZZLE,v)
  },
  getMyCatInfos(vuex, v) {
    vuex.commit(TYPES.GET_MYCATINFOS,v)
  },
  getTradeMarketInfo(vuex, v) {
    vuex.commit(TYPES.GET_TRADEMARKETINFO,v)
  },
  setDrizzle(vuex,v) {
    vuex.commit(TYPES.set_drizzle,v)
  }
}
export default actions