import './App.css'
import {BackgroundCanvas} from "./components/BackgroundCanvas.tsx";
import {Section1} from "./sections/Section1.tsx";
import {HeadSection} from "./sections/HeadSection.tsx";
import {MainToolbar} from "./components/MainToolbar.tsx";
import {EyeOpener} from "./components/EyeOpener.tsx";
import {BackgroundTextProvider} from "./contexts/BackgroundTextContext.tsx";

function App() {

    return (
        <div
            style={{
                height: "10000px"
            }}
        >
            {/*<WindowRevealer/>*/}
            <EyeOpener/>
            <BackgroundTextProvider>

                <MainToolbar/>
                <div
                    style={{

                    }}
                >
                    <HeadSection/>
                    <BackgroundCanvas/>
                    <Section1/>

                </div>
            </BackgroundTextProvider>
        </div>
    )
}

export default App
