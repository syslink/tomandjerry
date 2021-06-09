import state from "./state"

 const getters = {
	 account:(state,getters) =>{
		return state.account
	 },
	 isConnected: (state, getters) => {
		return state.isConnected
	 },
	 chainId:(state, getters) => {
		return state.chainId
	 },
	 drizzle:(state, getters) => {
		return state.drizzle
	 }
}
export default(getters)