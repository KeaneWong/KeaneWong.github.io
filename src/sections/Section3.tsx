import {
    Box,
    SxProps,
    Typography,
    Collapse,

} from "@mui/material"
import {useInView} from "react-intersection-observer";
import {useState} from "react";
import {useBackgroundText} from "../hooks/useBackgroundText.tsx";
import {RevealCaption, RevealCaptionTimeout} from "./HeadSection.tsx";
import {useWeatherController} from "../hooks/useWeatherController.tsx";

export interface Section3Props {
    sx?: SxProps
}

export const Section3 = ({
                             sx = {
                                 width: '100vw',
                                 height: '100vh',

                             }
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

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                boxSizing: 'border-box',
                pb: 5,
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
                    <Box
                        sx={{
                        display: 'block',
                            width: 1000,

                            // mb: 3
                        }}
                    >
                        <RevealCaption
                            transitionProps={{
                                in: isCurrentlyInView,
                                orientation: 'horizontal',
                                timeout: RevealCaptionTimeout,
                            }}
                            sx={{
                                whiteSpace: 'pre-wrap',
                                // textAlign: 'end',
                                // textJustify: 'inter-word',
                                // width: 500
                            }}
                        >
                            I'm passionate about engineering of all kinds, but
                            software engineering is special to me. I love the
                            freedom of being able to make anything I want.
                            So long as I can imagine how it should work, I can
                            make it real.

                        </RevealCaption>
                        {/*<RevealCaption*/}
                        {/*    transitionProps={{*/}
                        {/*        in: isCurrentlyInView,*/}
                        {/*        orientation: 'horizontal',*/}
                        {/*        timeout: RevealCaptionTimeout,*/}
                        {/*    }}*/}
                        {/*>*/}
                        {/*</RevealCaption>*/}
                        {/*<RevealCaption*/}
                        {/*    transitionProps={{*/}
                        {/*        in: isCurrentlyInView,*/}
                        {/*        orientation: 'horizontal',*/}
                        {/*        timeout: RevealCaptionTimeout,*/}
                        {/*    }}*/}
                        {/*>*/}
                        {/*    /!*I'm a developer from SoCal who grew up*!/*/}
                        {/*</RevealCaption>*/}
                    </Box>
                </Box>


            </Box>

        </Box>
    )
}