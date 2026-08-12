import {
    Box,
    SxProps,
    Typography,
    Collapse,

} from "@mui/material"
import {useInView} from "react-intersection-observer";
import {useState} from "react";
import {useBackgroundText} from "../hooks/useBackgroundText.tsx";
import {RevealCaption, RevealCaptionBlock, RevealCaptionTimeout} from "./HeadSection.tsx";
import {useWeatherController} from "../hooks/useWeatherController.tsx";
import {useIsMobile} from "../hooks/useIsMobile.tsx";
import {contentColumnWidth, fluidType, PAGE_GUTTER} from "../styles/layout.ts";

export interface Section3Props {
    sx?: SxProps
}

export const Section3 = ({
                             sx = {}
                         }: Section3Props) => {
    const {
        setTargetString,
        setTextProps,
    } = useBackgroundText();


    const newString =
        "I live for the creative process. Outside of my\n" +
        "work life I develop indie games, make\n" +
        "handcrafted instruments, and\n" +
        "write fantasy stories."

    const [isCurrentlyInView, setIsCurrentlyInView] = useState<boolean>(false);

    function changeText(inView: boolean,) {
        setIsCurrentlyInView(inView)
        if (inView) {

            setTextProps((oldProps) => ({
                ...oldProps,
                fontSize: 0.1,
            }))
            setTargetString(newString)
            // setTextLocation([-1.3, 1.0, 0])
        }

    }

    const {ref} = useInView({
        threshold: 0.6,
        onChange: changeText
    });
    const isMobile = useIsMobile();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                boxSizing: 'border-box',
                pb: 5,
                width: '100%',
                minHeight: '100vh',
                ...sx,
            }}
            ref={ref}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'end',

                }}
            >

                <Box
                    sx={{
                        display: 'block',
                        width: contentColumnWidth,
                        px: PAGE_GUTTER,
                        boxSizing: 'border-box',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'end',
                        }}
                    >
                        <Collapse
                            // mountOnEnter={false}
                            // in={false}
                            in={isCurrentlyInView}
                            orientation="horizontal"
                            timeout={1000}
                        >
                            <Box
                                sx={[
                                    {
                                        background: "#fff",
                                        color: 'black',
                                        px: 2,
                                        mb: 2,
                                        transition: "all 1s ease-out",
                                        display: 'flex',
                                        justifyContent: 'end',
                                    },
                                    {
                                        '&:hover': {
                                            color: "white",
                                            background: "#000",
                                        },
                                    }
                                ]}
                            >
                                <Typography
                                    variant={'h2'}
                                    sx={{
                                        whiteSpace: 'nowrap',
                                        fontSize: fluidType.heading,
                                    }}
                                >
                                    About.
                                </Typography>

                            </Box>
                        </Collapse>
                    </Box>
                    <RevealCaptionBlock
                        isIn={isCurrentlyInView}
                        timeout={RevealCaptionTimeout}
                        textVariant={"h6"}
                        lines={!isMobile ? [
                            "I'm a Brooklyn based engineer specializing in",
                            "embedded software and AI hardware, backed by a",
                            "full-stack background. I like to work with unconventional",
                            "innovations and I love the challenges that come with",
                            "building close to the metal. I dream of making things that",
                            "impact our daily lives in an important way."
                        ] : [
                            "I'm a Brooklyn based engineer",
                            "specializing in embedded software ",
                            "and AI hardware, backed by a ",
                            "full-stack background. I like to work ",
                            "with unconventional innovations and ",
                            "I love the challenges of building ",
                            "close to the metal. I dream of making",
                            "things that impact our daily lives.",
                        ]
                        }/>

                </Box>


            </Box>

        </Box>
    )
}