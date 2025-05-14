import {
    Typography,
    Box,
    SxProps,
    Grid,
    Popover,
} from "@mui/material"
import {useState, ReactNode} from 'react';
import {useBackgroundText} from "../hooks/useBackgroundText.tsx";
import {useInView} from "react-intersection-observer";
import {SubCaption} from "./HeadSection.tsx"
import {css, keyframes, styled} from "styled-components";

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
        animation: ${rainbowEffect} 5s linear infinite ;
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
    return (

        <SubCaption
            variant={"h5"}
            sx={{
                textAlign: 'end',
                px: 1,
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
                <Typography sx={{p: 1}}>{popoverNode}</Typography>
            </Popover>}
        </SubCaption>

    )
}
export const Section1 = ({
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

    function changeText(inView: boolean,) {
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
                <Typography
                    variant={"h2"}
                    sx={{
                        textAlign: 'end',
                    }}
                >
                    <strong>
                        Some Stuff I Can Do
                    </strong>
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'end',
                        width: '100%',
                    }}
                >
                    <Box sx={{
                        flexGrow: 1,
                        width: 400,

                    }}>
                        <Grid
                            container
                            sx={{
                                mt: 4,
                            }}
                            columnSpacing={0}
                        >
                            <Grid size={6}>
                                <Item
                                    popoverNode={
                                        "Strapped with UI/UX design to Boot!"
                                    }
                                >Web Design</Item>
                            </Grid>
                            <Grid size={6}>
                                <Item
                                    popoverNode={
                                        <>
                                            {new Date().getFullYear() - 2020}+ years of practice&#20;
                                            <RainbowEffectSpan>and counting.</RainbowEffectSpan>
                                        </>
                                    }
                                >HTML/CSS/JS</Item>
                            </Grid>
                            <Grid size={6}>
                                <Item
                                    popoverNode={
                                        "Tried it once and was Hooked ever since."
                                    }
                                >React</Item>
                            </Grid>
                            <Grid size={6}>
                                <Item
                                    popoverNode={
                                        "ISO approved security, at lightning speeds."
                                    }
                                >Backend</Item>
                            </Grid>
                            <Grid size={6}>
                                <Item
                                    popoverNode={
                                        <>Query on, My<sub

                                        ><small>SQL</small></sub> wayward son...</>
                                    }
                                >SQL</Item>
                            </Grid>
                            <Grid size={6}>
                                <Item
                                    popoverNode={
                                        "Large-scale data analyzed and used in published research."
                                    }
                                >Data Analysis</Item>
                            </Grid>
                            <Grid size={6}>
                                <Item
                                    popoverNode={
                                        "Flask, FastAPI, Pandas and many more."
                                    }
                                >Python</Item>
                            </Grid>
                            <Grid size={6}>
                                <Item
                                    popoverNode={
                                        "Production level services on Google Cloud Platform (GCP) and AWS."}
                                >Cloud Engineering</Item>
                            </Grid>
                            <Grid size={6}>
                                <Item
                                    popoverNode={
                                        "Includes what you're looking at now!"
                                    }
                                >ThreeJS</Item>
                            </Grid>

                            <Grid size={6}>
                                <Item
                                    popoverNode={
                                        "Custom TCP and UDP protocols implemented in real time systems."
                                    }
                                >Network Interfaces</Item>
                            </Grid>
                            <Grid size={6}>
                                <Item
                                    popoverNode={
                                        "Both Azure Pipelines, and Github Actions based."
                                    }
                                >DevOps</Item>
                            </Grid>
                            <Grid size={6}>
                                <Item
                                    popoverNode={
                                        "Including HTTP RESTful APIs, and Real Time Protocols."
                                    }
                                >Full Stack</Item>
                            </Grid>


                        </Grid>
                    </Box>
                </Box>

            </Box>
        </Box>
    )
}