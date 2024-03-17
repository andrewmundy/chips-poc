import { PHASES, PhasesType } from "~/components/Game"

const suits = [
    { label: "♥", value: "Hearts" },
    { label: "♦", value: "Diamonds" },
    { label: "♣", value: "Clubs" },
    { label: "♠", value: "Spades" }
] as const
const ranks = [
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
    { label: "5", value: 5 },
    { label: "6", value: 6 },
    { label: "7", value: 7 },
    { label: "8", value: 8 },
    { label: "9", value: 9 },
    { label: "10", value: 10 },
    { label: "J", value: 11 },
    { label: "Q", value: 12 },
    { label: "K", value: 13 },
    { label: "A", value: 14 },
] as const

export type Card = {
    id: string,
    suit: { label: typeof suits[number]["label"], value: typeof suits[number]["value"] },
    rank: { label: typeof ranks[number]["label"], value: typeof ranks[number]["value"] }
}
export type Deck = Card[]

export const CARDS = suits.flatMap(suit => ranks.map((rank) => ({
    id: `${rank.label}${suit.label}`,
    suit: {
        label: suit.label,
        value: suit.value
    },
    rank: {
        label: rank.label,
        value: rank.value
    }
})));



export const Card = ({ card, cardSelect, selected, inactive, phase }: { card: Card, cardSelect: (id: Card["id"]) => void, selected: boolean, inactive: boolean, phase: PhasesType }) => {
    if (!card || !card.suit) return null
    const isScorePhase = phase === PHASES.SCORE
    const isRed = card.suit.value === "Hearts" || card.suit.value === "Diamonds"
    const top = (
        <div className="flex flex-col">
            <div className="flex justify-center leading-4">
                {card.rank.label}
            </div>
            <div className="flex justify-center leading-4">
                {card.suit.label}
            </div>
        </div>
    )
    return (
        <button className="" onClick={() => cardSelect(card.id)}>
            <div className={`hvr-grow card flex flex-col justify-between border border-1 bg-foreground border-foreground p-2 pt-1 pb-1 h-24 w-20 rounded-md ${selected ? "mb-3" : "mt-3"} ${isRed ? "text-red" : "text-black"} ${inactive ? "opacity-50" : ""}`}>
                <div className="card-value-top flex justify-start">
                    {top}
                </div>
                <div className="flex justify-center">
                    {card.suit.label}
                </div>
                <div className="card-value-bottom flex justify-end">
                    {top}
                </div>
            </div>
        </button>
    );
};

export const CardDeck = ({ deck }: { deck: Deck }) => {
    return <div className={`card deck flex flex-col justify-center bg-foreground  mr-8 p-2 pt-1 pb-1 h-24 w-20 mt-4 rounded-md`}>
        <div className="flex justify-center">
            {deck.length}
        </div>
        <div className="flex flex-col items-center justify-center">
            <span>
                ♠ ♥
            </span>
            <span>
                ♦ ♣

            </span>
        </div>
    </div>
}