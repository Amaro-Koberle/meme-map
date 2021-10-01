import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ResetPassword() {
	const [email, setEmail] = useState('');

	const submitHandler = (event) => {
		event.preventDefault();
		axios
			.post('http://localhost:5000/auth/reset-password/', formData)
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	};

	const formData = { email: email };

	const emailInputChangeHandler = (event) => {
		setEmail(event.target.value);
	};

	return (
		<>
			<h1>Reset Password</h1>
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

				<button type='submit'>Send reset email</button>
			</form>
			<Link to='/login'>
				<span>Log in</span>
			</Link>
		</>
	);
}
