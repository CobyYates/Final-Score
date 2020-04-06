import Vue from 'vue';
import './firebase';
import VueRouter from 'vue-router';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { routes } from './routes';

// import VueFire from 'vuefire'

import store from './store';

Vue.config.productionTip = false;
// Vue.use(VueFire)
Vue.use(VueRouter);

const router = new VueRouter({
	routes,
	mode: 'history',
});

new Vue({ 
	vuetify,
	router: router,
	store,
	render: h => h(App),
}).$mount('#app');
