import {
    useRef,
    useEffect,
} from 'react'
import {Box, Typography} from "@mui/material"
import {useBackgroundText} from "../hooks/useBackgroundText.tsx";
import {isElementXPercentInViewport} from "../utils.ts";

export const HeadSection = () => {
    const divRef = useRef<HTMLDivElement>(null);
    const {
        targetString,
        setTargetString,
        setTextLocation,
        setTextProps
    } = useBackgroundText();
    const newString = "Through the Looking glass\n" +
        "Wanting to be somewhere else\n" +
        "She grew wings and begun to fly."

    function changeText() {
        setTextProps((oldProps) => ({
            ...oldProps,
            fontSize: 0.1,
        }))
        setTargetString(newString)
        setTextLocation([-1.3, 1.0, 0])
    }

    function detectScrollIntoView() {
        if (targetString !== newString) {
            if (isElementXPercentInViewport(
                divRef.current, 75)) {
                changeText()
            }
        }

    }

    useEffect(() => {

        changeText()

        document.addEventListener("scroll", detectScrollIntoView)
        return () => {
            document.removeEventListener("scroll", detectScrollIntoView)
        }
    }, [])
    return (
        <Box
            sx={{
                position: 'absolute',
                width: '100vw',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'end'
                // mt: 4,
            }}
            ref={divRef}
        >
            <Typography
                variant={'h1'}
            >
                Keane Wong
            </Typography>
        </Box>
    )
}