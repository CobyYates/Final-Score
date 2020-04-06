import Home from './components/Home';
import SignUp from './views/SignUp';
import SignIn from './views/SignIn';
import Yahtzee from './views/games/Yahtzee';
import Nertz from './views/games/Nertz';
import YuGiOh from './views/YuGiOh';
import OhHell from './views/games/OhHell';

/*test*/

export const routes = [
	{ path: '/', component: Home },
	{ path: '/signUp', component: SignUp },
	{ path: '/signIn', component: SignIn },
	{ path: '/yahtzee', component: Yahtzee },
	{ path: '/nertz', component: Nertz },
	{ path: '/yugioh', component: YuGiOh },
	{ path: '/ohhell', component: OhHell },
];
