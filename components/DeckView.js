import React, {Component} from 'react';
import {Text, StyleSheet, TouchableNativeFeedback, View, Alert, ToastAndroid} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import {connect} from 'react-redux';

import {formatCardsCount} from '../utils'
import {darkOrange, orange, white, black, darkGray} from '../utils/colors'

import {deleteDeck as removeDeck} from '../actions/deckActions'

const Button = ({hasBorder, iconName, onPress, text}) => {
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


class DeckView extends Component {
    static navigationOptions = ({navigation}) => {
        const {title} = navigation.state.params;

        return {
            title
        }
    }


    render() {
        const {deck, deleteDeck} = this.props;
        const availableCards = deck.questions.length;

        return (
            <View style={styles.container}>

                <View style={{height: 370}}>


                    <View style={styles.card}>

                        <Text style={styles.cardTitle}>{deck.title}</Text>
                        <Text style={{color: darkGray}}>

                            { formatCardsCount(availableCards) } available.

                        </Text>


                    </View>
                    <View style={[styles.card, styles.emptyCard1]}/>
                    <View style={[styles.card, styles.emptyCard2]}/>

                </View>

                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View style={{
                        flexDirection: 'row'
                    }}>

                        <Button
                            hasBorder
                            iconName='library-add'
                            text='Add Card'
                            onPress={() => {
                            }}
                        />


                        <Button
                            hasBorder
                            iconName='delete'
                            text='Remove Card'
                            onPress={() => deleteDeck.bind(this)(deck.title)}
                        />


                    </View>

                    <View style={{width: 300}}>
                        <Button
                            textStyle={{textAlign: 'center'}}
                            iconName='question-answer'
                            text='Start Quiz'
                            onPress={() => {
                            }}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    card: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: white,
        borderRadius: 5,
        shadowColor: black,
        shadowOpacity: 1,
        shadowOffset: {width: 1, height: 1},
        shadowRadius: 1,
        position: 'absolute',
        width: 350,
        height: 200,
        top: 120,
        left: 25,
        elevation: 3,
        padding: 20
    },
    emptyCard1: {
        transform: [{rotate: '5deg'}],
        elevation: 1
    },
    emptyCard2: {
        transform: [{rotate: '10deg'}],
        elevation: 2
    },
    cardTitle: {
        fontSize: 40,
        fontWeight: '100',
        color: orange
    },
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
});

function mapStateToProps(state, {navigation}) {
    const {title} = navigation.state.params;

    return {
        deck: state.decks[title]
    }
}


function mapDispatchToProps(dispatch, ownProps) {
    return {
        deleteDeck: (title) => {

            Alert.alert(
                `Delete ${title}?`,
                `Are you sure you want to delete '${title}' Deck?`,
                [
                    {text: 'Cancel', style: 'cancel'},
                    {
                        text: 'Delete',
                        onPress: () => {
                            dispatch(removeDeck(title))

                            ownProps.navigation.goBack();

                            ToastAndroid.show(`Deck ${title} deleted successfully!`, ToastAndroid.SHORT);
                        }
                    },
                ],
                {
                    cancelable: true
                }
            )
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckView);
