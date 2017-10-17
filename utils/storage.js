import {AsyncStorage} from 'react-native'

const STORAGE_KEY = 'UDACICARDS:STORAGEKEY'

export const getDecks = () => AsyncStorage.getItem(STORAGE_KEY)
    .then(result => JSON.parse(result))
