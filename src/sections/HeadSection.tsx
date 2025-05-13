import {Box, Typography, TypographyProps} from "@mui/material"
import {useBackgroundText} from "../hooks/useBackgroundText.tsx";
import {useInView} from "react-intersection-observer"
import Me from "../assets/Subject.png"

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
    const newString =
        "It never rains in Southern California, which\n" +
        "makes it all the more special when\n" +
        "it finally comes back."

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
                <Typography
                    variant={'h1'}
                    sx={{
                        textAlign: 'right',
                        py: 2,
                    }}
                >
                    Keane
                </Typography>
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