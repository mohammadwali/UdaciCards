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
    .then(result => console.log(result))
    .catch(e => console.log(e))
