import axios from '../../axios';
import Alert from '../../utils/Alert';

let timer;

export const autoLogoutAction = (user) => (dispatch) => {
	timer = setTimeout(() => {
		Alert.danger('Token has been expired!');
		dispatch(saveToRedux(null));
	}, user.expiresIn);
};

export const saveToRedux = (user) => {
	clearTimeout(timer);
	localStorage.setItem('user', user ? JSON.stringify(user) : null);
	return {
		payload: user,
		type: 'user-state-changed',
	};
};

export const signInAction = (formData) => {
	return (dispatch) => {
		axios
			.post('/auth/signin', formData.values)
			.then((res) => {
				dispatch(saveToRedux(res.data));
				formData.onSuccess('Logged in successfully');
			})
			.catch(formData.onFailure);
	};
};

export const signUpAction = (formData) => {
	return (dispatch) => {
		axios
			.post('/auth/signup', formData.values)
			.then((res) => {
				dispatch(saveToRedux(res.data));
				formData.onSuccess('Successfully created a new account');
			})
			.catch(formData.onFailure);
	};
};

export const logoutAction = () => {
	return (dispatch) => dispatch(saveToRedux(null));
};
