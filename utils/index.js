const QuizTitles = {
    1: ["Keep trying!", "Better luck next time!", "Try once more.."],
    2: ["Nice job!", "Sweet!", "Cool!", "Looks good!"],
    3: ["Great!", "Awesome!", "Super!", "Perfect!"]
}


export function formatCardsCount(availableCards) {
    return availableCards > 0 ? (availableCards + (availableCards > 1 ? ' cards' : ' card')) : 'No cards';
}

export function getQuizResultTitle(correctAnswers, totalQuestions) {
    const percent = Math.round((correctAnswers / totalQuestions) * 100)
    const category = (percent <= 33) ? 1 : (percent <= 66) ? 2 : 3
    return QuizTitles[category][Math.floor(Math.random() * QuizTitles[category].length)]
}