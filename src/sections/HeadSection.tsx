import {
    Box,
    Typography,
    TypographyProps,
    Collapse,
} from "@mui/material"
import {useBackgroundText} from "../hooks/useBackgroundText.tsx";
import {useInView} from "react-intersection-observer"
import Me from "../assets/Subject.png"
import {keyframes} from "@mui/system"
import { animationTimeSeconds} from "../components/EyeOpener.tsx";
import {useState, useEffect} from "react";


export const SubCaption = ({
                               sx,
                               ...rest
                           }: TypographyProps) => {
    return (
        <Typography
            variant={"h4"}
            {...rest}
            sx={{
                textAlign: 'end',
                ...sx
            }}
        >

        </Typography>
    )
}


export const HeadSection = () => {
    const {
        setTargetString,
        setTextLocation,
        setTextProps
    } = useBackgroundText();
    const [isCurrentlyInView, setIsCurrentlyInView] = useState<boolean>(false);
    const [eyeOpenFinished, setEyeOpenFinished] = useState(false);
    useEffect(() => {
        setTimeout(()=>{
            setEyeOpenFinished(true);
        }, animationTimeSeconds*1000 - 700)
    }, [])
    const newString =
        "It never rains in Southern California, which\n" +
        "makes it all the more special when\n" +
        "it finally comes back."

    function changeText(inView: boolean,) {
        setIsCurrentlyInView(inView);
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
                position: 'absolute',
                width: '100vw',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'end',

            }}
            ref={ref}
        >

            <Box
                sx={{
                    display: 'block',
                    pr: 2,
                    zIndex: 1,
                }}
            >
                <Typography
                    variant={'h2'}
                    sx={{
                        textAlign: 'right'
                    }}
                >
                    Hello there, I'm
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'end',
                    }}
                >
                    <Collapse
                        // mountOnEnter={false}
                        // in={false}
                        in={isCurrentlyInView && eyeOpenFinished}
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
                                Keane
                            </Typography>
                        </Box>
                    </Collapse>
                </Box>
                <SubCaption>
                    and I build applications, design
                </SubCaption>
                <SubCaption>
                    websites, and develop research tools. And, I'm
                </SubCaption>
                <SubCaption>
                    obsessed with the intersection of creativity and engineering.
                </SubCaption>
            </Box>
        </Box>
    )
}