import Home from './components/Home';
import SignUp from './views/signUp';
import SignIn from './views/signIn';
import Yahtzee from './components/Yahtzee';
import Nertz from './views/Nertz';

export const routes = [
	{ path: '/', component: Home },
	{ path: '/signUp', component: SignUp },
	{ path: '/signIn', component: SignIn },
	{ path: '/yahtzee', component: Yahtzee },
	{ path: '/nertz', component: Nertz },
];
