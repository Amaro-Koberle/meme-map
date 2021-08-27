import { useState } from 'react';
//import MyNotification from '../utils/MyNotification';

export default function Form({ getFormButton, onSubmit, children, ...props }) {
	const [{ err, isLoading }, setStatus] = useState({});

	const onFormSubmit = (e) => {
		e.preventDefault();

		if (isLoading) return;
		const form = e.target;

		const isValid = form.checkValidity();

		if (!isValid)
			return (
				!form.classList.contains('submitted') && form.classList.add('submitted')
			);

		const formData = new FormData(form);
		const values = {};

		for (let name of formData.keys()) values[name] = e.target[name].value;

		setStatus({ isLoading: true });

		onSubmit &&
			onSubmit({
				values,
				onSuccess: (message) => {
					if (message) MyNotification.success(message);
					setStatus({});
				},
				onFailure: (err) => {
					MyNotification.danger(err.response.data.message);
					setStatus({});
				},
				formData,
			});
	};

	return (
		<form onSubmit={onFormSubmit} {...props} noValidate='novalidate'>
			{children}
			{err && <p className='text-danger m-0'>{err.message}</p>}
			{getFormButton && getFormButton(isLoading)}
		</form>
	);
}
