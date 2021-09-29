import { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

export default function ChangePassword() {
	// extracting the token from the url
	const params = useParams();
	const token = params.token;

	const history = useHistory();

	const [newPassword, setNewPassword] = useState('');

	const submitHandler = (event) => {
		event.preventDefault();
		console.log(formData);
		axios
			.post('http://localhost:5000/auth/new-password/', formData)
			.then((res) => {
				console.log(res);
				// redirect to home page
				history.push('/');
			})
			.catch((err) => console.log(err));
	};

	const formData = {
		newPassword: newPassword,
		resetToken: token,
		userId: localStorage.getItem('userId'),
	};

	const newPasswordInputChangeHandler = (event) => {
		setNewPassword(event.target.value);
	};

	return (
		<>
			<h1>Change Password</h1>
			<form onSubmit={submitHandler}>
				<>
					<label htmlFor='newPassword'>New password</label>
					<input
						required
						type='password'
						id='newPassword'
						name='newPassword'
						onChange={newPasswordInputChangeHandler}
					/>
				</>

				<button type='submit'>Change password</button>
			</form>
		</>
	);
}
