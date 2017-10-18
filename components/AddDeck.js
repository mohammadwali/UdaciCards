import React, {Component} from 'react'
import {connect} from 'react-redux'
import {MaterialIcons} from '@expo/vector-icons'
import {Text, StyleSheet, View} from 'react-native'

import {orange, darkGray} from '../utils/colors'
import {createDeck} from '../actions/deckActions'

import AddDeckFrom from './AddDeckForm'

class AddDeck extends Component {
    state = {
        focus: false
    };


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

                <AddDeckFrom focus={this.state.focus}
                             onSubmit={this.props.createDeck.bind(this)}/>

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

function mapDispatchToProps(dispatch, ownProps) {
    return {
        createDeck: title => dispatch(createDeck(title, () => ownProps.screenProps.rootNavigation.navigate('DeckView', {title})))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddDeck)