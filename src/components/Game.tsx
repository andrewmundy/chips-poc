import { useContext, useEffect, useRef, useState } from "react";
import { Card, CardDeck, CARDS } from "~/assets/DeckOfCards";
import { checkPokerHand, dealHand, shuffleDeck } from "./Logic";
import { RulesContext, RulesType } from "~/providers/Rules";


export const PHASES = {
    CARD_SELECT: "CARD_SELECT", // When the user is selecting cards
    DEAL: "DEAL", // When the user is dealt a new hand
    SCORE: "SCORE", // When the selected cards are calculated, scored, and the user is shown the result
    NEXT_ROUND: "NEXT_ROUND" // When the user is ready to move to the next round
} as const

export type PhasesType = keyof typeof PHASES;

const END_PHASE = {
    GAME_OVER: "GAME_OVER", // When the game is over
    WIN: "WIN" // User has won the game
} as const

const Game = () => {
    const { rules } = useContext(RulesContext)
    const deckRef = useRef<Card[]>(CARDS)
    const [hand, setHand] = useState<Card[]>([])
    const [round, setRound] = useState(0)
    const [selectedCards, setSelectedCards] = useState<Card["id"][]>([])
    const [score, setScore] = useState({ title: '', value: 0 })
    const [gameScore, setGameScore] = useState(0)
    const [handsCount, setHandsCount] = useState<RulesType["rules"]["HANDS_REMAINING"]>(rules.HANDS_REMAINING)
    const [scoreGoal, setScoreGoal] = useState<RulesType["rules"]["SCORE_GOAL"]>(rules.SCORE_GOAL)
    const [gameStatus, setGameStatus] = useState<RulesType["rules"]["WIN_MESSAGE"] | RulesType["rules"]["LOOSE_MESSAGE"] | "">("");
    const [phase, setPhase] = useState<PhasesType>(PHASES.DEAL);
    const gameWonOrLost = gameStatus !== "";


    // logic after each round
    useEffect(() => {
        console.log({ deckRef })
        if (gameScore >= scoreGoal) {
            setGameStatus(rules.WIN_MESSAGE)
            return
        }
        if (handsCount === 0) {
            setGameStatus(rules.LOOSE_MESSAGE)
            return
        }
        // handleDealHand()
    }, [round])

    useEffect(() => {
        if (phase === PHASES.DEAL) {
            handleDealHand()
        }
        if (phase === PHASES.CARD_SELECT) {
            // handlePlayHand()
        }
        if (phase === PHASES.SCORE) {
            handlePlayHand()
        }
        if (phase === PHASES.NEXT_ROUND) {
            handleScore()
            setRound((round) => round + 1)
            handleDealHand()
        }
    }, [phase])

    const handleDealHand = () => {
        const { hand, newDeck } = dealHand({ deck: shuffleDeck(deckRef.current), number: rules.HAND_SIZE })
        setHand(hand)
        deckRef.current = newDeck
        setPhase(PHASES.CARD_SELECT)
    }

    const handleDeal = () => {
        setSelectedCards([])
        // setRound((round) => round + 1)
    };

    const handlePlayHand = () => {
        const { title, value } = checkPokerHand(selectedCards)
        setGameScore(gameScore => gameScore + value)
        setScore({ title, value })

        setTimeout(() => {
            setPhase(PHASES.NEXT_ROUND)
        }, 3000)
    }

    const handleScore = () => {
        setScore({ title: '', value: 0 })
        setHandsCount(handsCount => handsCount - 1)
        setSelectedCards([])
        handleRemoveCards()
        setPhase(PHASES.NEXT_ROUND)
    }

    const handleRemoveCards = () => {
        setHand(hand => hand.filter(card => !selectedCards.includes(card.id)))
        setSelectedCards([])
    }
    const handleDiscard = () => {

    }
    const handleCardSelect = (id: Card["id"]) => {
        if (gameWonOrLost) {
            return
        }
        setSelectedCards(selectedCards => selectedCards.includes(id) ? selectedCards.filter(c => c !== id) : [...selectedCards, id])
    }
    const handleRestart = () => {
        setSelectedCards([])
        setGameScore(0)
        setRound(0)
        setScore({ title: '', value: 0 })
        setGameStatus("")
        setHandsCount(rules.HANDS_REMAINING)
        deckRef.current = CARDS
        setPhase(PHASES.DEAL)
    }

    return (
        <div className="flex flex-col gap-3 justify-center items-center">
            <div className="flex flex-col gap-4">
                <h1 className="h-6">Goal {scoreGoal} </h1>
                <h1 className="h-6">Game score: {gameScore}</h1>
                <h1 className="h-6">Hands remaining: {handsCount}</h1>
                <h1 className="h-6">Phase: {phase}</h1>
                <section className="h-32 w-screen flex justify-center items-center">
                    <div> <CardDeck deck={deckRef.current} /> </div>
                    <div className="flex flex-row gap-4 items-end h-28">
                        {hand.map((card, i) => {
                            const cardInactive = gameWonOrLost
                            const isSelected = selectedCards.includes(card.id)
                            return <Card key={i} cardSelect={handleCardSelect} inactive={cardInactive} selected={isSelected} card={card} phase={phase} />
                        })
                        }
                    </div>
                </section>
            </div>
            <div className=" flex flex-col items-center justify-center gap-4">
                <h1 className="h-6">{score.title ? `${score.title} - ${score.value}` : ""}</h1>
                {gameWonOrLost ? (
                    <div className="flex flex-col gap-2 items-center">
                        <h1 className="h-6">{gameStatus}</h1>
                        <button onClick={handleRestart} className="button-primary">
                            New game
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-row gap-4">
                        <button onClick={handleRestart} className="button-secondary">
                            Restart
                        </button>
                        <button onClick={handlePlayHand} className="button-primary">
                            Play hand
                        </button>
                        {/* <button onClick={handleDiscard} className="button-primary">
                        Discard
                    </button> */}
                    </div>
                )}
            </div>
        </div>
    )
}
export default Game;