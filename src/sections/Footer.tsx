import {
    BottomNavigation,
    BottomNavigationAction,
    Typography,
    Box,
    Divider,
} from "@mui/material"

export const Footer = () => {
    return (
        <Box
            sx={{
                minHeight: 200,
                bottom: 0,
                width: 1,
                backgroundColor: "#242424",
                fontColor: 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                gap: 2,
                pt: 3,
                pb: 3,
                px: {xs: 2, sm: 4},
                boxSizing: 'border-box',
                textAlign: 'start',
                overflowWrap: 'anywhere',

            }}
            // showLabels
        >
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 3,
                    justifyContent: 'space-between',
                    // alignItems: 'center',
                    px: {xs: 0, sm: 4},
                }}
            >


                <Box
                    sx={{
                        flexGrow: 0,
                    }}
                >
                    <Typography
                        // variant={''}
                        sx={{
                            opacity: 0.6,
                            mb: 1
                        }}
                    >
                        <strong>
                            Get in Touch
                        </strong>
                    </Typography>
                    <Typography
                        variant={"body2"}
                    >
                        <b>
                            +1 (626) 841-2142
                        </b>
                    </Typography>
                    <Typography
                        variant={"body2"}
                    >
                        <a
                            style={{
                                textDecoration: 'inherit',
                                color: 'inherit',
                            }}
                            href="mailto:keanewong913@gmail.com?subject=Introductions!&body=Hello%20Keane%2C%0A%0A%0ANice%20to%20meet%20you!%20I%20wanted%20to%20talk%20to%20you%20about...%0A...%0A......%0A.........%0A%0ABest%20Regards%2C%20%0A%0AMy%20one%20and%20only%20self.">

                            <b>
                                keanewong913@gmail.com
                            </b>
                        </a>
                    </Typography>
                    <Typography
                        variant={"body2"}
                    >
                        <b>

                        </b>
                    </Typography>
                </Box>
                <Box
                    sx={{
                        flexGrow: 0,
                    }}>
                    <Typography
                        // variant={''}
                        sx={{
                            opacity: 0.6,
                            mb: 1
                        }}
                    >
                        <strong>
                            Connect
                        </strong>
                    </Typography>
                    <Typography
                        variant={"body2"}
                    >
                        <a
                            target={"_blank"}
                            href={"https://github.com/KeaneWong"}
                            style={{
                                textDecoration: "inherit",
                                color: 'inherit',
                            }}
                        >
                            <b>
                                GitHub
                            </b>
                        </a>
                    </Typography>
                    <Typography
                        variant={"body2"}
                    >
                        <a
                            target={"_blank"}
                            href={"https://linkedin.com/in/KeaneWong"}
                            style={{
                                textDecoration: "inherit",
                                color: 'inherit',
                            }}
                        >
                            <b>
                                LinkedIn
                            </b>
                        </a>
                    </Typography>
                    <Typography
                        variant={"body2"}
                    >
                        <a
                            target={"_blank"}
                            href={"https://instagram.com/what_keane_go_wong"}
                            style={{
                                textDecoration: "inherit",
                                color: 'inherit',
                            }}
                        >
                            <b>
                                Instagram
                            </b>
                        </a>
                    </Typography>
                </Box>
                <Box
                    sx={{
                        flexGrow: 0,
                    }}>

                    <Typography
                        // variant={''}
                        sx={{
                            opacity: 0.6,
                            mb: 1
                        }}
                    >
                        <strong>
                        </strong>
                    </Typography>
                </Box>
            </Box>
            <Divider
                sx={{

                    borderColor: "rgba(255, 255, 255, 0.24)"
                }}
            />
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0.6,
                }}
            >
                Last Signed Off - Keane Wong &copy;2025
            </Box>
        </Box>
    )
}