import {Box, Typography} from "@mui/material"

export const HeadSection = ()=> {
    return (
        <Box
            sx={{
                position: 'absolute',
                width: '100vw',
                height: '100vh',
                // mt: 4,
            }}
        >
            <Typography
                variant={'h1'}
            >
                Keane Wong
            </Typography>
        </Box>
    )
}