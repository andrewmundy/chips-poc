import { Card, Deck } from "~/assets/DeckOfCards";


export const shuffleDeck = (deck: Deck) => {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

export const firstSixCards = (deck: Deck) => deck.slice(0, 6)

export const checkPokerHand = (hand: Card[]): { title: string; playedCards: Card[]; } => {
    const counts = hand.reduce((acc, card) => {
        acc[card.value.title] = (acc[card.value.title] || []).concat(card);
        return acc;
    }, {} as { [key: string]: Card[] });

    const pairs = Object.values(counts).filter(cards => cards.length === 2);
    const threes = Object.values(counts).filter(cards => cards.length === 3);
    const fours = Object.values(counts).filter(cards => cards.length === 4);
    const highCard = hand.sort((a, b) => a.value.title > b.value.title ? 1 : -1)[5];

    if (fours.length === 1) return { title: 'Four of a kind', playedCards: fours[0] };
    if (threes.length === 1 && pairs.length === 1) return { title: 'Full house', playedCards: [...threes[0], ...pairs[0]] };
    if (threes.length === 1) return { title: 'Three of a kind', playedCards: threes[0] };
    if (pairs.length === 2) return { title: 'Two pair', playedCards: pairs.flatMap(cards => cards) };
    if (pairs.length === 1) return { title: 'One pair', playedCards: pairs[0] };

    return { title: 'High card', playedCards: [highCard] };
}