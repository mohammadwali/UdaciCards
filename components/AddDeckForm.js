import React, {Component} from 'react'
import {MaterialIcons} from '@expo/vector-icons'
import {View, TextInput, StyleSheet, KeyboardAvoidingView, TouchableNativeFeedback, ToastAndroid} from 'react-native'

import {orange, darkGray, darkOrange, white} from '../utils/colors'


const SubmitButton = ({disabled, onPress}) => {
    return <View style={[styles.button, {backgroundColor: (disabled ? darkGray : orange)}]}>
        <TouchableNativeFeedback
            onPress={onPress}
            disabled={disabled}
            background={TouchableNativeFeedback.Ripple(darkOrange, true)}>
            <View>
                <MaterialIcons name="send" size={23} style={{marginLeft: 5, color: white}}/>
            </View>
        </TouchableNativeFeedback>
    </View>
}

class AddDeckForm extends Component {
    state = {
        isValid: false,
        deckName: ""
    }

    onDeckValueChange(value) {
        this.setState({
            isValid: value.length > 3,
            deckName: value
        })
    }

    saveDeck(deckName) {
        if (!this.state.isValid) {
            return ToastAndroid.show('Deck name should be greater then 3 characters', ToastAndroid.SHORT);
        }

        this.props.onSubmit(deckName);

        this.setState({
            isValid: false,
            deckName: ""
        })
    }


    render() {
        const {isValid, deckName} = this.state;
        const {onDeckValueChange, saveDeck} = this;
        const {focus} = this.props;


        return (
            <View style={{flex: 1, flexDirection: 'row'}}>

                <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
                    <View>
                        <TextInput
                            autoFocus={focus}
                            style={styles.input}
                            value={deckName}
                            onSubmitEditing={() => saveDeck.bind(this)(deckName)}
                            onChangeText={onDeckValueChange.bind(this)}

                        />
                    </View>
                </KeyboardAvoidingView>


                <SubmitButton disabled={!isValid} onPress={() => saveDeck.bind(this)(deckName)}/>
            </View>
        )
    }


}

const styles = StyleSheet.create({
    input: {
        height: 60,
        fontSize: 18,
        marginTop: 5,
        marginRight: 10,
        marginLeft: 20,
        padding: 20
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        marginRight: 20,
        marginTop: 20,
        borderRadius: 100,
        height: 40
    }
})


export default AddDeckForm;