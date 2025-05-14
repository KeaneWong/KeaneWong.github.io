import {
    Typography,
    Box,
    SxProps,
    Grid, Collapse,
} from "@mui/material"
import {useState, ReactNode} from 'react';
import {useBackgroundText} from "../hooks/useBackgroundText.tsx";
import {useInView} from "react-intersection-observer";

export interface PageOverlayPropsType {
    sx?: SxProps
}


export const Section2 = ({
                             sx = {
                                 width: '100vw',
                                 height: '100vh',

                             }
                         }: PageOverlayPropsType) => {
    const {
        setTargetString,
        setTextLocation,
        setTextProps
    } = useBackgroundText();
    const newString =
        "In my free time, I make custom music instruments\n" +
        "(though I can't play), make indie games\n" +
        "and write fantasy stories."

    const [isCurrentlyInView, setIsCurrentlyInView] = useState<boolean>(false);

    function changeText(inView: boolean,) {
        setIsCurrentlyInView(inView)
        if (inView) {
            setTextProps((oldProps) => ({
                ...oldProps,
                fontSize: 0.1,
            }))
            setTargetString(newString)
            setTextLocation([-1.3, 1.0, 0])
        }

    }

    const {ref} = useInView({
        threshold: 0.75,
        onChange: changeText
    });


    return (
        <Box
            sx={{
                // position: 'absolute',
                width: '100vw',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'end',
                ...sx,
            }}
            ref={ref}

        >
            <Box
                sx={{
                    display: 'block',
                    pr: 4,

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
                                transition: "all 1s ease-out"
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
                            variant={'h1'}

                        >
                            Placeholder
                        </Typography>
                    </Box>
                </Collapse>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'end',
                        width: '100%',
                    }}
                >

                </Box>

            </Box>
        </Box>
    )
}