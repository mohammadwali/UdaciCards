import React, {Component} from 'react'
import {connect} from 'react-redux'
import {ScrollView, View, Text, TouchableNativeFeedback, RefreshControl, StyleSheet} from 'react-native'
import {List, ListItem} from 'react-native-elements'
import {MaterialCommunityIcons} from '@expo/vector-icons'

import {gray, orange, darkerGray} from '../utils/colors'
import {formatCardsCount} from '../utils'

import {loadDecks} from '../actions/deckActions'


const DecksHeading = () => <View style={{marginTop: 20}}>
    <Text style={{fontSize: 18, color: '#c6c8cb', fontWeight: 'bold'}}>Avialable Decks</Text>
</View>

const DecksList = ({decks, openDeck}) => <View style={{marginTop: 0}}>
    <List containerStyle={{borderTopWidth: 0, marginTop: 10}}>
        {
            Object.keys(decks).map(deck => {
                const deckItem = decks[deck];
                const {questions, title} = deckItem;

                return <ListItem onPress={() => openDeck(deckItem)}
                                 containerStyle={{borderBottomColor: gray}}
                                 rightTitle={ formatCardsCount(questions.length) }
                                 key={deck}
                                 title={title}
                />
            })
        }
    </List>
</View>


class Decks extends Component {

    static defaultProps = {
        decks: {}
    }

    componentDidMount() {
        this.props.loadDecks()
    }

    openDeck(deck) {
        this.props.screenProps.rootNavigation.navigate('DeckView', {title: deck.title});
    }

    render() {
        const {decks} = this.props;
        const hasDecks = Object.keys(decks).length;

        return (

            !hasDecks ?

                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20}}>

                    <View>
                        <MaterialCommunityIcons name='emoticon-sad' size={140} style={{color: darkerGray}}/>
                    </View>

                    <Text style={{color: darkerGray, fontSize: 30, textAlign: 'center', lineHeight: 50}}>
                        No decks are available.
                    </Text>

                    <View style={{marginTop: 10}}>
                        <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('AddDeck')}>
                            <Text style={{fontSize: 22, textAlign: 'center', color: orange}}>
                                Create now
                            </Text>
                        </TouchableNativeFeedback>
                    </View>
                </View>

                :

                <ScrollView>
                    <View style={{
                        marginLeft: 20,
                        marginRight: 20
                    }}>
                        <DecksHeading />
                        <DecksList decks={decks} openDeck={this.openDeck.bind(this)}/>
                    </View>
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
        decks: state.decks,
        ...ownProps
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadDecks: () => dispatch(loadDecks())
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Decks)