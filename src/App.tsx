import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BackgroundCanvas} from "./components/BackgroundCanvas.tsx";
import {PageOverlay} from "./components/PageOverlay.tsx";

function App() {

  return (
    <>
      <BackgroundCanvas/>
        {/*<PageOverlay/>*/}
    </>
  )
}

export default App
