import {Box} from "@mui/material"
import {keyframes, css, styled} from "styled-components";
import {useEffect, useState} from "react";

export const animationTimeSeconds=3.75
export const animationTime = `${animationTimeSeconds}s`
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

// Opacity, not display: animating display forces a style recalc mid-blink.
const QuoteRemover = keyframes`
    0% {
        background-color: rgba(0, 0, 0, 1);
        opacity: 1;
    }
    30% {
        opacity: 1;
    }
    31% {
        opacity: 0;
    }
    100% {
        opacity: 0;
    }
`

// Halves of one fixed box. 50vh each overlaps on mobile.
const Eye = styled("div")(
    () => css`
        z-index: 1000;
        pointer-events: none;
        position: fixed;
        inset: 0;
        overflow: hidden;
    `
);

const Lid = styled("div")(
    () => css`
        position: absolute;
        left: 0;
        width: 100%;
        height: 50%;
        /* forwards: without it the lids revert to the fallback when it ends. */
        animation: ${OpeningEyes} ${animationTime} ease-in-out 0s forwards;
    `
);

const Top = styled(Lid)`
    top: 0;
    background: radial-gradient(ellipse 100% var(--eyeOpen) at 50% 120%, transparent, transparent 80%, #000 100%);
`;
const Bottom = styled(Lid)`
    bottom: 0;
    background: radial-gradient(ellipse 100% var(--eyeOpen) at 50% -20%, transparent, transparent 80%, #000 100%);
`;

const Quote = styled("div")(
    () => css`
        z-index: 999;
        pointer-events: none;
        position: fixed;
        inset: 0;
        opacity: 0;
        justify-content: center;
        align-items: center;
        font-size: 12vw;
        white-space: nowrap;
        display: flex;
        animation: ${QuoteRemover} ${animationTime} ease-in-out 0s;
    `
);

const PossibleQuotes = [
    "Black Water",
    "Wake Up",
    "Take Over",
    "Good Mornin'",
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
            <Eye>
                <Top/>
                <Bottom/>
            </Eye>
            <Quote>{quote}</Quote>

        </>
    )
}