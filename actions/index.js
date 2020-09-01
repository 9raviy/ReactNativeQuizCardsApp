export const ADD_DECK = 'ADD_DECK'
export const ADD_QUESTION = 'ADD_QUESTION'
export const GET_DATA = 'GET_DATA'
export const DELETE_DECK = 'DELETE_DECK'

export function addDeck(newDeck) {
    return {
        type: ADD_DECK,
        newDeck
    }
}

export function addQuestion(deck, question) {
    return {
        type: ADD_QUESTION,
        question,
        deck
    }
}

export function getData(decks) {
    return {
        type: GET_DATA,
        decks,
    }
}

export function removeDeck(id) {
    return {
        type: DELETE_DECK,
        id
    }
}