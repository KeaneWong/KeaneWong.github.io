import {Canvas, useThree, useFrame, createPortal} from '@react-three/fiber'
import {Color, RenderTarget, Texture, WebGLRenderTarget} from "three";
import { useTexture} from "@react-three/drei"
import LandscapeImage from "../assets/IMG_4244.jpg"
import { useMemo, useRef} from "react"
import * as THREE from "three"
import {WorldBehindWindow} from "./WorldBehindWindow.tsx";

interface WindowViewProps {
    windowRenderTarget: WebGLRenderTarget,
    // textureRef: Ref<WebGLRenderTarget>,
}

export const WindowView = ({
                               windowRenderTarget,
                               // textureRef,
                           }: WindowViewProps) => {
    const {gl} = useThree()

    // Use the useFBO hook from drei for easier FBO handling
    // const fbo = useFBO(
    //     // {
    //     // multisample: true,
    //     // stencilBuffer: false
    //     // }
    // )

    // References for animation
    const virtualCameraRef = useRef<THREE.Camera>(null)

    // Set up a virtual camera
    const virtualCamera = useMemo(() => {
        const cam = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
        cam.position.set(0, 0, 2.5)
        cam.lookAt(0, 0, 0)
        return cam
    }, [])

    const image = useTexture(
        LandscapeImage
    )

    // Scene to be rendered to texture
    const virtualScene = useMemo(() => {
        // Create a new scene
        const scene = new THREE.Scene()
        scene.background = image
        return scene
    }, [])

    // Animation loop
    useFrame(() => {
        if (virtualCameraRef.current) {
            // Render virtual scene to FBO
        gl.setRenderTarget(windowRenderTarget)
        gl.render(virtualScene, virtualCameraRef.current)
        gl.setRenderTarget(null)
        } else{
            console.log("ERROR: Virtual camera not set.")
        }

    })
    return (
        <>
            {
                createPortal(
                    (<>
                            <primitive object={virtualCamera} ref={virtualCameraRef}/>
                            <WorldBehindWindow/>
                        </>
                    ),
                    virtualScene
                )
            }
        </>
    )
}