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
					<Route path='/signup'>
						<Signup />
					</Route>
					<Route path='/login'>
						<Login />
					</Route>
					<Route path='/reset-password'>
						<ResetPassword />
					</Route>
					<Route path='/change-password/:token'>
						<ChangePassword />
					</Route>
				</>
			)}
			<Route exact path='/'>
				<Explore />
			</Route>

			{/* TODO: handle invalid routes and add 404 page
			<Route path='*'>
				<Redirect to='/' />
			</Route> */}
		</>
	);
}
