import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// export const store = new Vuex.Store({
export default new Vuex.Store({
	state: {},
	mutations: {
		disableLogin(state) {
			state.loginDisabled = true;
		},

	},
	actions: {}
});
