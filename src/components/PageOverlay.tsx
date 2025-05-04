import {
    Typography,
    Box,
    SxProps
} from "@mui/material"

export interface PageOverlayPropsType{
    sx?: SxProps
}

export const  PageOverlay = ({
    sx={}
                             }) =>{

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