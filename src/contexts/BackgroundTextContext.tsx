import {
    createContext,
    useMemo,
    ReactNode,
    useState,
    Context,
    Dispatch,
    SetStateAction,
} from 'react';
import useTypewriter from "react-typewriter-hook"
import {useInterval} from "../components/useInterval.tsx";
import {TextProps} from "@react-three/drei"
import MyFont from "../assets/fonts/VeraMono.ttf";

type ContextTextPropsType = Omit<TextProps, 'children'>

export type BackgroundTextContextType = {
    realString: string;
    targetString: string;
    setTargetString: (word: string) => void;
    textLocation: [number, number, number]
    setTextLocation: (position: [number, number, number]) => void;
    textProps: ContextTextPropsType;
    setTextProps: Dispatch<SetStateAction<ContextTextPropsType>>;
}

export const backgroundTextContext: Context<BackgroundTextContextType> = createContext(null);


export const BackgroundTextProvider = ({children}: {
    children: ReactNode;
}) => {
    const [curCursor, setCurCursor] = useState("|")
    useInterval(() => {
        setCurCursor(cursor => cursor === "|" ? `\xa0` : "|")
    }, 1000)

    const [targetString, setTargetString] = useState('feafaefa\nfeafeafea');
    const realishString = useTypewriter(targetString)
    const [textLocation, setTextLocation] = useState<[number, number, number]>([0, 0, 0]);
    const [textProps, setTextProps] = useState<Omit<TextProps, 'children'>>({
        fontSize: 0.2,
        color: "black",
        anchorX: "left",
        anchorY: "top",
        letterSpacing: -.1,
    });
    return (
        <backgroundTextContext.Provider
            value={useMemo(() => ({
                realString: (realishString ?? "") + curCursor,
                targetString,
                setTargetString,
                textLocation,
                setTextLocation,
                textProps,
                setTextProps,
            }), [realishString,
                targetString,
                setTargetString,
                curCursor,
                textLocation,
                setTextLocation,
                textProps,
                setTextProps
            ])}
        >
            {children}
        </backgroundTextContext.Provider>
    )
}
