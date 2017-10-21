import React, {Component} from 'react';
import {Text, StyleSheet, TouchableNativeFeedback, View, Alert, ToastAndroid} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import {connect} from 'react-redux';

import {formatCardsCount} from '../utils'
import {darkOrange, orange, white, black, darkGray} from '../utils/colors'

import {deleteDeck as removeDeck} from '../actions/deckActions'

import FlatButton from '../components/FlatButton'

class DeckView extends Component {
    static navigationOptions = ({navigation}) => {
        const {title} = navigation.state.params;

        return {
            title
        }
    }


    startQuiz() {
        const {deck, navigation} = this.props;

        if (deck.questions.length === 0) {
            return ToastAndroid.show('No Cards in this Deck', ToastAndroid.SHORT);
        }

        navigation.navigate('QuizView', {title: deck.title})
    }


    render() {
        const {deck, deleteDeck, navigation} = this.props;
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

                        <FlatButton
                            hasBorder
                            iconName='library-add'
                            text='Add Card'
                            onPress={() => navigation.navigate('AddCard', {deckTitle: deck.title})}
                        />


                        <FlatButton
                            hasBorder
                            iconName='delete'
                            text='Remove Deck'
                            onPress={() => deleteDeck.bind(this)(deck.title)}
                        />


                    </View>

                    <View style={{width: 300}}>
                        <FlatButton
                            textStyle={{textAlign: 'center'}}
                            iconName='question-answer'
                            text='Start Quiz'
                            onPress={this.startQuiz.bind(this)}
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
