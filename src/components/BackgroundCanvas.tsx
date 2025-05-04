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
import {OrthographicCamera, PerspectiveCamera} from "@react-three/drei";

const PARALLAX = 3

export const BackgroundCanvas = () => {
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)
    useEffect(() => {
        const PanMovement = (event) => {
            const newX = (window.innerWidth - event.pageX * PARALLAX)/90;
            const newY = (window.innerHeight - event.pageY * PARALLAX)/90;
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
                // transform: `translateX(${x}px) translateY(${y}px) scale(1.09) `,

                }}
            >

            <Canvas>
                <OrthographicCamera
                    // makeDefault
                    // position={[-1,0,0]}
                    // fov={75}
                    // aspect={1920/1200}
                    // near={0.1}
                    // far={10}
                    left={-1}
                    right={1}
                    top={1}
                    bottom={-1}
                    near={0}
                    far={1}
                />
                <RainyWindow
                    backgroundTexture={Hippos}
                />
            </Canvas>

            </div>
        </div>
    )
}

