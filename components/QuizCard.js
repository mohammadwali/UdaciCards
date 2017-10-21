import React, {Component} from 'react'
import {View, Text, StyleSheet, Animated, Easing, TouchableWithoutFeedback} from 'react-native'

import {green, red, white} from '../utils/colors'
import RoundButton from '../components/RoundButton'
import FlatButton from '../components/FlatButton'


class QuizCard extends Component {
    state = {}


    componentWillMount() {
        this.scaleValue = new Animated.Value(0);
        this.animatedValue = new Animated.Value(0);
        this.value = 0;
        this.animatedValue.addListener(({value}) => {
            this.value = value;
        })
        this.frontInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg'],
        })


        this.frontOpacity = this.animatedValue.interpolate({
            inputRange: [89, 90],
            outputRange: [1, 0]
        })


        this.backInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '360deg']
        })


        this.backOpacity = this.animatedValue.interpolate({
            inputRange: [89, 90],
            outputRange: [0, 1]
        })


        this.scaleVal = this.scaleValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
        });
    }

    scale() {
        this.scaleValue.setValue(0);

        Animated.timing(this.scaleValue, {
            toValue: 0.3,
            duration: 100,
        })
            .start(() => this.scale())
    }


    flipCard() {
        this.scaleValue.setValue(1);


        Animated
            .sequence([
                Animated.timing(this.scaleValue, {
                    toValue: 0.6,
                    duration: 200
                }),
                Animated.timing(this.animatedValue, {
                    toValue: (this.value >= 90) ? 0 : 180,
                    duration: 250,
                    easing: Easing.inOut(Easing.ease)
                }),
                Animated.timing(this.scaleValue, {
                    toValue: 1,
                    duration: 300
                })
            ])
            .start()
    }


    render() {

        console.log(this.props)

        const {card: {question, answer}, onCorrect, onIncorrect} = this.props;

        const frontAnimatedStyle = {
            transform: [
                {rotateY: this.frontInterpolate},
                {scale: this.scaleVal}
            ],
            zIndex: this.frontOpacity
        }
        const backAnimatedStyle = {
            transform: [
                {rotateY: this.backInterpolate},
                {scale: this.scaleVal}

            ],
            zIndex: this.backOpacity

        }

        return (
            <View style={styles.container}>
                <View>
                    <Animated.View style={[styles.flipCard, frontAnimatedStyle, {
                        opacity: this.frontOpacity
                    }]}>
                        <View style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Text style={[styles.flipText, {color: this.state.colorTop}]}>
                                { question }
                            </Text>
                        </View>

                        <View style={{alignSelf: 'center', flexDirection: 'row', justifyContent: 'flex-end'}}>


                            <FlatButton
                                iconName='remove-red-eye'
                                text='View answer'
                                onPress={() => this.flipCard()}
                                backgroundColor={this.state.colorTop}
                            />


                        </View>

                    </Animated.View>
                    <Animated.View
                        style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack, {opacity: this.backOpacity}]}>

                        <TouchableWithoutFeedback onPress={ this.flipCard.bind(this)}>
                            <View style={{flex: 1}}>
                                <View style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>

                                    <Text style={[styles.flipText, {color: this.state.colorTop}]}>
                                        { answer }
                                    </Text>
                                </View>


                                <View style={{alignSelf: 'center', flexDirection: 'row'}}>


                                    <RoundButton
                                        iconName='check'
                                        text='Correct'
                                        onPress={onCorrect}
                                        size='lg'
                                        background={green}
                                    />
                                    <RoundButton
                                        iconName='close'
                                        text='Incorrect'
                                        onPress={onIncorrect}
                                        size='lg'
                                        background={red}
                                    />


                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </Animated.View>
                </View>

            </View>
        )
    }


}

const styles = StyleSheet.create({
    container: {},
    flipCard: {
        width: 300,
        height: 400,
        alignItems: 'center',
        backgroundColor: white,
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
    }
})


export default QuizCard;