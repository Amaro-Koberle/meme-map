import { Link } from 'react-router-dom';

export default function Navigation() {
	return (
		<div>
			<nav>
				<ul>
					<li>
						<Link to='/'>Explore</Link>
					</li>
					<li>
						<Link to='/'>Wallet</Link>
					</li>
					<li>
						<Link to='/'>Create</Link>
					</li>
					<li>
						<Link to='/profile'>Profile</Link>
					</li>
					<li>
						<Link to='/'>Settings</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
}
