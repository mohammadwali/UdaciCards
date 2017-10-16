import React, {Component} from 'react'
import {View, KeyboardAvoidingView, TextInput, Text, StyleSheet} from 'react-native'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {orange, gray} from './utils/colors'

import {Constants} from 'expo'

import rootReducer from './reducers/index'

import StatusBar from './components/StatusBar'
import Header from './components/Header'
import Decks from './components/Decks'
import AddDeck from './components/AddDeck'

const configureStore = initialState => {
    const store = createStore(rootReducer, initialState);

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('./reducers', () => {
            const nextRootReducer = require('./reducers/index');
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}


export default class App extends Component {
    state = {
        email: '',
    };


    render() {
        return (
            <Provider store={configureStore()}>
                <View style={{flex: 1, backgroundColor: gray, flexDirection: 'column'}}>

                    <StatusBar backgroundColor={orange}/>
                    <Header backgroundColor={orange}/>
                    <AddDeck/>

                </View>
            </Provider>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
    },
    header: {
        paddingTop: 20 + Constants.statusBarHeight,
        padding: 20,
        backgroundColor: '#336699',
    },
    description: {
        fontSize: 14,
        color: 'white',
    },
    input: {
        margin: 20,
        marginBottom: 0,
        height: 34,
        paddingHorizontal: 10,
        borderRadius: 4,
        borderColor: '#ccc',
        borderWidth: 1,
        fontSize: 16,
    },
    legal: {
        margin: 10,
        color: '#333',
        fontSize: 12,
        textAlign: 'center',
    },
    form: {
        flex: 1,
        justifyContent: 'space-between',
    },
});
