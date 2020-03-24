import Home from './components/Home';
import Yahtzee from './components/Yahtzee';
import Nertz from './views/Nertz';

export const routes = [
	{ path: '/', component: Home },
	{ path: '/yahtzee', component: Yahtzee },
	{ path: '/nertz', component: Nertz },
];
