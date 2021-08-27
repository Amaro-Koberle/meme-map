import InputField from '../../ui/InputField/index';
import { Link } from 'react-router-dom';
import Form from '../../hoc/Form';
import Auth from '../../hoc/Auth';
//import { useDispatch } from 'react-redux';

export default function SignupPage(props) {
	//const dispatch = useDispatch();
	//const onSubmit = (formData) => dispatch(signUpAction(formData));
	return (
		<Auth>
			<Form
				getFormButton={(isLoading) => (
					<div className='gap-3 d-flex flex-column flex-md-row'>
						<button className='flex-1 btn btn-primary'>
							Sign up {isLoading && <span className='spinner'></span>}
						</button>
					</div>
				)}>
				<h2>Sign up</h2>
				<Link to='/login'>
					<h2>Log in</h2>
				</Link>
				<InputField
					title='Name'
					type='text'
					className='invalid'
					name='displayName'
					minLength={3}
					required={true}
					error='Display name must be a minimum of 3 characters long.'
				/>
				<InputField
					title='Email'
					type='email'
					name='email'
					pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
					required={true}
					error='The provided email address is not valid.'
				/>
				<InputField
					className='invalid'
					title='Password'
					type='password'
					name='password'
					required={true}
					minLength={6}
					error='Password must be a minimum of 6 characters long.'
				/>
			</Form>
		</Auth>
	);
}
