import * as TYPES from "./types"
const actions = {
  setAccount(vuex, v) {
    vuex.commit(TYPES.SET_ACCOUNT,v)
  },
  setIsConnected(vuex, v) {
    vuex.commit(TYPES.SET_ISCONNECTED,v)
  },
  setChainId(vuex, v) {
    vuex.commit(TYPES.SET_CHAINID,v)
  },
  setDrizzle(vuex, v) {
    vuex.commit(TYPES.SET_DRIZZLE,v)
  }
}
export default actions