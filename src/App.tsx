import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BackgroundCanvas} from "./components/BackgroundCanvas.tsx";
import {PageOverlay} from "./components/PageOverlay.tsx";
import {HeadSection} from "./components/HeadSection.tsx";
import {MainToolbar} from "./components/MainToolbar.tsx";

function App() {

    return (
        <div
            style={{
                height: "10000px"
            }}
        >
            <MainToolbar/>
            <div
                style={{
                    height: "1000px"
                }}
            >
                <HeadSection/>

                <BackgroundCanvas/>
                <PageOverlay/>


            </div>


        </div>
    )
}

export default App
