import { Route } from 'react-router-dom';

import Login from './auth/pages/Login';
import Signup from './auth/pages/Signup';
import Explore from './explore/pages/Explore';
import Profile from './profile/pages/Profile';
import Navigation from './common/Navigation';
import ResetPassword from './auth/pages/ResetPassword';

export default function App() {
	return (
		<>
			<Navigation />
			<Route exact path='/'>
				<Explore />
			</Route>
			<Route path='/profile'>
				<Profile />
			</Route>
			<Route path='/auth/signup'>
				<Signup />
			</Route>
			<Route path='/auth/login'>
				<Login />
			</Route>
			<Route path='/auth/reset-password'>
				<ResetPassword />
			</Route>
		</>
	);
}
