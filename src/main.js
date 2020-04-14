import Vue from 'vue';
import './firebase';
import VueRouter from 'vue-router';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { routes } from './routes';
// require('dotenv').config()

// import VueFire from 'vuefire'

import store from './store';

Vue.config.productionTip = false;
// Vue.use(VueFire)
Vue.use(VueRouter);

const router = new VueRouter({
	routes,
	mode: 'history',
});

store.subscribe((mutation, state) => {
	// Store the state object as a JSON string
	localStorage.setItem('store', JSON.stringify(state));
});

new Vue({
	vuetify,
	router: router,
	store,
	beforeCreate() {
		this.$store.commit('initializeStore');
	},
	render: h => h(App),
}).$mount('#app');
