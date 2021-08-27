import { Link } from 'react-router-dom';

export default function HomePage(props) {
	return (
		<div>
			<Link to='/login'>
				<button>Log in</button>
			</Link>
			<Link to='/signup'>
				<button>Sign up</button>
			</Link>
		</div>
	);
}
