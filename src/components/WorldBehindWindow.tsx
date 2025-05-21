import {PerspectiveCamera, useFBO, Text} from "@react-three/drei"
import {Ref, useMemo, useEffect, useRef, useState} from "react"
import * as THREE from "three"
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader';
import MyFont from "../assets/fonts/VeraMono.ttf"
import {useInterval} from "./useInterval.tsx";
import {useBackgroundText} from "../hooks/useBackgroundText.tsx";

const fontName = 'VeraMono'
const fontPath = "src/assets/fonts/" + fontName + ".json";

interface WorldBehindWindowProps {
}

export const WorldBehindWindow = ({
                                      // textureRef,
                                  }: WorldBehindWindowProps) => {

    const {
        realString,
        textLocation,
        textProps,
    } = useBackgroundText()

    useEffect(() => {
    }, []);
    return (
        <>
            <directionalLight position={[1, 2, 3]} intensity={1.5}/>
            <Text
                position={[...textLocation]}
                font={MyFont}
                {...textProps}

            >
                {realString}
            </Text>

        </>
    )
}