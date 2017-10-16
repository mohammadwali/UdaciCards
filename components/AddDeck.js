import React, {Component} from 'react'
import {connect} from 'react-redux'
import {MaterialIcons} from '@expo/vector-icons'
import {Text, StyleSheet, View} from 'react-native'

import {orange, darkGray} from '../utils/colors'

import AddDeckFrom from './AddDeckForm'

class AddDeck extends Component {
    state = {};


    render() {
        return (


            <View style={{flex: 1}}>


                <View style={{alignItems: 'center'}}>
                    <View style={{marginTop: 20}}>
                        <MaterialIcons name="add-to-photos" size={80} color={orange}/>
                    </View>

                    <View>
                        <Text style={styles.heading}>What would you like to name your new deck ?</Text>
                    </View>
                </View>

                <AddDeckFrom/>

            </View>


        )
    }


}


const styles = StyleSheet.create({
    heading: {
        fontSize: 30,
        marginTop: 20,
        textAlign: 'center',
        color: darkGray
    }
})


function mapStateToProps(state, ownProps) {
    return {
        ...ownProps
    }
}
export default connect(mapStateToProps)(AddDeck)