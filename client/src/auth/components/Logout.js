import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../context/auth-context';

export default function Logout() {
	const authContext = useContext(AuthContext);
	const history = useHistory();

	const logoutHandler = () => {
		// log out by setting the token to null
		authContext.logout();
		// redirect to home page
		history.push('/');
	};

	return <button onClick={logoutHandler}>Log out</button>;
}
