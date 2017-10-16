import {combineReducers} from 'redux'

import DecksReducer from './DecksReducer'


export default combineReducers({
    decks: DecksReducer
})