import * as t from '../types';

export const setCharacters = (characters) => (dispatch) =>
	dispatch({
		type: t.SET_CHARACTERS,
		payload: characters,
	});
