import {
    Typography,
    Box,
    SxProps,
    Grid,
    Popover, Collapse, Divider,
} from "@mui/material"
import {useState, ReactNode} from 'react';
import {useBackgroundText} from "../hooks/useBackgroundText.tsx";
import {useInView} from "react-intersection-observer";
import {RevealCaption, RevealCaptionBlock, RevealCaptionTimeout, SubCaption} from "./HeadSection.tsx"
import {css, keyframes, styled} from "styled-components";
import Resume from "../assets/KeaneWong.pdf";
import {useIsMobile} from "../hooks/useIsMobile.tsx";

export interface PageOverlayPropsType {
    sx?: SxProps
}

export interface ItemPropsType {
    children?: ReactNode;
    popoverNode?: ReactNode;
}

const rainbowEffect = keyframes`
    0%, 100% {
        background-position: 0 0;
    }

    50% {
        background-position: 300px 0%;
    }
`;
console.log(rainbowEffect);
const RainbowEffectSpan = styled("span")(
    () => css`
        background-image: linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet);
        background-clip: text;
        color: transparent;
        animation: ${rainbowEffect} 5s linear infinite;
    `
);


export const Item = ({
                         children,
                         popoverNode
                     }: {
    children: ReactNode,
    popoverNode: ReactNode,
}) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const isMobile = useIsMobile();
    return (

        <SubCaption
            variant={!isMobile ? "h5": "h6"}
            sx={{
                textAlign: 'end',
                // px: 1,
                width: 'auto',
                textWrap: 'nowrap'
            }}
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
        >
            {children}
            {popoverNode && <Popover
                sx={{pointerEvents: 'none'}}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'right',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <Typography sx={{
                    p: 1,

                }}>{popoverNode}</Typography>
            </Popover>}
        </SubCaption>

    )
}
export const Section1 = ({
                             sx = {}
                         }: PageOverlayPropsType) => {
    const {
        setTargetString,
        setTextProps
    } = useBackgroundText();
    const [isCurrentlyInView, setIsCurrentlyInView] = useState<boolean>(false);
    const newString =
        "\nFeel free to talk to me about anything\n" +
        "on here. Or not on here, \n" +
        "for that matter."

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
                // position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'end',
                width: '100vw',
                minHeight: '100vh',

                ...sx,
            }}
            ref={ref}
        >
            <Box
                sx={{
                    display: 'block',
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
                            sx={{}}
                        >

                            <Box
                                sx={[
                                    {
                                        background: "#fff",
                                        color: 'black',
                                        px: 2,
                                        // mb: 2,
                                        transition: "all 1s ease-out",
                                        display: 'flex',
                                        justifyContent: 'end',
                                        textAlign: 'end',
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
                                    variant={
                                    !isMobile ? 'h2' : 'h4'
                                }
                                    sx={{
                                        whiteSpace: 'nowrap',
                                        fontWeight: !isMobile ? 'auto': 'light',
                                    }}
                                >
                                    Skills and Tools.
                                </Typography>
                            </Box>
                        </Collapse>

                    </Box>
                    <RevealCaptionBlock
                            isIn={isCurrentlyInView}
                            timeout={RevealCaptionTimeout}
                            lines={
                            !isMobile ?[
                                "Here's a list of some of the things I can do."
                            ] : [
                                "Here's a small ",
                                "list of things I can do.",
                                "Or, if you have something to " ,
                                "teach, I'm always looking to learn.",
                            ]}
                        />

                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'end',
                        // width: '100%',
                        // width: "1000px"
                    }}
                >
                    <Box sx={{
                        width: 400,

                    }}>
                        <Grid
                            container
                            sx={{
                                mt: 2,
                                // width: 300,
                            }}
                            columnSpacing={
                            !isMobile ? 4 : 0}
                        >
                            <Grid size={7}>
                                <Item
                                    popoverNode={
                                        <>
                                            {new Date().getFullYear() - 2020}+ years of practice&#20;
                                            <RainbowEffectSpan>and counting.</RainbowEffectSpan>
                                        </>
                                    }
                                >Web Design</Item>
                            </Grid>
                            <Grid size={5}>
                                <Item
                                    popoverNode={
                                        "Started 2019 and Hooked on it ever since."
                                    }
                                >React</Item>
                            </Grid>
                            <Grid size={7}>
                                <Item
                                    popoverNode={
                                        "ISO approved security, at lightning speeds."
                                    }
                                >Backend</Item>
                            </Grid>
                            <Grid size={5}>
                                <Item
                                    popoverNode={
                                        <>Query on, My<sub

                                        ><small>SQL</small></sub> wayward son...</>
                                    }
                                >SQL</Item>
                            </Grid>
                            <Grid size={7}>
                                <Item
                                    popoverNode={
                                        "Large-scale data analyzed and distilled into research."
                                    }
                                >Data Analysis</Item>
                            </Grid>
                            <Grid size={5}>
                                <Item
                                    popoverNode={
                                        "Flask, FastAPI, Pandas and many more."
                                    }
                                >Python</Item>
                            </Grid>
                            <Grid size={7}>
                                <Item
                                    popoverNode={
                                        "Cloud functions and data analysis on Google Cloud Platform (GCP), and AWS."}
                                >Cloud Engineering</Item>
                            </Grid>
                            <Grid size={5}>
                                <Item
                                    popoverNode={
                                        "Includes what you're looking at now!"
                                    }
                                >ThreeJS</Item>
                            </Grid>

                            <Grid size={7}>
                                <Item
                                    popoverNode={
                                        "Custom TCP and UDP protocols implemented in real time systems."
                                    }
                                >Network Interfaces</Item>
                            </Grid>
                            <Grid size={5}>
                                <Item
                                    popoverNode={
                                        "Using Azure Pipelines, and Github Actions."
                                    }
                                >DevOps</Item>
                            </Grid>
                            <Grid size={7}>
                                <Item
                                    popoverNode={
                                        "Including HTTP RESTful APIs, and Real Time Protocols."
                                    }
                                >Full Stack</Item>
                            </Grid>
                            {/*<Grid size={6}>*/}
                            {/*    <Item*/}
                            {/*        popoverNode={*/}
                            {/*            "Strapped with UI/UX design to Boot!"*/}
                            {/*        }*/}
                            {/*    >Game Developmeny</Item>*/}
                            {/*</Grid>*/}
                            <Grid size={5}>
                                <Item>
                                    <a
                                        href={Resume}
                                        target={"_blank"}
                                        download={"Keane Wong's Resume.pdf"}
                                        style={{
                                            color: 'inherit',
                                            textDecoration: "inherit"
                                        }}
                                    >
                                        <u>
                                            And more
                                        </u>
                                    </a>
                                </Item>
                            </Grid>


                        </Grid>
                    </Box>
                </Box>

            </Box>
        </Box>
    )
}