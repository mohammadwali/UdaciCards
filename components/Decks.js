import React, {Component} from 'react'
import {connect} from 'react-redux'
import {ScrollView, View, Text, ActivityIndicator, RefreshControl, StyleSheet} from 'react-native'
import {List, ListItem} from 'react-native-elements'

import {gray} from '../utils/colors'


const DecksHeading = () => <View style={{marginTop: 20}}>
    <Text style={{fontSize: 18, color: '#c6c8cb', fontWeight: 'bold'}}>Avialable Decks</Text>
</View>

const DecksList = ({decks}) => <View style={{marginTop: 0}}>
    <List containerStyle={{borderTopWidth: 0, marginTop: 10}}>
        {
            Object.keys(decks).map(deck => {
                const deckItem = decks[deck];
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


class Decks extends Component {

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

    state = {
        isLoading: false,
        isRefreshing: false
    };

    render() {
        const {isLoading, isRefreshing} = this.state;
        const {decks} = this;

        return (

            isLoading ?

                <ActivityIndicator
                    animating={true}
                    style={styles.activityIndicator}
                    size="large"/>

                :

                <ScrollView
                    refreshControl={ <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={() => console.log("refreshing....")}
                    />}
                    style={{
                        marginLeft: 20,
                        marginRight: 20
                    }}>
                    <DecksHeading />
                    <DecksList decks={decks}/>
                </ScrollView>
        )
    }


}


const styles = StyleSheet.create({
    activityIndicator: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
        flex: 1, height: 80
    }
})


function mapStateToProps(state, ownProps) {
    return {
        ...ownProps
    }
}
export default connect(
    mapStateToProps,
)(Decks)