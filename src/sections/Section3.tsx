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
                width: '100vw',
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
                    pr: 2,

                }}
            >

                <Box
                    sx={{
                        display: 'block'
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
                            "I'm a SoCal based software engineer",
                            "specializing in full-stack applications and web",
                            "development. I like to work with unconventional",
                            "innovations and I love the challenges that come with",
                            "working on new things. I dream of building things that impact",
                            "our daily lives in an important way."
                        ] : [
                            "I'm a SoCal based software engineer",
                            "specializing in full-stack apps and ",
                            "web development. I like to work with",
                            "unconventional innovations and I love ",
                            "the challenges that come with working ",
                            "on new things.",
                            "I dream of building things that impact",
                            "our daily lives in an important way.",
                        ]
                        }/>

                </Box>


            </Box>

        </Box>
    )
}