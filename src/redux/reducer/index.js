import * as t from '../types';

const main = (
	state = {
		characters: [],
		selectedCharCard: {},
		favourites: [],
		loading: false,
		error: null,
	},
	action
) => {
	switch (action.type) {
		case t.SET_CHARACTERS:
			return {
				...state,
				characters: action.payload,
			};
		case t.ADD_FAVOURITE:
			return {
				...state,
				favourites: [...state.favourites, action.payload],
			};
		case t.REMOVE_FAVOURITE:
			const newArray = state.favourites.filter((char) => {
				return char.id !== action.payload;
			});

			return {
				...state,
				favourites: newArray,
			};
		case t.SET_CHAR_CARD_VISIBLE:
			return {
				...state,
				selectedCharCard: {
					...state.selectedCharCard,
					visible: action.payload,
				},
			};
		case t.SET_CHAR_CARD_INFO:
			return {
				...state,
				selectedCharCard: {
					...state.selectedCharCard,
					info: action.payload,
				},
			};
		default:
			return { ...state };
	}
};

export default main;
