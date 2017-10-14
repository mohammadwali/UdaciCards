import React, {Component} from 'react'
import {View} from 'react-native'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {orange, gray} from './utils/colors'

import rootReducer from './reducers/index'

import StatusBar from './components/StatusBar'
import Header from './components/Header'
import Decks from './components/Decks'

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


    render() {
        return (
            <Provider store={configureStore()}>
                <View style={{flex: 1, backgroundColor: gray, flexDirection: 'column'}}>

                    <StatusBar backgroundColor={orange}/>
                    <Header backgroundColor={orange}/>
                    <Decks/>

                </View>
            </Provider>
        );
    }
}
