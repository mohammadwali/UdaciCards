import {getDecks, saveDeck, removeDeck, createCard} from '../utils/storage'

import * as actions from './actionTypes'

export const decksLoadedSuccess = decks => ({
    type: actions.DECKS_LOADED,
    decks
});

export const loadDecks = () => dispatch => getDecks()
    .then(decks => dispatch(decksLoadedSuccess(decks)))
    .catch(error => console.log("something went wrong ", error))

export const createDeck = (title, onDone) => dispatch => saveDeck(title)
    .then(() => getDecks().then(decks => {

        dispatch(decksLoadedSuccess(decks))

        if (onDone) {
            onDone()
        }

    }))
    .catch(error => console.log("something went wrong ", error))

export const deleteDeck = title => dispatch => removeDeck(title).then(() => loadDecks()(dispatch))

export const addCard = (deckTitle, card) => dispatch => createCard(deckTitle, card).then(() => loadDecks()(dispatch))
