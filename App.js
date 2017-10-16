import React, {Component} from 'react'
import {View, Platform} from 'react-native'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {Constants} from 'expo'
import {MaterialIcons} from '@expo/vector-icons'
import {TabNavigator, StackNavigator} from 'react-navigation'

import {orange, gray, white, darkGray} from './utils/colors'

import rootReducer from './reducers/index'

import StatusBar from './components/StatusBar'
import Header from './components/Header'
import Decks from './components/Decks'
import AddDeck from './components/AddDeck'


const Tabs = TabNavigator({
    Decks: {
        screen: Decks,
        navigationOptions: {
            tabBarLabel: 'Decks List'
        },
    },
    AddDeck: {
        screen: AddDeck,
        navigationOptions: {
            tabBarLabel: 'Add Deck'
        },
    }
}, {
    navigationOptions: {
        header: null
    },

    tabBarOptions: {
        activeTintColor: orange,
        inactiveTintColor: darkGray,
        activeBackgroundColor: orange,
        style: {
            height: 56,
            backgroundColor: white,
            shadowColor: 'rgba(0, 0, 0, 0.24)',
            shadowOffset: {
                width: 0,
                height: 3
            },
            shadowRadius: 6,
            shadowOpacity: 1
        },
        indicatorStyle: {
            backgroundColor: orange
        }
    }
})


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
                    <Tabs/>

                </View>
            </Provider>
        );
    }
}
