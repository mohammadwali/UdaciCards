import {AsyncStorage} from 'react-native'
const NOTIFICATION_KEY = 'UDACICARDS:NOTIFICATIONKEY'
const FLASH_CARDS_STORAGE_KEY = 'UDACICARDS:STORAGEKEY'

export const getDecks = () => AsyncStorage.getItem(FLASH_CARDS_STORAGE_KEY)
    .then(result => JSON.parse(result))


export const saveDeck = title => AsyncStorage.mergeItem(FLASH_CARDS_STORAGE_KEY, JSON.stringify({
    [title]: {
        title: title,
        questions: []
    }
}))
    .catch(e => console.log(e))

export const removeDeck = title => getDecks().then(decks => {
    delete decks[title];

    AsyncStorage.setItem(FLASH_CARDS_STORAGE_KEY, JSON.stringify(decks));
})

export const createCard = (deck, card) => getDecks().then(decks => {
    decks[deck].questions.push(card);

    return AsyncStorage.setItem(FLASH_CARDS_STORAGE_KEY, JSON.stringify(decks));
})


export const getSavedScheduledNotification = () => AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(result => JSON.parse(result))


export const saveSavedScheduledNotification = () => AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));