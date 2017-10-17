import React, {Component} from 'react'
import {connect} from 'react-redux'
import {ScrollView, View, Text, ActivityIndicator, RefreshControl, StyleSheet} from 'react-native'
import {List, ListItem} from 'react-native-elements'

import {gray} from '../utils/colors'
import {formatCardsCount} from '../utils'


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
    state = {
        isLoading: false,
        isRefreshing: false
    };

    static defaultProps = {
        decks: {}
    }

    openDeck(deck) {
        this.props.screenProps.rootNavigation.navigate('DeckView', {title: deck.title});
    }

    render() {
        const {decks} = this.props;
        const {isLoading, isRefreshing} = this.state;

        return (

            isLoading ?

                <ActivityIndicator
                    animating={true}
                    style={styles.activityIndicator}
                    size='large'/>

                :

                <ScrollView
                    refreshControl={ <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={() => console.log('refreshing....')}
                    />}
                    style={{
                        marginLeft: 20,
                        marginRight: 20
                    }}>
                    <DecksHeading />
                    <DecksList decks={decks} openDeck={this.openDeck.bind(this)}/>
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
export default connect(
    mapStateToProps,
)(Decks)