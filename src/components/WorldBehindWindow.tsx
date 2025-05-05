import {PerspectiveCamera, useFBO, Text} from "@react-three/drei"
import {Ref, useMemo, useEffect, useRef, useState} from "react"
import * as THREE from "three"
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader';
import MyFont from "../assets/fonts/VeraMono.ttf"
import {useInterval} from "./useInterval.tsx";
const fontName = 'VeraMono'
const fontPath = "src/assets/fonts/" + fontName + ".json";


interface WorldBehindWindowProps {
}

export const WorldBehindWindow = ({
                                      // textureRef,
                                  }: WorldBehindWindowProps) => {
    //
    // // Animation loop
    // useFrame(() => {
    //     // Render virtual scene to FBO
    //     gl.setRenderTarget(windowRenderTarget)
    //     gl.render(virtualScene, virtualCameraRef.current)
    //     gl.setRenderTarget(null)
    // })
    const [curText, setCurText] = useState("fe")
    const [curCursor, setCurCursor] = useState("|")


    useInterval(()=>{
            setCurCursor(cursor => cursor === "|" ? `\xa0` : "|")
    }, 1000)

    useEffect(() => {
    }, []);
    return (
        <>
            <directionalLight position={[1, 2, 3]} intensity={1.5}/>
            {/*<mesh*/}
            {/*    position={[0, 0, 0]}*/}
            {/*>*/}
            {/*    <boxGeometry args={[1, 1, 1]}/>*/}
            {/*    <meshStandardMaterial color={"hotpink"}/>*/}
            {/*</mesh>*/}
            <Text
                font={MyFont}
                fontSize={0.2}
                color="black"
                anchorX="center"
                anchorY="middle"
                letterSpacing={-.1}
            >
                {curText + curCursor}
            </Text>

        </>
    )
}