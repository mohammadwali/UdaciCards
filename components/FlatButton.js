import React, {Component} from 'react';
import {Text, StyleSheet, TouchableNativeFeedback, View} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';


import {orange, white} from '../utils/colors'


export default function FlatButton({size = 'lg', hasBorder, iconName, onPress, text, backgroundColor = orange, borderColor = orange, style}) {
    const btnSizeStyle = {
        wrapper: styles['button_' + size],
        text: styles['text_' + size],
    };

    return (
        <View style={   !hasBorder ? [styles.button, {
            backgroundColor,
            borderColor: backgroundColor
        }, style] : [styles.button, styles.buttonBorder, {borderColor}, style]   }>
            <TouchableNativeFeedback
                onPress={onPress}
                background={TouchableNativeFeedback.Ripple("rgba(0, 0, 0, 0.5)", true)}>

                <View style={[styles.wrapper, btnSizeStyle.wrapper]}>

                    <MaterialIcons name={iconName} style={{color: (hasBorder ? borderColor : white), marginRight: 1}}
                                   size={size === 'md' ? 14 : 18}/>

                    <Text style={[{color: (hasBorder ? borderColor : white)}, btnSizeStyle.text]}> { text } </Text>

                </View>

            </TouchableNativeFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        borderWidth: 1,
        borderRadius: 5
    },
    buttonBorder: {
        backgroundColor: null,
    },
    button_md: {
        padding: 10
    },
    button_lg: {
        padding: 20
    },
    text_md: {
        fontSize: 14
    },
    text_lg: {
        fontSize: 16
    }
})