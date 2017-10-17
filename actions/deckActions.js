import {getDecks} from '../utils/storage'

import * as actions from './actionTypes'

export const decksLoadedSuccess = decks => ({
    type: actions.DECKS_LOADED,
    decks
});

export const loadDecks = () => dispatch => getDecks()
    .then(decks => dispatch(decksLoadedSuccess(decks)))
    .catch(error => console.log("something went wrong ", error))