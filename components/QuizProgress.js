import React, {Component} from 'react'
import {View, Text, StyleSheet, Animated, Easing, Dimensions} from 'react-native'
import {Constants} from 'expo'

import {white} from '../utils/colors'

const {width} = Dimensions.get('window')

class QuizProgress extends Component {
    state = {
        progressWidth: 0
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            nextProps.currentCard !== this.props.currentCard ||
            nextProps.totalCards !== this.props.totalCards ||
            nextState.progressWidth !== this.state.progressWidth
        )
    }

    componentDidUpdate() {
        const {totalCards, completed} = this.props
        const progressWidth = (completed / totalCards) * width

        this.setState({
            progressWidth
        })
    }


    render() {
        const {progressWidth: width} = this.state
        const {totalCards, onFinishTitle, currentCard} = this.props


        return (
            <View style={styles.container}>
                <View style={styles.progressContainer}>
                    <View style={[styles.progressBar, {width}]}/>
                </View>

                {
                    (currentCard <= totalCards)
                        ?
                        <View style={styles.countContainer}>
                            <Text style={[styles.count, {fontWeight: 'bold'}]}>{ currentCard }</Text>
                            <Text style={styles.count}> of </Text>
                            <Text style={[styles.count, {fontWeight: 'bold'}]}>{ totalCards }</Text>
                        </View>
                        :
                        <View style={styles.countContainer}>
                            <Text style={[styles.count, {fontWeight: 'bold'}]}>{ onFinishTitle() }</Text>
                        </View>
                }


            </View>
        )
    }


}

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    progressContainer: {
        height: 5,
        width: width,
        marginBottom: 30
    },
    progressBar: {
        flex: 1,
        backgroundColor: white,
        borderRadius: 5
    },
    countContainer: {
        flexDirection: 'row',
        marginTop: 30
    },
    count: {
        color: white,
        fontSize: 40,
    }
})


export default QuizProgress