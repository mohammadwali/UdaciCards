import React, {Component} from 'react';
import {Text, StyleSheet, TouchableNativeFeedback, View} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';


import {darkOrange, orange, white} from '../utils/colors'


export default function FlatButton({hasBorder, iconName, onPress, text}) {
    return (
        <View style={   !hasBorder ? styles.button : [styles.button, styles.buttonBorder]   }>
            <TouchableNativeFeedback
                onPress={onPress}
                background={TouchableNativeFeedback.Ripple(darkOrange, true)}>

                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>

                    <MaterialIcons name={iconName} style={{color: (hasBorder ? orange : white), marginRight: 1}}
                                   size={14}/>

                    <Text style={{color: (hasBorder ? orange : white)}}> { text } </Text>

                </View>

            </TouchableNativeFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: orange,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginTop: 20,
        marginRight: 10,
        borderColor: orange,
    },
    buttonBorder: {
        backgroundColor: null,
    }
})