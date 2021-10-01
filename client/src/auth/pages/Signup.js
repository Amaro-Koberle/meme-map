import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

export default function Signup() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const history = useHistory();

	const nameInputChangeHandler = (event) => {
		setName(event.target.value);
	};
	const emailInputChangeHandler = (event) => {
		setEmail(event.target.value);
	};
	const passwordInputChangeHandler = (event) => {
		setPassword(event.target.value);
	};

	const submitHandler = (event) => {
		event.preventDefault();
		axios
			.post('http://localhost:5000/auth/signup/', formData)
			.then((res) => {
				console.log(res);
				// redirect to home page
				history.push('/');
			})
			.catch((err) => console.log(err));
	};

	const formData = { name: name, email: email, password: password };

	return (
		<>
			<h1>Sign up</h1>
			<form onSubmit={submitHandler}>
				<>
					<label htmlFor='name'>Name</label>
					<input
						required
						type='text'
						id='name'
						name='name'
						onChange={nameInputChangeHandler}
					/>
				</>
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
				<button type='submit'>Sign up</button>
			</form>
			<Link to='/login'>
				<span>Log in</span>
			</Link>
		</>
	);
}
