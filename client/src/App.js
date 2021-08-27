import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { autoLogoutAction } from './redux/actions/userActions';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage/';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

export default function App() {
	const user = useSelector((store) => store.user);
	const dispatch = useDispatch();
	useEffect(() => {
		if (user) dispatch(autoLogoutAction(user));
	}, [user]);
	return (
		<div>
			<Route path='/' component={HomePage} />
			<Route path='/signup' component={SignupPage} />
			<Route path='/login' component={LoginPage} />
			<Route path='/forgot-password' component={ForgotPasswordPage} />
		</div>
	);
}
