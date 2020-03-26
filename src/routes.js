import Home from './components/Home';
import SignUp from './views/SignUp';
import SignIn from './views/SignIn';
import Yahtzee from './components/Yahtzee';
import Nertz from './views/games/Nertz';

export const routes = [
	{ path: '/', component: Home },
	{ path: '/signUp', component: SignUp },
	{ path: '/signIn', component: SignIn },
	{ path: '/yahtzee', component: Yahtzee },
	{ path: '/nertz', component: Nertz },
];
