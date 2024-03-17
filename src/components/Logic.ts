import { CARDS, Card, Deck } from "~/assets/DeckOfCards";
import { RulesType } from "~/providers/Rules";


export const shuffleDeck = (deck: Deck) => {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

export const dealHand = ({ deck, number }: { deck: Deck, number: RulesType["rules"]["HAND_SIZE"] }) => {
    const hand = deck.slice(0, number).sort((a, b) => (a.rank.value < b.rank.value ? 1 : a.rank.value > b.rank.value ? -1 : 0)!)
    const newDeck = deck.slice(number)
    return {hand, newDeck}
}

export const checkPokerHand = (hand: Card["id"][]): { title: string; playedCards: Card[]; value: number } => {
    const counts = hand.reduce((acc, cardId) => {
        const selectedCard = CARDS.find(card => card.id === cardId)
        if (selectedCard) {
            acc[selectedCard.rank.label] = (acc[selectedCard.rank.label] || []).concat(selectedCard);
        }
        return acc;
    }, {} as { [key: string]: Card[] });

    const pairs = Object.values(counts).filter(cards => cards.length === 2);
    const threes = Object.values(counts).filter(cards => cards.length === 3);
    const fours = Object.values(counts).filter(cards => cards.length === 4);
    const highCard = Object.values(counts)
        .sort((a, b) => (a[0].rank.value > b[0].rank.value ? 1 : a[0].rank.value < b[0].rank.value ? -1 : 0)!)
        .pop()![0]

    if (fours.length === 1) return {
        title: 'Four of a kind',
        playedCards: fours[0],
        value: fours[0][0].rank.value * 6
    };
    if (threes.length === 1 && pairs.length === 1) return {
        title: 'Full house',
        playedCards: [...threes[0], ...pairs[0]],
        value: threes.reduce((acc, cards) => acc + cards[0].rank.value, 0) * 4
    };
    if (threes.length === 1) return {
        title: 'Three of a kind',
        playedCards: threes[0],
        value: threes[0][0].rank.value * 5
    };
    if (pairs.length === 2) return {
        title: 'Two pair',
        playedCards: pairs.flatMap(cards => cards),
        value: ((pairs[0][0].rank.value * 2) + (pairs[1][0].rank.value * 2)) * 1.5
    };
    if (pairs.length === 1) return {
        title: 'One pair',
        playedCards: pairs[0],
        value: pairs[0][0].rank.value * 2
    };

    return {
        title: 'High card',
        playedCards: [highCard], value: highCard.rank.value
    };
}
