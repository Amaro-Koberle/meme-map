import { createStore, combineReducers, applyMiddleware } from 'redux';
import userReducer from './reducers/userReducer';
import thunk from 'redux-thunk';

const rootReducers = combineReducers({
	user: userReducer,
});

const redux = createStore(rootReducers, applyMiddleware(thunk));

export default redux;
