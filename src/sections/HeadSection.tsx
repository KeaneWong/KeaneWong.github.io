import {
    Box,
    Typography,
    TypographyProps,
    Collapse,
    createTheme,
    ThemeProvider,
    TypographyOwnProps,
    CollapseProps, SxProps,
} from "@mui/material"
import {useBackgroundText} from "../hooks/useBackgroundText.tsx";
import {useInView} from "react-intersection-observer"
// import Me from "../assets/Subject.png"
import Me from "../assets/MySillhouette.tsx"
import {animationTimeSeconds} from "../components/EyeOpener.tsx";
import {useState, useEffect, ReactNode} from "react";
import {useWeatherController} from "../hooks/useWeatherController.tsx";
import {useIsMobile} from "../hooks/useIsMobile"

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
                overflow: 'hidden'
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

export interface RevealCaptionBlockProps {
    isIn: boolean,
    timeout: number,
    lines: ReactNode[],
    sx?: SxProps,
    textVariant: TypographyOwnProps["variant"],
}

export const RevealCaptionBlock = ({
                                       isIn,
                                       timeout,
                                       lines,
    sx={},
    textVariant="h6"
                                   }: RevealCaptionBlockProps) => {
    return (
        <Box
            sx={{
                width: 1000,
                ...sx
            }}
        >
            {
                lines.map((line, index) => {
                    return (
                        <RevealCaption
                            key={index}
                            transitionProps={{
                                in: isIn,
                                orientation: 'horizontal',
                                timeout: timeout,
                            }}
                            variant={textVariant}

                        >
                            {line}
                        </RevealCaption>
                    )
                })
            }

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
            // setRainProps(defaultRainProps)
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

    const isMobile = useIsMobile();

    return (
        <Box
            sx={{
                position: 'absolute',
                width: '100vw',
                // height: !isMobile ? '100vh': 'auto' ,
                // minHeight: !isMobile ? 'auto': "100vh",
                minHeight: "100vh",
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
                    variant={
                    !isMobile ?'h2' : 'h3'}
                    sx={{
                        textAlign: 'right',
                        fontWeight: !isMobile ? 'auto': 'light'
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


                    <RevealCaptionBlock
                        isIn={isCurrentlyInView}
                        timeout={RevealCaptionTimeout}
                        lines={
                            !isMobile ?
                                [
                                    "and I build applications, design",
                                    "websites, and develop research tools. And, I'm",
                                    "obsessed with the intersection of creativity and engineering."
                                ] : [
                                    "and I build applications, design",
                                    "websites, and develop research",
                                    "tools. And, I'm obsessed with",
                                    "the intersection of creativity",
                                    "and engineering."
                                ]
                        }
                    />



            </Box>
        </Box>
    )
}