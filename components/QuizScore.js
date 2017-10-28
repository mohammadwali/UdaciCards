import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'

import {white} from '../utils/colors'

import FlatButton from './FlatButton'


class QuizScore extends Component {


    render() {
        const {baseColor, result} = this.props;


        return (
            <View style={styles.wrapper}>
                <View style={[styles.circle, styles.largeCircle, {marginBottom: 10}]}>
                    <Text style={{fontSize: 24}}>You scored:</Text>
                    <Text style={{fontSize: 46, color: baseColor}}>{result.percent}%</Text>
                </View>

                <View style={styles.scoreDetailsContainer}>
                    <View style={styles.scoreDetailsBlock}>
                        <Text style={styles.scoreDetailsHeading}>Total Questions</Text>
                        <View style={[styles.circle, styles.scoreDetailsBlockCircle]}>
                            <Text style={{fontSize: 22, color: baseColor}}>{result.total}</Text>
                        </View>
                    </View>

                    <View style={styles.scoreDetailsBlock}>
                        <Text style={styles.scoreDetailsHeading}>Correct Answers</Text>
                        <View style={[styles.circle, styles.scoreDetailsBlockCircle]}>
                            <Text style={{fontSize: 22, color: baseColor}}>{result.score}</Text>
                        </View>
                    </View>

                    <View style={styles.scoreDetailsBlock}>
                        <Text style={styles.scoreDetailsHeading}>Incorrect Answers</Text>
                        <View style={[styles.circle, styles.scoreDetailsBlockCircle]}>
                            <Text style={{fontSize: 22, color: baseColor}}>{result.incorrect}</Text>
                        </View>
                    </View>

                </View>


                <View style={styles.footer}>
                    <FlatButton
                        text="Replay Quiz"
                        iconName="replay"
                        backgroundColor="rgba(0,0,0,0.2)"

                        size="lg"
                    />
                </View>

            </View>
        )
    }


}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        alignItems: 'center',
        marginTop: 20
    },
    largeCircle: {
        width: 200,
        height: 200,
    },
    circle: {
        width: 70,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: white,
        borderRadius: 100,
    },

    scoreDetailsBlockCircle: {
        marginRight: 25,
        marginLeft: 25,
        marginBottom: 20,
        marginTop: 20
    },

    scoreDetailsHeading: {
        color: white,
        marginTop: 20,
        textAlign: 'center'
    },
    scoreDetailsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },

    scoreDetailsBlock: {},
    footer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    }

})


export default QuizScore;