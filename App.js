import React from 'react'
import {View} from 'react-native'
import {orange} from './utils/colors'
import StatusBar from './components/StatusBar'

export default class App extends React.Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <StatusBar backgroundColor={orange}/>
            </View>
        );
    }
}
