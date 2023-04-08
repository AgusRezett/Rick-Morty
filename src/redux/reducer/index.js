import * as t from '../types';

const main = (
	state = {
		characters: [],
		loading: false,
		error: null,
		todos: [],
	},
	action
) => {
	switch (action.type) {
		case t.SET_CHARACTERS:
			return {
				...state,
				characters: action.payload,
			};
		default:
			return { ...state };
	}
};

export default main;
