import { useState, useContext } from 'react';
import AuthContext from '../../context/auth-context';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
	const authContext = useContext(AuthContext);
	const isLoggedIn = authContext.isLoggedIn;

	const history = useHistory();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const submitHandler = (event) => {
		event.preventDefault();
		axios
			.post('http://localhost:5000/auth/login/', formData, {
				headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
			})
			.then((res) => {
				if (res.status === 422) {
					console.error('Validation failed.');
					throw new Error('Validation failed.');
				}
				if (res.status !== 200 && res.status !== 201) {
					console.error('Could not authenticate you!');
					throw new Error('Could not authenticate you!');
				}
				return res;
			})
			.then((res) => {
				// set token userId in auth context
				authContext.login(res.data.token, res.data.userId);
				console.log('Logged in successfully.');
				// redirect to home page
				history.push('/');
			})
			.catch((err) => console.log(err));
	};

	const formData = { email: email, password: password };

	const emailInputChangeHandler = (event) => {
		setEmail(event.target.value);
	};
	const passwordInputChangeHandler = (event) => {
		setPassword(event.target.value);
	};
	return (
		<>
			<h1>Log in</h1>
			<form onSubmit={submitHandler}>
				<>
					<label htmlFor='email'>Email</label>
					<input
						required
						type='email'
						id='email'
						name='email'
						onChange={emailInputChangeHandler}
					/>
				</>
				<>
					<label htmlFor='password'>Password</label>
					<input
						required
						type='password'
						id='password'
						name='password'
						onChange={passwordInputChangeHandler}
					/>
				</>
				<button type='submit'>Log in</button>
			</form>
			<Link to='/signup'>
				<span>Sign up</span>
			</Link>
			<Link to='/reset-password'>
				<span>Forgot password?</span>
			</Link>
		</>
	);
}
