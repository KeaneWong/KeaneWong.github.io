import {
    Typography,
    Box,
    SxProps,
    BoxProps,
    Fade,
    Grid,
    Grow,
    Collapse,
    PaperProps,
    Paper,
} from "@mui/material"
import {useState, ReactNode} from 'react';
import {useBackgroundText} from "../hooks/useBackgroundText.tsx";
import {useInView} from "react-intersection-observer";
import Fluxergy from "../assets/Fluxergy.png"
import UCI from "../assets/uci.jpg"
import DnD from "../assets/180Days.png"
import {RevealCaption, RevealCaptionTimeout} from "./HeadSection.tsx"

export interface PageOverlayPropsType {
    sx?: SxProps
}

export interface PictureCardPropsType extends PaperProps {
    children: ReactNode,
    src: string,
}


export const PictureCard = ({
                                children,
                                src,
                                elevation = 10,
                                sx = {},
                                ...rest
                            }: PictureCardPropsType) => {
    const [hover, setHover] = useState<boolean>(false);
    return (
        <Paper
            elevation={elevation}
            sx={{
                aspectRatio: 4 / 3,
                backgroundColor: 'black',
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
                boxSizing: 'border-box',
                transform: hover ? "scale(1.03)" : undefined,
                transition: "all 0.3s ease-out",

                ...sx,
            }}
            {...rest}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <img
                src={src}
                alt={src}
                style={{
                    height: '100%',
                    aspectRatio: sx?.aspectRatio ?? 4 / 3,
                    position: 'absolute',
                    top: 0,
                    zIndex: 1,
                    left: 0,
                    opacity: hover ? 0.2 : 1,
                    transition: "all 0.3s ease-out",
                }}
            />
            <Box
                sx={{
                    zIndex: 2,
                    width: 1,
                    height: 1,
                    position: 'relative',
                    opacity: hover ? 1 : 0,
                    display: 'flex',
                    flexDirection: "column",
                    justifyContent: 'center',
                    alignItems: 'center',


                }}
            >

                {children}
            </Box>

        </Paper>
    )
}


export const Section2 = ({
                             sx = {
                                 width: '100vw',
                                 height: '100vh',

                             }
                         }: PageOverlayPropsType) => {
    const {
        setTargetString,
        setTextProps
    } = useBackgroundText();

    const newString =
        "<a href='linkedin.com/in/KeaneWong'>\n" +
        "\t<div>Hello World</div>\n" +
        "</a>"

    const [isCurrentlyInView, setIsCurrentlyInView] = useState<boolean>(false);

    function changeText(inView: boolean,) {
        setIsCurrentlyInView(inView)
        if (inView) {
            // setRainProps((oldRainProps)=>({
            //     ...oldRainProps,
            //     u_intensity: 0.52,
            //     // u_brightness: 0.75,
            //     u_lightning: false,
            //     u_blur_intensity: 0.35
            // }))
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
                justifyContent: 'end',
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
                        display: 'block',

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
                                        justifyContent: 'end'
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
                                    My Experience.
                                </Typography>
                            </Box>
                        </Collapse>
                    </Box>
                    <Box
                        sx={{
                            width: 1000,
                            mb: 3
                        }}
                    >
                        <RevealCaption
                            transitionProps={{
                                in: isCurrentlyInView,
                                orientation: 'horizontal',
                                timeout: RevealCaptionTimeout,
                            }}
                        >
                            Here's a couple highlights of some stuff I've worked on.
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
                        {/*</RevealCaption>*/}
                    </Box>

                </Box>


            </Box>
            <Box>

                <Grid
                    container
                    spacing={3}
                    sx={{
                        px: 2,
                        mx: 4
                    }}
                >
                    <Grow
                        in={isCurrentlyInView}
                        timeout={{
                            enter: 2000,
                            appear: 2000,
                            exit: 0,
                        }}
                    >
                        <Grid
                            size={{
                                xs: 6,
                                md: 4,
                            }}
                        >
                            <a
                                target={"_blank"}
                                href={"https://www.fluxergy.com/technology#Fluxergy-Works"}
                            >

                                <PictureCard
                                    src={Fluxergy}
                                    sx={{
                                        textAlign: 'left',
                                        display: 'block',
                                        p: 1,
                                        boxSizing: 'border-box',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            width: 1,
                                            // textAlign: "left",
                                            // mb: 1,
                                        }}
                                        variant={"h5"}
                                    >
                                        Fluxergy
                                    </Typography>
                                    <Typography
                                        sx={{
                                            width: 1,
                                            // textAlign: "left",
                                            whiteSpace: 'pre-wrap',

                                        }}
                                        variant={"body2"}
                                    >
                                        Full-stack development for the next generation
                                        Fluxergy Works application.
                                        <br/>
                                        I helped develop the user interfaces,
                                        built data APIs, and designed both the
                                        firmware communications API, and the system
                                        task scheduler.
                                    </Typography>
                                </PictureCard>
                            </a>
                        </Grid>
                    </Grow>
                    <Grow
                        in={isCurrentlyInView}
                        timeout={{
                            enter: 2500,
                            appear: 2500,
                            exit: 500,
                        }}
                    >
                        <Grid
                            size={{
                                xs: 6,
                                md: 4
                            }}
                        >
                            <a
                                target={"_blank"}
                                href={"https://genomics.uci.edu/"}
                            >

                                <PictureCard
                                    src={UCI}
                                    sx={{
                                        textAlign: 'left',
                                        display: 'block',
                                        p: 1,
                                        boxSizing: 'border-box',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            width: 1,
                                            // textAlign: "left",
                                            mb: 1,
                                        }}
                                        variant={"h5"}
                                    >
                                        UCI Genomics Research & Technology
                                    </Typography>
                                    <Typography
                                        sx={{
                                            width: 1,
                                            // textAlign: "left",
                                            whiteSpace: 'pre-wrap'
                                        }}
                                        variant={"body2"}
                                    >
                                        Research tools for cutting edge antibody
                                        correlation technology.
                                        <br/>
                                        We catalogued the entire known human, viral,
                                        and bacterial proteomes and isolated
                                        antibody sequences to support the fight
                                        against Alzheimer's and other diseases.
                                    </Typography>
                                </PictureCard>
                            </a>
                        </Grid>
                    </Grow>
                    <Grow
                        in={isCurrentlyInView}
                        timeout={{
                            enter: 3000,
                            appear: 3000,
                            exit: 1000,
                        }}
                    >
                        <Grid
                            size={{
                                xs: 6,
                                md: 4
                            }}
                        >
                            <a
                                target={"_blank"}
                                href={"https://keanewong.github.io/The16Planes/"}
                            >

                                <PictureCard
                                    src={DnD}
                                    sx={{
                                        textAlign: 'left',
                                        display: 'block',
                                        p: 1,
                                        boxSizing: 'border-box',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            width: 1,
                                            // textAlign: "left",
                                            mb: 1,
                                        }}
                                        variant={"h5"}
                                    >
                                        180 Days Around the Planes
                                    </Typography>
                                    <Typography
                                        sx={{
                                            width: 1,
                                            // textAlign: "left",
                                            whiteSpace: 'pre-wrap'
                                        }}
                                        variant={"body2"}
                                    >
                                        An interactive game website and dice roller for
                                        my original D&D campaign.
                                        <br/>
                                        It's a little window to my imagination. I
                                        put this together as a dice roller my players can
                                        fiddle with during games, with secret easter eggs
                                        scattered through the site for my most
                                        inquisitive players.
                                    </Typography>
                                </PictureCard>
                            </a>
                        </Grid>
                    </Grow>

                </Grid>
            </Box>

        </Box>
    )
}