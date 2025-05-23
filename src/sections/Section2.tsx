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
import SMAC from "../assets/smac_fire.jpg"
import Blank from "../assets/Blank_ish.png"
import Itadakimasu from "../assets/Cooking.jpeg"
import {RevealCaption, RevealCaptionBlock, RevealCaptionTimeout} from "./HeadSection.tsx"
import {useIsMobile} from "../hooks/useIsMobile.tsx";

export interface PageOverlayPropsType {
    sx?: SxProps
}

export interface PictureCardPropsType extends PaperProps {
    children: ReactNode,
    src: string,
    hoverOverride?: boolean,
}


export const PictureCard = ({
                                children,
                                src,
                                elevation = 10,
                                sx = {},
    hoverOverride=false,
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
                transform: (hoverOverride || hover) ? "scale(1.03)" : undefined,
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
                    opacity: (hoverOverride || hover) ? 0.2 : 1,
                    transition: "all 0.3s ease-out",
                }}
            />
            <Box
                sx={{
                    zIndex: 2,
                    width: 1,
                    height: 1,
                    position: 'relative',
                    opacity: (hoverOverride || hover) ? 1 : 0,
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
                                 minHeight: '100vh',
                                 mt: 5,
                             }
                         }: PageOverlayPropsType) => {
    const {
        setTargetString,
        setTextProps
    } = useBackgroundText();
    const isMobile = useIsMobile();

    const newString =
        "<a href='linkedin.com/in/KeaneWong'>\n" +
        "\t<div>\n" +
        "\t\tMy Experience.\n" +
        "\t</div>\n" +
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
        threshold: 0.45,
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
                                <a
                                    target={"_blank"}
                                    href={"https://linkedin.com/in/KeaneWong"}
                                    style={{
                                        textDecoration: 'inherit',
                                        color: 'inherit',
                                    }}
                                >
                                    <Typography
                                        variant={
                                            !isMobile ? 'h2' : "h3"}
                                        sx={{
                                            whiteSpace: 'nowrap',
                                            fontWeight: !isMobile ? "auto" : 'light',
                                        }}
                                    >
                                        My Experience.
                                    </Typography>
                                </a>
                            </Box>
                        </Collapse>
                    </Box>

                    <RevealCaptionBlock
                        sx={{
                            mb: 3
                        }}
                        isIn={isCurrentlyInView}
                        timeout={RevealCaptionTimeout}
                        lines={!isMobile ? [
                            "Here's a couple highlights of some stuff I've worked on.\n"

                        ] : [
                            "Here's a couple highlights of \n",
                            "some stuff I've worked on."
                        ]}

                    />

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

                                            fontSize: "max(14px, 3vi)",
                                        }}
                                        variant={"h5"}
                                    >
                                        Fluxergy
                                    </Typography>
                                    <Typography
                                        sx={{
                                            width: 1,
                                            whiteSpace: 'pre-wrap',
                                            fontSize: "max(8px, 1.2vi)",

                                        }}
                                        variant={"body2"}
                                    >
                                        <i>Full-stack development for affordable,
                                            next generation diagnostic devices.</i>
                                        <br/>
                                        {!isMobile && <br/>}
                                        &ensp;I designed the firmware
                                        communications API, wrote the system's primary
                                        task runner, and worked to develop the user interfaces.
                                        <br/>
                                        &ensp;Totally unlike any other system, which
                                        makes every hurdle both challenging and
                                        endlessly interesting.
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
                                            fontSize: "max(12px, 2vi)",
                                        }}
                                        variant={"h5"}
                                    >
                                        UCI Genomics Research & Technology
                                    </Typography>
                                    <Typography
                                        sx={{
                                            width: 1,
                                            whiteSpace: 'pre-wrap',
                                            fontSize: "max(8px, 1.2vi)",
                                        }}
                                        variant={"body2"}
                                    >
                                        <i>Research tools for cutting edge antibody
                                            correlation technology.</i>
                                        <br/>
                                        {!isMobile && <br/>}
                                        &ensp;We catalogued hundreds of billions of sequences
                                        across the human and bacterial proteomes
                                        and isolated antibody sequences to support
                                        the fight against Alzheimer's and other diseases.
                                        <br/>
                                        {/*&ensp;To this day, research is still going on and the*/}
                                        {/*tools we made are being built on all the time.*/}
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

                                            fontSize: "max(12px, 2.8vi)",
                                        }}
                                        variant={"h5"}
                                    >
                                        180 Days Around the Planes
                                    </Typography>
                                    <Typography
                                        sx={{
                                            width: 1,
                                            whiteSpace: 'pre-wrap',
                                            fontSize: "max(8px, 1.2vi)",
                                        }}
                                        variant={"body2"}
                                    >
                                        <i>An interactive game website and dice roller for
                                            my original D&D campaign.</i>
                                        <br/>
                                        {!isMobile && <br/>}
                                        &ensp;I put this together as a dice roller my players can
                                        play with during games, with little secrets
                                        scattered about for my inquisitive players.
                                        <br/>
                                        &ensp;And, maybe you'll spot some of it's secrets
                                        as well. Just watch out for the <strong>monster.</strong>
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
                                href={"https://cpcc.uci.edu/research.php"}
                            >
                                <PictureCard
                                    src={SMAC}
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
                                            fontSize: "max(12px, 2.2vi)",

                                        }}
                                        variant={"h5"}
                                    >
                                        SMAC-Fire WildFire Response Initiative
                                    </Typography>
                                    <Typography
                                        sx={{
                                            width: 1,
                                            whiteSpace: 'pre-wrap',
                                            fontSize: "max(8px, 1.2vi)",

                                        }}
                                        variant={"body2"}
                                    >
                                        <i>Predicting the spread of wildfires informed
                                            by closed-loop sensing and machine learning
                                            classification models.</i>
                                        <br/>
                                        {!isMobile && <br/>}
                                        &ensp;We put together infrastructure for reliable,
                                        distributed systems; the kind of systems that
                                        would hold up after you sent them flying into
                                        a blazing inferno.

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

                            <PictureCard
                                src={Itadakimasu}
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
                                        fontSize: "max(14px, 3vi)",
                                    }}
                                    variant={"h5"}
                                >
                                    Itadakimasu
                                </Typography>
                                <Typography
                                    sx={{
                                        width: 1,
                                        whiteSpace: 'pre-wrap',
                                        fontSize: "max(8px, 1.2vi)",

                                    }}
                                    variant={"body2"}
                                >
                                    <i>
                                        Full-Stack recipe website, built
                                        with PERN and powered by AWS.
                                    </i>
                                    <br/>
                                    {!isMobile &&<br/>}
                                    &ensp;A modern blog platform for cooking
                                    content creators
                                    to <b>roast</b>, <b>post</b>, and <b>host</b>.
                                    Bringing accessible recipes, inspired by
                                    tradition.
                                    <br/><br/>
                                    <b>
                                        [Currently undergoing a makeover!]
                                    </b>


                                </Typography>
                            </PictureCard>
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
                                href={"https://github.com/KeaneWong"}
                            >
                                <PictureCard
                                    src={Blank}
                                    sx={{
                                        textAlign: 'left',
                                        display: 'block',
                                        p: 1,
                                        boxSizing: 'border-box',
                                    }}
                                    // hoverOverride={true}
                                >

                                    <Typography
                                        sx={{
                                            width: 1,
                                            textAlign: "right",
                                            pr: 2,
                                            whiteSpace: 'pre-wrap',
                                            fontSize: "max(12px, 1.6vi)",
                                        }}
                                        variant={"body2"}
                                    ><br/>
                                        <u>
                                            {"\n\n\n\n\n"}
                                            See what else I'm up to {'>'}
                                        </u>

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