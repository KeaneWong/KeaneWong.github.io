import {Box} from "@mui/material"
import {keyframes, css, styled} from "styled-components";
import {useEffect, useState} from "react";

const animationTime = '5s'
const OpeningEyes = keyframes`
    0% {
        --eyeOpen: 0%;
    }
    25% {
        --eyeOpen: 55%;
    }
    30% {
        --eyeOpen: 0%;
    }
    33% {
        --eyeOpen: 35%;
    }
    36% {
        --eyeOpen: 0%;
    }
    45% {
        --eyeOpen: 0%;
    }
    75% {
        --eyeOpen: 150%;
    }
    100% {
        //background: radial-gradient(ellipse 100% 55% at 50% -20%, transparent, transparent 80%, #000 100%);
        --eyeOpen: 200%; /* we update on hover */
    }
`

const QuoteRemover = keyframes`
    0% {
        display: flex;
        background-color: rgba(0, 0, 0, 1);
        opacity: 1;
    }
    30% {

        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 10em;
        opacity: 1;
    }
    31% {
        display: none;
    }
    100% {
        display: none;
    }
`

const CustomizedDiv = styled("div")(
    () => css`
        z-index: 1000;
        pointer-events: none;
        position: fixed;
        width: 100vw;
        height: 50vh;
    `
);
const Top = styled(CustomizedDiv)`
    @property --eyeOpen {
        syntax: "<percentage>";
        inherits: false;
        initial-value: 200%;
    }
    top: 0;
    background: radial-gradient(ellipse 100% var(--eyeOpen) at 50% 120%, transparent, transparent 80%, #000 100%);

    //background: radial-gradient(ellipse 100% 55% at 50% 120%, transparent, transparent 90%, #000 100%);
    animation: ${OpeningEyes} ${animationTime} ease-in-out 0s;


`;
const Bottom = styled(CustomizedDiv)`
    @property --eyeOpen {
        syntax: "<percentage>";
        inherits: false;
        initial-value: 200%;
    }

    bottom: 0;
    background: radial-gradient(ellipse 100% var(--eyeOpen) at 50% -20%, transparent, transparent 80%, #000 100%);

    //background: rgba(0,0,0,1);
    //background: radial-gradient(ellipse 100% 55% at 50% -20%, transparent, transparent 90%, #000 100%);
    animation: ${OpeningEyes} ${animationTime} ease-in-out 0s;

`;

const Quote = styled("div")(
    () => css`
        //z-index: -1000;
        z-index: 999;
        //background-color: '#000';
        pointer-events: none;
        position: fixed;
        width: 100vw;
        height: 100vh;
        opacity: 0;
        justify-content: center;
        align-items: center;
        font-size: 6rem;
        white-space: nowrap;
        animation: ${QuoteRemover} ${animationTime} ease-in-out 0s;
    `
);

const PossibleQuotes = [
    "Black Water",
    "Wake Up",
    "Take Over",
    "All We Want",
    "Half Awake",
    "Love the Rain",
]
export const EyeOpener = () => {
    const [quote, setQuote] = useState<string>("")
    useEffect(() => {
            const i = Math.floor(Math.random() * PossibleQuotes.length)
            setQuote(PossibleQuotes[i])
        },
        [])
    return (
        <>
            <Top/>
            <Bottom/>
            {/*<Quote>{quote}</Quote>*/}

        </>
    )
}