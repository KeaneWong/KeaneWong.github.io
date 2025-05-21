import * as THREE from 'three';
import {useState, useEffect} from 'react'
import {RainyWindow} from "./Rain/RainyWindow.tsx";
import Hippos from "../assets/Hippos.jpg"
import
{
    Canvas,
    useThree,
    useFrame,

} from '@react-three/fiber'
import {CameraWrapper} from "./CameraWrapper.tsx";
import { BackWall } from './Rain/BackWall.tsx';
import {DirectionLightWrapper} from "./DirectionLightWrapper.tsx";

const PARALLAX = 2

export const BackgroundCanvas = () => {
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)
    useEffect(() => {
        const PanMovement = (event) => {
            const newX = (window.innerWidth - event.pageX * PARALLAX) / 90;
            const newY = (window.innerHeight - event.pageY * PARALLAX) / 90;
            setX(newX)
            setY(newY)
        }


        document.addEventListener("mousemove", PanMovement)
        return () => {
            document.removeEventListener("mousemove", PanMovement)
        }

    }, [])
    return (
        <div
            style={{
                position: 'sticky',
                width: '100vw',
                height: '100vh',
                overflow: 'hidden',
                zIndex: -100,
                top: "-1px"
            }}
        >
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    transform: `translateX(${x}px) translateY(${y}px) scale(1.09) `,

                }}
            >

                <Canvas>
                    <CameraWrapper/>
                    <RainyWindow
                    />
                    <BackWall
                        position={[0,0,0]}
                    />
                    <ambientLight
                        color={"#fff"}
                        intensity={.4}
                    />
                    {/*<pointLight*/}
                    {/*    position={[-.75,0,2]}*/}
                    {/*    intensity={10}*/}

                    {/*    color={"#F4EDC6 "}*/}
                    {/*/>*/}
                    <DirectionLightWrapper/>
                </Canvas>

            </div>
        </div>
    )
}

