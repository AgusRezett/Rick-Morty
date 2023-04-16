import * as t from '../types';

export const setCharacters = (characters) => (dispatch) =>
	dispatch({
		type: t.SET_CHARACTERS,
		payload: characters,
	});

export const addFavourite = (characters) => (dispatch) => {
	return dispatch({
		type: t.ADD_FAVOURITE,
		payload: characters,
	});
};

export const removeFavourite = (characters) => (dispatch) =>
	dispatch({
		type: t.REMOVE_FAVOURITE,
		payload: characters,
	});

export const setCharCardVisible = (state) => (dispatch) =>
	dispatch({
		type: t.SET_CHAR_CARD_VISIBLE,
		payload: state,
	});
export const setCharCardInfo = (info) => (dispatch) =>
	dispatch({
		type: t.SET_CHAR_CARD_INFO,
		payload: info,
	});
