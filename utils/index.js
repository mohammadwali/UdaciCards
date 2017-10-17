export function formatCardsCount(availableCards) {
    return availableCards > 0 ? (availableCards + (availableCards > 1 ? ' cards' : ' card')) : 'No cards';
}