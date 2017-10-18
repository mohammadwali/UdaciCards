import * as actions from '../actions/actionTypes'

const initialState = {
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
    },
    PHP: {
        title: 'PHP',
        questions: [
            {
                question: 'What is PHP and what is it used for?',
                answer: 'PHP is a general-purpose scripting language that is especially suited to server-side web development.'
            }
        ]
    },
    NodeJs: {
        title: 'NodeJs',
        questions: []
    }
};


export default function DecksReducer(state = {}, action) {
    switch (action.type) {

        case actions.DECKS_LOADED:
            return {...action.decks}


        default:
            return state;
    }
}