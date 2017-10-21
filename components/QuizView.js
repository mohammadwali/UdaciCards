import Chroma from 'chroma-js'
import {LinearGradient} from 'expo'
import {connect} from 'react-redux'
import React, {Component} from 'react'
import Carousel from 'react-native-snap-carousel'
import {StyleSheet, View, Dimensions, Alert} from 'react-native'

import QuizCard from './QuizCard'
import FlatButton from './FlatButton'
import QuizProgress from './QuizProgress'

const GRADIENT_COLOR_LENGTH = 700
const {width, height} = Dimensions.get('window');
const TOP_COLORS = ['#000428', '#003973', '#4776E6', '#134E5E', '#C04848', '#000000', '#001510']
const BOTTOM_COLORS = ['#004e92', '#E5E5BE', '#8E54E9', '#71B280', '#480048', '#e74c3c', '#00bf8f']

const TOP_COLORS_SPECTRUM = Chroma.scale(TOP_COLORS).colors(GRADIENT_COLOR_LENGTH)
const BOTTOM_COLORS_SPECTRUM = Chroma.scale(BOTTOM_COLORS).colors(GRADIENT_COLOR_LENGTH)

class QuizView extends Component {

    state = {
        score: 0,
        gradientIndex: 0,
        currentCardIndex: 0,
        colorTop: TOP_COLORS_SPECTRUM[0],
        colorBottom: BOTTOM_COLORS_SPECTRUM[0]
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.updateColor();
    }

    updateColor() {
        const gradientIndex = Math.floor(Math.random() * TOP_COLORS_SPECTRUM.length)


        this.setState({
            gradientIndex,
            colorTop: TOP_COLORS_SPECTRUM[gradientIndex],
            colorBottom: BOTTOM_COLORS_SPECTRUM[gradientIndex]
        })
    }


    exit() {
        if (this.state.currentCardIndex > 0) {
            return Alert.alert(
                `You are about to exit`,
                `Are you sure? You will loose your current progress.`,
                [
                    {text: 'Cancel', style: 'cancel'},
                    {text: 'Exit', onPress: () => this.props.navigation.goBack()},
                ],
                {cancelable: true}
            )
        }

        this.props.navigation.goBack()
    }

    _renderItem({index, item: card}) {
        return (
            <QuizCard card={card}
                      onCorrect={this.onCorrect.bind(this)}
                      onIncorrect={this.onIncorrect.bind(this)}
            />
        );
    }

    onCorrect() {


        this.setState(state => ({

            currentCardIndex: state.currentCardIndex + 1

        }));


        this.moveToNextCard();

    }


    onIncorrect() {
        this.moveToNextCard();
    }


    moveToNextCard() {
        if (this.state.currentCardIndex < (this.props.deck.questions.length - 1)) {
            this.refs._carousel.snapToNext()
        }

        else {

            // finish here

            console.log("end")

        }
    }




    render() {
        const itemWidth = 300;
        const {questions} = this.props.deck;
        const {colorTop, colorBottom, currentCardIndex} = this.state;

        return (
            <LinearGradient colors={[colorTop, colorBottom]}
                            style={{flex: 1}}
                            start={[1, 0]}
                            end={[0, 1]}>

                <QuizProgress
                    totalCards={questions.length}
                    currentCard={(currentCardIndex + 1)}
                    completed={currentCardIndex}
                />

                <Carousel
                    data={questions}
                    ref={"_carousel"}
                    itemHeight={height}
                    sliderWidth={width}
                    sliderHeight={height}
                    itemWidth={itemWidth}
                    scrollEnabled={false}
                    renderItem={this._renderItem.bind(this)}
                    contentContainerCustomStyle={styles.carouselContentContainer}
                />


                <View style={styles.footer}>
                    <FlatButton
                        text="Exit Quiz"
                        iconName="exit-to-app"
                        backgroundColor="rgba(0,0,0,0.2)"
                        onPress={this.exit.bind(this)}
                        size="lg"
                    />
                </View>
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    flipCard: {
        width: 300,
        height: 400,
        alignItems: 'center',
        backgroundColor: "white",
        backfaceVisibility: 'hidden',
        borderRadius: 5,
        padding: 20,
    },
    flipCardBack: {
        position: 'absolute',
        top: 0,
    },
    flipText: {
        marginTop: 40,
        textAlign: 'center',
        fontSize: 35,
        lineHeight: 50,
    },
    carouselContentContainer: {
        alignItems: 'center',
    },
    footer: {
        width,
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 20
    }
});

function mapStateToProps(state, ownProps) {
    const {title} = ownProps.navigation.state.params;

    return {
        deck: state.decks[title]
    }
}

export default connect(mapStateToProps)(QuizView);