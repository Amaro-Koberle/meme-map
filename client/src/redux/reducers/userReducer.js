const user = JSON.parse(localStorage.getItem('user'));

const userReducer = (state = user, action) => {
	if (action.type === 'user-state-changed') {
		return action.payload;
	}
	return state;
};

export default userReducer;
