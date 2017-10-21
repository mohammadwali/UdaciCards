import React from 'react';
import {StyleSheet, TouchableNativeFeedback, View} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';


import {darkGray, white, orange} from '../utils/colors'


export default function RoundButton({disabled, iconName, onPress, background = orange, size = 'md'}) {
    return (

        <View style={[styles.button, styles['button_' + size], {backgroundColor: (disabled ? darkGray : background)}]}>
            <TouchableNativeFeedback
                onPress={onPress}
                disabled={disabled}
                style={styles.wrapper}
                background={TouchableNativeFeedback.Ripple("rgba(0, 0, 0, 0.5)", true)}>
                <View style={styles.wrapper}>
                    <MaterialIcons name={iconName} size={23} style={{color: white}}/>
                </View>
            </TouchableNativeFeedback>
        </View>

    )
}


const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        marginRight: 20,
        marginTop: 20,
        borderRadius: 100
    },
    button_md: {
        width: 40,
        height: 40
    },

    button_lg: {
        width: 60,
        height: 60
    }
})