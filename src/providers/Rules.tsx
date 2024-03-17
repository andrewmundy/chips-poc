import { ReactNode, createContext, useContext, useState } from 'react';

type RulesProviderProps  = {
    children: ReactNode;
}

const RULES = {
    SCORE_GOAL: 40,
    HANDS_REMAINING: 4,
    HAND_SIZE: 8,
    WIN_MESSAGE: "You win!",
    LOOSE_MESSAGE: "You loose!",
} as const

export type RulesType = {
    rules: {
        SCORE_GOAL: number,
        HANDS_REMAINING: number,
        HAND_SIZE: number,
        WIN_MESSAGE: string,
        LOOSE_MESSAGE: string,
    };
    updateRules: (newRules: RulesType["rules"]) => void;
}

export const RulesContext = createContext<RulesType>({
    rules: {
        SCORE_GOAL: RULES.SCORE_GOAL,
        HANDS_REMAINING: RULES.HANDS_REMAINING,
        HAND_SIZE: RULES.HAND_SIZE,
        WIN_MESSAGE: RULES.WIN_MESSAGE,
        LOOSE_MESSAGE: RULES.LOOSE_MESSAGE,
    }, updateRules: () => { }
});

export const RulesProvider = ({ children }: RulesProviderProps) => {
    const { rules: rulesContext } = useContext(RulesContext)
    const [rules, setRules] = useState<RulesType["rules"]>(rulesContext)

    const updateRules = (newRules: RulesType["rules"]) => {
        setRules(newRules)
    }

    return (
        <RulesContext.Provider value={{ rules, updateRules }}>
            {children}
        </RulesContext.Provider>
    );
};

export default RulesProvider;