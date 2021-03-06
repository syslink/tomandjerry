import Vue from 'vue'
import Vuex from 'vuex'
import state from './state';
import getters from './getter';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex)
export const store = new Vuex.Store({
	state,
	getters,
	mutations,
	actions
})