import { Route, Redirect } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from './context/auth-context';

import Login from './auth/pages/Login';
import Signup from './auth/pages/Signup';
import Explore from './explore/pages/Explore';
import Profile from './profile/pages/Profile';
import Navigation from './common/Navigation';
import ResetPassword from './auth/pages/ResetPassword';
import ChangePassword from './auth/pages/ChangePassword';
import Settings from './settings/pages/SettingsMenu';

export default function App() {
	const isLoggedIn = useContext(AuthContext).isLoggedIn;
	return (
		<>
			{isLoggedIn && (
				<>
					<Navigation />
					<Route path='/profile'>
						<Profile />
					</Route>
					<Route path='/settings'>
						<Settings />
					</Route>
				</>
			)}
			{!isLoggedIn && (
				<>
					<Route path='/auth/signup'>
						<Signup />
					</Route>
					<Route path='/auth/login'>
						<Login />
					</Route>
					<Route path='/auth/reset-password'>
						<ResetPassword />
					</Route>
					<Route path='/auth/change-password/:token'>
						<ChangePassword />
					</Route>
				</>
			)}
			<Route exact path='/'>
				<Explore />
			</Route>
			<Route path='*'>
				<Redirect to='/' />
			</Route>
		</>
	);
}
