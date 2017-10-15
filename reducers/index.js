import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form';

import DecksReducer from './DecksReducer'


export default combineReducers({
    decks: DecksReducer,
    forms: formReducer
})