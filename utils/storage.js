import {AsyncStorage} from 'react-native'

const STORAGE_KEY = 'UDACICARDS:STORAGEKEY'

export const getDecks = () => AsyncStorage.getItem(STORAGE_KEY)
    .then(result => JSON.parse(result))


export const saveDeck = title => AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
    [title]: {
        title: title,
        questions: []
    }
}))
    .catch(e => console.log(e))

export const removeDeck = title => getDecks().then(decks => {
    delete decks[title];

    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
})

export const createCard = (deck, card) => getDecks().then(decks => {
    decks[deck].questions.push(card);

    return AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
})
