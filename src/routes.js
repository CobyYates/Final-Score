import Home from './views/Home';
import SignUp from './views/SignUp';
import SignIn from './views/SignIn';
import Yahtzee from './views/games/Yahtzee';
import NertzGames from './views/gamesList/NertzGames';
import Nertz from './views/games/Nertz';
import OhHell from './views/games/OhHell';
import YuGiOh from './views/games/YuGiOh';
import Qwixx from './views/games/Qwixx';

export const routes = [
	{ path: '/', component: Home },
	{ path: '/signUp', component: SignUp },
	{ path: '/signIn', component: SignIn },
	{ path: '/yahtzee', component: Yahtzee },
	{ path: '/nertz', component: NertzGames },
	{ path: '/nertz/:gameId', component: Nertz },
	{ path: '/yugioh', component: YuGiOh },
	{ path: '/ohhell', component: OhHell },
	{ path: '/qwixx', component: Qwixx },
];
