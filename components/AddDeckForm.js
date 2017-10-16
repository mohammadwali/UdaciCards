import React, {Component} from 'react'
import {MaterialIcons} from '@expo/vector-icons'
import {View, TextInput, StyleSheet, KeyboardAvoidingView, TouchableNativeFeedback} from 'react-native'

import {orange, darkGray, darkOrange, white} from '../utils/colors'


const SubmitButton = ({disabled}) => {
    return <View style={[styles.button, {backgroundColor: (disabled ? darkGray : orange)}]}>
        <TouchableNativeFeedback
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

    render() {
        const {isValid, deckName} = this.state;
        const {onDeckValueChange} = this;


        return (
            <View style={{flex: 1, flexDirection: 'row'}}>

                <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
                    <View>
                        <TextInput
                            autoFocus={true}
                            style={styles.input}
                            defaultValue={deckName}
                            onChangeText={onDeckValueChange.bind(this)}
                        />
                    </View>
                </KeyboardAvoidingView>


                <SubmitButton disabled={!isValid}/>
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