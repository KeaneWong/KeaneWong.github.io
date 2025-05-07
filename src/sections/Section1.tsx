import {
    Typography,
    Box,
    SxProps
} from "@mui/material"

export interface PageOverlayPropsType {
    sx?: SxProps
}

export const Section1 = ({
                             sx = {
                                 width: '100vw',
                                 height: '100vh',

                             }
                         }) => {

    return (
        <Box
            sx={{
                ...sx,
            }}
        >

            <Typography variant={"h1"}>
                KeaneWong
            </Typography>

        </Box>
    )
}