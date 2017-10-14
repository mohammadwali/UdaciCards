import React from 'react'
import {View} from 'react-native'
import {createStore} from 'redux'
import {Provider} from 'react-redux'

import {orange} from './utils/colors'

import reducer from './reducers/index'

import StatusBar from './components/StatusBar'

export default class App extends React.Component {
    render() {
        return (
            <Provider store={createStore(reducer)}>
                <View style={{flex: 1}}>
                    <StatusBar backgroundColor={orange}/>
                </View>
            </Provider>
        );
    }
}
