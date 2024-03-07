export type Card = {
    suit: {
        title: typeof cardSuit[number];
        symbol: typeof cardSuitMap[typeof cardSuit[number]]
    }, // number is the index of the array
    value: {
        title: typeof cardValue[number];
        symbol: typeof faceCardMap[typeof cardValue[number]] | typeof cardValue[number]
    }
}
export type Deck = Card[]

export const cardSuit: readonly ["Hearts", "Diamonds", "Clubs", "Spades"] = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
export const cardValue: readonly ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
export const cardSuitMap: { [key: string]: string } = {
    "Hearts": "♥",
    "Diamonds": "♦",
    "Clubs": "♣",
    "Spades": "♠"
}
export const faceCardMap = {
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "6",
    "7": "7",
    "8": "8",
    "9": "9",
    "10": "10",
    "Jack": "J",
    "Queen": "Q",
    "King": "K",
    "Ace": "A"
}
export const cards = cardSuit.flatMap(suit =>
    cardValue.map(value => ({
        suit: {
            title: suit,
            symbol: cardSuitMap[suit]
        },
        value: {
            title: value,
            symbol: faceCardMap[value as keyof typeof faceCardMap] || value
        },
    }))
);

export const DealButton = () =>
<pre>{`+------+
| Deal |
+------+`
    }</pre>
    
export const CardImage = ({card, selected}:{card:Card, selected:boolean}) => {
    if(!card || !card.suit || !card.value) return null
    const top = `${card.value.symbol}${cardSuitMap[card.suit.title]}`.toString().padEnd(6);
    const bottom = `${cardSuitMap[card.suit.title]}${card.value.symbol}`.toString().padStart(6);
    return (
        <pre className={selected ? "pb-5":""}>{`
+------+
|${top}|
|      |
|${bottom}|
+------+
`}</pre>
    );
};