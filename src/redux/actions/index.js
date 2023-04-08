import * as t from '../types';

export const setCharacters = (characters) => (dispatch) =>
	dispatch({
		type: t.SET_CHARACTERS,
		payload: characters,
	});

export const addFavourite = (characters) => (dispatch) =>
	dispatch({
		type: t.ADD_FAVOURITE,
		payload: characters,
	});

export const removeFavourite = (characters) => (dispatch) =>
	dispatch({
		type: t.REMOVE_FAVOURITE,
		payload: characters,
	});
