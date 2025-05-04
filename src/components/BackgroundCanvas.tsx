import * as THREE from 'three';
import {useState} from 'react'
import {RainyWindow} from "./Rain/RainyWindow.tsx";
import Hippos from "../assets/Hippos.jpg"
import
{
    Canvas,
    useThree,
    useFrame,

} from '@react-three/fiber'
import {OrthographicCamera} from "@react-three/drei";

export const BackgroundCanvas = () => {
    console.log(Hippos)
    return (
        <div
            style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                overflow: 'hidden',
            }}
        >
        <Canvas
        >
            <OrthographicCamera
                makeDefault
                left={-1}
                right={1}
                top={1}
                bottom={-1}
                near={0}
                far={1}
            />
            {/*<mesh>*/}
            {/*    <boxGeometry></boxGeometry>*/}
            {/*    <meshBasicMaterial color={0xffffff}/>*/}
            {/*</mesh>*/}
            {/*<ambientLight intensity={Math.PI / 2}/>*/}
            {/*<spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI}/>*/}
            {/*<pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI}/>*/}
            {/*<mesh*/}
            {/*    position={[-1.2, 0, 0]}*/}
            {/*    scale={1}>*/}
            {/*    <boxGeometry args={[1, 1, 1]}/>*/}
            {/*    <meshStandardMaterial color={'orange'}/>*/}
            {/*</mesh>*/}
            <RainyWindow
                backgroundTexture={Hippos}
            />
        </Canvas>
            </div>
    )
}

