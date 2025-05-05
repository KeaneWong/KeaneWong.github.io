import {Box} from "@mui/material"
import {keyframes, css, styled} from "styled-components";


const OpeningEyes = keyframes`
    0% {
  --eyeOpen:0%; 
    }
    30% {
  --eyeOpen:55%; 
    }
    35% {
  --eyeOpen:0%; 
    }
    40%{
        --eyeOpen:35%;
    }
    45%{
        --eyeOpen:0%;
    }
    60% {
  --eyeOpen:0%; 
    }
    75%{
        --eyeOpen: 130%;
    }
    100% {
        //background: radial-gradient(ellipse 100% 55% at 50% -20%, transparent, transparent 80%, #000 100%);
    --eyeOpen: 200%; /* we update on hover */
    }
`

const CustomizedDiv = styled("div")(
    () => css`
        z-index: 1000;
        position: fixed;
        width: 100vw;
        height: 50vh;
    `
);
const Top = styled(CustomizedDiv)`
    @property --eyeOpen {
        syntax: "<percentage>";
        inherits: false;
        initial-value: 0%;
    }

    top: 0;
    background: radial-gradient(ellipse 100% var(--eyeOpen) at 50% 120%, transparent, transparent 80%, #000 100%);

    //background: radial-gradient(ellipse 100% 55% at 50% 120%, transparent, transparent 90%, #000 100%);
    animation: ${OpeningEyes} 3s ease-in-out .3s;


`;
const Bottom = styled(CustomizedDiv)`
    @property --eyeOpen {
        syntax: "<percentage>";
        inherits: false;
        initial-value: 200%;
    }

    bottom: 0;
    background: radial-gradient(ellipse 100% var(--eyeOpen) at 50% -20%, transparent, transparent 80%, #000 100%);

    //background: rgba(0,0,0,1);
    //background: radial-gradient(ellipse 100% 55% at 50% -20%, transparent, transparent 90%, #000 100%);
    animation: ${OpeningEyes} 3s ease-in-out .3s;

`;

export const EyeOpener = () => {

    return (
        <>
            <Top/>
            <Bottom/>
            {/*<CustomizedDiv>*/}
            {/*    {children}*/}
            {/*</CustomizedDiv>*/}

        </>
    )
}