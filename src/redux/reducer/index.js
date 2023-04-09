import * as t from '../types';

const main = (
	state = {
		characters: [],
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
			console.log(newArray);
			/* console.log('removee');
			const onDeleteFav = (id) => {
		setFavoriteCharacters((oldChars) => {
			return oldChars.filter((character) => character.id !== id);
		});
	}; */

			return {
				...state,
				favourites: newArray,
			};
		default:
			return { ...state };
	}
};

export default main;
