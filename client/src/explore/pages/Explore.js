import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth-context';

export default function Explore() {
	const isLoggedIn = useContext(AuthContext).isLoggedIn;
	const [searchTerm, setSearchTerm] = useState('');

	const searchHandler = (event) => {
		event.preventDefault();
	};

	const searchInputChangeHandler = (event) => {
		setSearchTerm(event.target.value);
	};

	return (
		<>
			<h1>Explore</h1>
			<form onSubmit={searchHandler}>
				<>
					<input
						required
						placeholder='Search'
						type='search'
						id='search'
						name='search'
						onChange={searchInputChangeHandler}
					/>
				</>
				<button type='submit'>Search</button>
			</form>

			{!isLoggedIn && (
				<>
					<Link to='/login'>
						<button>Log in</button>
					</Link>
					<Link to='/signup'>
						<button>Sign up</button>
					</Link>
				</>
			)}
		</>
	);
}
