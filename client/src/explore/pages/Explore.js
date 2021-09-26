import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Explore() {
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
			<Link to='/auth/login'>
				<button>Log in</button>
			</Link>
			<Link to='/auth/signup'>
				<button>Sign up</button>
			</Link>
		</>
	);
}
