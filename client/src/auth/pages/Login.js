import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
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
				// submit store token in local storage
				// TODO: this may expose me to XSS attacks, I may need to implement a solution for this
				localStorage.setItem('token', res.data.token);
				localStorage.setItem('userId', res.data.userId);
				const remainingMilliseconds = 60 * 60 * 1000;
				const expiryDate = new Date(
					new Date().getTime() + remainingMilliseconds
				);
				localStorage.setItem('expiryDate', expiryDate.toISOString());
				console.log('Logged in successfully.');
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
			<Link to='/auth/signup'>
				<span>Sign up</span>
			</Link>
			<Link to='/auth/reset-password'>
				<span>Forgot password?</span>
			</Link>
		</>
	);
}
