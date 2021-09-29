import React from 'react';
import { useState } from 'react';

const AuthContext = React.createContext({
	token: '',
	isLoggedIn: false,
	login: (token) => {},
	logout: () => {},
});

const calculateTimeToExpiration = (expirationTime) => {
	const currentTime = new Date().getTime();
	const ExpirationTime = new Date(expirationTime).getTime();
	const timeToExpiration = ExpirationTime - currentTime;

	return timeToExpiration;
};

export const AuthContextProvider = (props) => {
	const initialToken = localStorage.getItem('token');
	const [token, setToken] = useState(initialToken);

	const userIsLoggedIn = !!token;
	const loginHandler = (token) => {
		setToken(token);
		localStorage.setItem('token', token);
	};
	const logoutHandler = () => {
		setToken(null);
		localStorage.removeItem('token');
	};
	const contextValue = {
		token: token,
		isLoggedIn: userIsLoggedIn,
		login: loginHandler,
		logout: logoutHandler,
	};
	return (
		<AuthContext.Provider value={contextValue}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
