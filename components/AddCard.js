import React, {Component} from 'react'
import {ScrollView, View, Text, KeyboardAvoidingView, TextInput, StyleSheet} from 'react-native'
import {connect} from 'react-redux'

import {MaterialIcons} from '@expo/vector-icons'


import {white, black, darkerGray, orange} from '../utils/colors'
import FlatButton from './FlatButton'

import {addCard} from '../actions/deckActions'

class AddCard extends Component {
    state = {
        question: '',
        answer: '',
        isValid: false,
        inValidReason: ''
    }

    handleInputTextChange(input, value) {
        this.setState({
            [input]: value
        })

        this.setState(this.validateValues())
    }


    validateValues() {
        const {question, answer} = this.state

        const questionLength = question.trim().split(" ");
        const answerLength = answer.trim().length

        if (!questionLength && !answerLength) {
            return {
                isValid: false,
                inValidReason: 'Please fill question and answer for creating a card'
            }
        }


        if (!questionLength) {
            return {
                isValid: false,
                inValidReason: 'Please enter a question'
            }
        }


        if (questionLength < 3) {
            return {
                isValid: false,
                inValidReason: 'Question cannot be less then 3 words'
            }
        }


        if (!answerLength) {
            return {
                isValid: false,
                inValidReason: 'Please enter an answer'
            }
        }


        if (answerLength < 3) {
            return {
                isValid: false,
                inValidReason: 'Answer cannot be less then 3 letters'
            }
        }


        return {
            isValid: true,
            inValidReason: ''
        }
    }

    onSubmit() {


        if (this.state.isValid) {
            this.props.addCard({
                question: this.state.question,
                answer: this.state.answer
            })
        }


    }


    render() {

        const {question, answer} = this.state;

        return (

            <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>
                <View style={styles.card}>

                    <View>
                        <MaterialIcons name='library-add' size={100} style={{color: orange}}/>
                    </View>

                    <View>
                        <TextInput
                            autoFocus={true}
                            style={styles.input}
                            underlineColorAndroid={darkerGray}
                            placeholder={"Question"}
                            returnKeyType={ "next" }
                            blurOnSubmit={ false }
                            value={question}
                            onSubmitEditing={() => {
                                this.refs.answerInput.focus()
                            }}
                            onChangeText={(value) => this.handleInputTextChange.bind(this)('question', value)}
                        />
                    </View>


                    <View>
                        <TextInput
                            style={styles.input}
                            underlineColorAndroid={darkerGray}
                            placeholder={"Answer"}
                            returnKeyType={ "done" }
                            blurOnSubmit={ true }
                            ref="answerInput"
                            value={answer}
                            onSubmitEditing={this.onSubmit.bind(this)}
                            onChangeText={(value) => this.handleInputTextChange.bind(this)('answer', value)}
                        />
                    </View>


                    <FlatButton
                        iconName="send"
                        text="Add new card"
                        size="lg"
                        style={{marginTop: 25}}
                        onPress={this.onSubmit.bind(this)}
                    />
                </View>
            </KeyboardAvoidingView>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 50,
        marginRight: 50
    },
    card: {
        alignItems: 'center',
        backgroundColor: white,
        borderRadius: 5,
        shadowColor: black,
        shadowOpacity: 1,
        shadowOffset: {width: 0, height: 1},
        shadowRadius: 1,
        elevation: 3,
        padding: 20
    },
    input: {
        height: 60,
        fontSize: 18,
        marginTop: 5,
        marginRight: 10,
        marginLeft: 10,
        padding: 20,
        width: 280
    }
})

function mapStateToProps(state, ownProps) {
    const {deckTitle} = ownProps.navigation.state.params;

    return {
        deckTitle,
        ...ownProps
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    const {deckTitle} = ownProps.navigation.state.params;

    return {
        addCard: (card) => dispatch(addCard(deckTitle, card))
            .then(() => {
                ownProps.navigation.navigate('DeckView', {title: deckTitle})
            })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddCard);