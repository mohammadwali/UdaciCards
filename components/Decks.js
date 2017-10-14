import React, {Component} from 'react'
import {ScrollView, View, Text} from 'react-native'
import {List, ListItem} from 'react-native-elements'

import {gray} from '../utils/colors'

export default class App extends Component {

    decks = {
        React: {
            title: 'React',
            questions: [
                {
                    question: 'What is React?',
                    answer: 'A library for managing user interfaces'
                },
                {
                    question: 'Where do you make Ajax requests in React?',
                    answer: 'The componentDidMount lifecycle event'
                }
            ]
        },
        JavaScript: {
            title: 'JavaScript',
            questions: [
                {
                    question: 'What is a closure?',
                    answer: 'The combination of a function and the lexical environment within which that function was declared.'
                }
            ]
        }
    };

    render() {
        return (
            <ScrollView style={{paddingLeft: 20, paddingRight: 20}}>

                <View style={{marginTop: 20}}>
                    <Text style={{fontSize: 18, color: '#c6c8cb', fontWeight: 'bold'}}>Avialable Decks</Text>
                </View>


                <View style={{marginTop: 0}}>
                    <List containerStyle={{borderTopWidth: 0, marginTop: 10}}>
                        {
                            Object.keys(this.decks).map(deck => {

                                const deckItem = this.decks[deck];
                                const {questions, title} = deckItem;


                                return <ListItem onPress={() => alert("hey")}
                                                 containerStyle={{borderBottomColor: gray}}

                                                 rightTitle={questions.length + " cards"}
                                                 key={deck}
                                                 title={title}
                                />


                            })
                        }
                    </List>
                </View>

            </ScrollView>
        )
    }


}