import { combineReducers } from 'redux';
import main from './index';

const rootReducer = combineReducers({
	main: main,
});

export default rootReducer;
