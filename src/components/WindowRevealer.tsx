import {Box} from "@mui/material"
import {keyframes, css, styled} from "styled-components";
const growth = keyframes`
    0% {
        width: 150vw;
        height: 50vh;
    }
    10% {
        width: 149vw;
        height: 49vh;
    }
    20% {
        width: 149vw;
        height: 49vh;
    }
    //30% {
    //    width: 48vw;
    //    height: 48vh;
    //}
    70% {
        width: 149.5vw;
        height: 49.5vh;
    }
    100% {
        width: 100vh;
        height: 0;
    }
`;
    const CustomizedDiv = styled("div")(
        () => css`
            z-index: 1000;
            position: fixed;
            //width: 50vw;
            //height: 50vw;
            background-color: #000;
            animation: ${growth} 3s ease-in-out 0s;
            
        `
    );
    const TopLeft = styled(CustomizedDiv)`
        top: 0;
        left: 0;
    `;
    const TopRight = styled(CustomizedDiv)`
        top: 0;
        right: 0;
    `;
    const BottomLeft = styled(CustomizedDiv)`
        bottom: 0;
        left: 0;
    `;
    const BottomRight = styled(CustomizedDiv)`
        bottom: 0;
        right: 0;
    `;
export const WindowRevealer = () => {

    return (
        <>
            <TopLeft/>
            <TopRight/>
            <BottomLeft/>
            <BottomRight/>
        </>
    )
}