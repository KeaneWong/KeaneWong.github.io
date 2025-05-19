import {
    Box,
    Typography,
    TypographyProps,
    Collapse,
    createTheme,
    ThemeProvider,
    CollapseProps,
} from "@mui/material"
import {useBackgroundText} from "../hooks/useBackgroundText.tsx";
import {useInView} from "react-intersection-observer"
// import Me from "../assets/Subject.png"
import Me from "../assets/MySillhouette.tsx"
import {animationTimeSeconds} from "../components/EyeOpener.tsx";
import {useState, useEffect} from "react";
import {useWeatherController} from "../hooks/useWeatherController.tsx";


export const SubCaption = ({
                               sx,
                               ...rest
                           }: TypographyProps) => {
    return (
        <Typography
            variant={"h5"}
            {...rest}
            sx={{
                textAlign: 'end',
                width: '1000px',
                ...sx
            }}
        >

        </Typography>
    )
}

export interface RevealCaptionPropsType extends TypographyProps {
    transitionProps?: CollapseProps
}

export const RevealCaption = ({
                                  transitionProps,
                                  ...rest
                              }: RevealCaptionPropsType) => {
    return (
        <Collapse
            {...transitionProps}
        >
            <SubCaption {...rest}/>
        </Collapse>
    )
}

export const NameSillhouette = () => {
    const commonSilhouetteStyles = {
        px: 2,
        py: 0,
        transition: "all 1s ease-out",
        top: 0,
        left: 0,
    }
    const [hover, setHover] = useState<boolean>(false);
    return (
        <Box
            id={"silhouetteContainer"}
            sx={{
                position: "relative",
                zIndex: 100,
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <Box
                id={"NegativeNameSilhouette"}
                sx={[
                    {
                        ...commonSilhouetteStyles,
                        background: hover ? "#000" : "#fff",
                        color: hover ? "white" : 'black',
                        zIndex: 2,

                    },


                ]}
            >

                <Typography
                    variant={'h1'}
                >
                    Keane
                </Typography>

            </Box>
            <Box
                id={"PositiveNameSilhouette"}
                sx={[
                    {
                        ...commonSilhouetteStyles,
                        background: hover ? "#fff" : "#000",
                        color: hover ? "black" : 'white',
                        position: 'absolute',
                        zIndex: 1,
                        clipPath: "url(#silhouettePath)",
                        // pointerEvents: 'none'

                    },

                ]}
            >

                <Typography
                    variant={'h1'}
                >
                    Keane
                </Typography>

            </Box>
            <Me
                style={{
                    position: 'absolute',
                }}

            />
        </Box>
    )
}

export const RevealCaptionTimeout = 1000

export const HeadSection = () => {
    const {
        setTargetString,
        setTextProps
    } = useBackgroundText();
    const [isCurrentlyInView, setIsCurrentlyInView] = useState<boolean>(false);
    const [eyeOpenFinished, setEyeOpenFinished] = useState(false);
    const {defaultRainProps, setRainProps} = useWeatherController()
    useEffect(() => {
        setTimeout(() => {
            setEyeOpenFinished(true);
        }, animationTimeSeconds * 1000 - 700)
    }, [])
    const newString =
        "It never rains in Southern California, which\n" +
        "makes it all the more special when\n" +
        "it finally comes back."

    function changeText(inView: boolean,) {
        setIsCurrentlyInView(inView);
        if (inView) {
            setRainProps(defaultRainProps)
            setTextProps((oldProps) => ({
                ...oldProps,
                fontSize: 0.1,
            }))
            setTargetString(newString)

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
                userSelect: "none",

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
                        <NameSillhouette/>
                    </Collapse>
                </Box>

                <Box
                    sx={{
                        width: 1000
                    }}
                >
                    <RevealCaption
                        transitionProps={{
                            in: isCurrentlyInView,
                            orientation: 'horizontal',
                            timeout: RevealCaptionTimeout,
                        }}

                    >
                        and I build applications, design
                    </RevealCaption>

                    <RevealCaption
                        transitionProps={{
                            in: isCurrentlyInView,
                            orientation: 'horizontal',
                            timeout: RevealCaptionTimeout,
                        }}
                    >
                        websites, and develop research tools. And, I'm
                    </RevealCaption>
                    <RevealCaption
                        transitionProps={{
                            in: isCurrentlyInView,
                            orientation: 'horizontal',
                            timeout: RevealCaptionTimeout,
                        }}
                    >
                        obsessed with the intersection of creativity and engineering.
                    </RevealCaption>
                </Box>

            </Box>
        </Box>
    )
}