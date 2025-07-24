import {
    Box,
    Toolbar,
    Button,
    IconButton
} from "@mui/material"
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

const iconProps = {
    sx: {
        color: 'white'
    }
}
const tagProps = {
    target: "_blank",
}

export const MainToolbar = () => {
    return (
        <Toolbar
            sx={{
                width: 1,
                position: 'fixed',
                display: 'flex',
                justifyContent: "space-between",
                // top: -1,
                bgcolor: "rgba(0,0,0,0)",
                boxSizing: "border-box",
                px: 2,
                zIndex: 100,
            }}
            disableGutters
        >
            <Box>

            </Box>
            <Box

            >
                <IconButton>
<a href="mailto:keanewong913@gmail.com?subject=Introductions!&body=Hello%20Keane%2C%0A%0ANice%20to%20meet%20you!%20I%20wanted%20to%20talk%20to%20you%20about...%0A...%0A...%0A%0ABest%20regards%2C%0A">                        <EmailIcon {...iconProps}/>
                    </a>

                </IconButton>

                <IconButton>
                    <a
                        {...tagProps}
                        href={"https://github.com/KeaneWong"}
                    >
                        <GitHubIcon
                            {...iconProps}

                        />
                    </a>

                </IconButton>
                <IconButton
                >
                    <a
                        {...tagProps}
                        href={"https://www.linkedin.com/in/keane-wong/"}>
                        <LinkedInIcon
                            {...iconProps}
                        />
                    </a>
                </IconButton>

            </Box>

        </Toolbar>
    )
}