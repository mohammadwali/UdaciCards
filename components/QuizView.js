import Chroma from 'chroma-js'
import {LinearGradient} from 'expo'
import React, {Component} from 'react'
import {StyleSheet, Text, View, Animated, Dimensions} from 'react-native'

import {white} from '../utils/colors'
import RoundButton from '../components/RoundButton'
import FlatButton from '../components/FlatButton'

const GRADIENT_COLOR_LENGTH = 700
const {width} = Dimensions.get('window');
const TOP_COLORS = ['#000428', '#003973', '#4776E6', '#134E5E', '#C04848', '#000000', '#001510']
const BOTTOM_COLORS = ['#004e92', '#E5E5BE', '#8E54E9', '#71B280', '#480048', '#e74c3c', '#00bf8f']

const TOP_COLORS_SPECTRUM = Chroma.scale(TOP_COLORS).colors(GRADIENT_COLOR_LENGTH)
const BOTTOM_COLORS_SPECTRUM = Chroma.scale(BOTTOM_COLORS).colors(GRADIENT_COLOR_LENGTH)

class QuizView extends Component {

    state = {
        gradientIndex: 0,
        colorTop: TOP_COLORS_SPECTRUM[0],
        colorBottom: BOTTOM_COLORS_SPECTRUM[0]
    }


    componentWillMount() {
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

    flipCard() {
        if (this.value >= 90) {
            Animated.spring(this.animatedValue, {
                toValue: 0,
                friction: 8,
                tension: 10
            }).start();
        } else {
            Animated.spring(this.animatedValue, {
                toValue: 180,
                friction: 8,
                tension: 10
            }).start();
        }

    }

    render() {
        const frontAnimatedStyle = {
            transform: [
                {rotateY: this.frontInterpolate},
            ],
            zIndex: this.frontOpacity
        }
        const backAnimatedStyle = {
            transform: [
                {rotateY: this.backInterpolate}

            ],
            zIndex: this.backOpacity

        }
        return (
            <LinearGradient colors={[this.state.colorTop, this.state.colorBottom]}
                            style={{flex: 1}}
                            start={[1, 0]}
                            end={[0, 1]}>

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
                                    This text is flipping on the front.
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

                            <View style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>

                                <Text style={[styles.flipText, {color: this.state.colorTop}]}>
                                    This text is flipping on the back.
                                </Text>
                            </View>


                            <View style={{alignSelf: 'center', flexDirection: 'row'}}>


                                <RoundButton
                                    iconName='check'
                                    text='Correct'
                                    onPress={() => console.log('hey 1')}
                                    size='lg'
                                    background='green'
                                />
                                <RoundButton
                                    iconName='close'
                                    text='Incorrect'
                                    onPress={() => console.log('hey 2')}
                                    size='lg'
                                    background='red'
                                />


                            </View>

                        </Animated.View>
                    </View>

                </View>

                <View style={{width, paddingRight: 30, paddingLeft: 30, paddingBottom: 20}}>

                    <FlatButton
                        text="Exit Quiz"
                        iconName="exit-to-app"
                        backgroundColor="rgba(0,0,0,0.2)"
                        onPress={() => this.props.navigation.goBack()}
                    />


                </View>


            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 55
    },
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
});

export default QuizView;