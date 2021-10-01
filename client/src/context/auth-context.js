import React from 'react';
import { useState, useEffect, useCallback } from 'react';

const AuthContext = React.createContext({
	token: '',
	isLoggedIn: false,
	login: (token) => {},
	logout: () => {},
});

const retrieveStoredToken = () => {
	const storedToken = localStorage.getItem('token');
	const storedExpiryTime = localStorage.getItem('expiryTime');
	const expiryTimeInMilliseconds = new Date(storedExpiryTime).getTime();
	const remainingTime = calculateTimeToExpiry(expiryTimeInMilliseconds);
	// if there is less than a minute left until the token expires, do not log the user in
	if (remainingTime <= 60000) {
		localStorage.removeItem('token');
		localStorage.removeItem('userId');
		localStorage.removeItem('expiryTime');
		return null;
	}
	return { token: storedToken, remainingTime: remainingTime };
};

let logoutTimer;

const calculateTimeToExpiry = (expiryTime) => {
	const currentTime = new Date().getTime();
	const remainingTimeToExpiry = expiryTime - currentTime;
	return remainingTimeToExpiry;
};

export const AuthContextProvider = (props) => {
	// retrieve the token and expiration time from local storage
	const tokenData = retrieveStoredToken();
	let retrievedToken;
	if (tokenData) {
		retrievedToken = tokenData.token;
	}
	const [token, setToken] = useState(retrievedToken);
	const userIsLoggedIn = !!token;

	const logoutHandler = useCallback(() => {
		// remove token
		setToken(null);
		localStorage.removeItem('token');
		localStorage.removeItem('userId');
		localStorage.removeItem('expiryTime');
		// cancel auto-logout timer
		if (logoutTimer) {
			clearTimeout(logoutTimer);
		}
	}, []);

	const loginHandler = (token, userId) => {
		setToken(token);
		// create expiryTime and start auto-logout timer
		const remainingMilliseconds = 2 * 60 * 60 * 1000; // 2 hours
		const expiryTime = new Date(new Date().getTime() + remainingMilliseconds);
		const remainingTimeToExpiry = calculateTimeToExpiry(expiryTime);
		logoutTimer = setTimeout(logoutHandler, remainingTimeToExpiry);
		// write token, userId and expiryTime to local storage
		localStorage.setItem('token', token);
		localStorage.setItem('userId', userId);
		localStorage.setItem('expiryTime', expiryTime.toISOString());
	};

	// set the auto-logout timer if there is a token stored in local storage
	useEffect(() => {
		if (tokenData) {
			logoutTimer = setTimeout(logoutHandler, tokenData.remainingTime);
		}
	}, [tokenData, logoutHandler]);

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
