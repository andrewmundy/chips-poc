import { useEffect, useRef, useState } from "react";
import { Card, CardImage, DealButton, cards } from "~/assets/DeckOfCards";
import { checkPokerHand, firstSixCards, shuffleDeck } from "./Logic";

const Game = () => {
    const deck = useRef<Card[]>(cards)
    const [hand, setHand] = useState<Card[]>([])
    const [round, setRound] = useState(0)
    const [pokerHand, setPokerHand] = useState<{ title: string, playedCards: Card[] }>({ title: '', playedCards: [] })

    useEffect(() => {
        const firstSix = firstSixCards(shuffleDeck(deck.current))
        setHand(firstSix)
        setPokerHand(checkPokerHand(firstSix))
    }, [round])

    const handleDeal = () => {
        setRound((round) => round + 1)
    };

    const HandDisplay = () => <div className="flex flex-row gap-4 items-end">
        {hand.map(card => {
            const isSelected = pokerHand.playedCards.includes(card)
            return <CardImage selected={isSelected} card={card} />
        })
        }</div>
    return (
        <div className="flex flex-col gap-4 justify-center items-center">
            <div>{pokerHand.title}</div>
            <div className="">
                <HandDisplay />
            </div>
            <button onClick={handleDeal}>
                <DealButton />
            </button>
        </div>
    )

}
export default Game;

