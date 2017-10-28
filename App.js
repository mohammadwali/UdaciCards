import React, {Component} from 'react'
import {View, Platform} from 'react-native'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import {Constants} from 'expo'
import {MaterialIcons} from '@expo/vector-icons'
import {TabNavigator, StackNavigator} from 'react-navigation'
import thunk from 'redux-thunk';

import {orange, gray, white, darkGray, transparent} from './utils/colors'
import {setLocalNotification} from './utils/notifications'

import rootReducer from './reducers/index'

import StatusBar from './components/StatusBar'
import Header from './components/Header'
import Decks from './components/Decks'
import AddDeck from './components/AddDeck'
import DeckView from './components/DeckView';
import AddCard from './components/AddCard'
import QuizView from './components/QuizView'

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

const mainNavigatorViewOptions = {
    headerTintColor: white,
    headerStyle: {
        backgroundColor: orange,
        height: 56 + Constants.statusBarHeight,
        paddingTop: Constants.statusBarHeight
    }
}
const MainNavigator = StackNavigator({
    Home: {
        screen: ({navigation}) => {
            return (
                <View style={{flex: 1}}>
                    <StatusBar backgroundColor={orange}/>
                    <Header backgroundColor={orange}/>
                    <Tabs screenProps={{rootNavigation: navigation}}/>
                </View>
            )
        },

        navigationOptions: {
            header: null
        }
    },
    DeckView: {
        screen: DeckView,
        navigationOptions: mainNavigatorViewOptions
    },
    AddCard: {
        screen: AddCard,
        navigationOptions: {title: 'Add Card', ...mainNavigatorViewOptions}
    },
    QuizView: {
        screen: QuizView,
        navigationOptions: {
            title: 'Quiz',
            header: null
        }
    }
})

const configureStore = () => {
    const store = createStore(rootReducer, applyMiddleware(thunk));

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

    componentDidMount() {
        setLocalNotification()
    }

    render() {
        return (
            <Provider store={configureStore()}>
                <View style={{flex: 1, backgroundColor: transparent, flexDirection: 'column'}}>
                    <MainNavigator />
                </View>
            </Provider>

        );
    }
}
