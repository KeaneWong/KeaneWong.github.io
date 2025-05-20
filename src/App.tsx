import './App.css'
import {BackgroundCanvas} from "./components/BackgroundCanvas.tsx";
import {Section1} from "./sections/Section1.tsx";
import {HeadSection} from "./sections/HeadSection.tsx";
import {MainToolbar} from "./components/MainToolbar.tsx";
import {EyeOpener} from "./components/EyeOpener.tsx";
import {BackgroundTextProvider} from "./contexts/BackgroundTextContext.tsx";
import {Section2} from "./sections/Section2.tsx";
import {ShipControllerProvider} from "./contexts/ShipControllerContext.tsx";
import {Section3} from './sections/Section3.tsx';
import {WeatherContextProvider} from "./contexts/WeatherControllerContext.tsx";

function App() {

    return (
        <div
            style={{
                // height: "10000px"
            }}
        >
            {/*<WindowRevealer/>*/}
            <EyeOpener/>
            <WeatherContextProvider>
                <BackgroundTextProvider>
                    <ShipControllerProvider>

                        <MainToolbar/>
                        <div
                            style={{}}
                        >
                            <HeadSection/>
                            <BackgroundCanvas/>
                            {/*<Section1/>*/}
                            <Section3/>
                            <Section2/>

                        </div>
                    </ShipControllerProvider>
                </BackgroundTextProvider>
            </WeatherContextProvider>
        </div>
    )
}

export default App
