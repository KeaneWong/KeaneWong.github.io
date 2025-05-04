import {Canvas, useThree, useFrame, createPortal} from '@react-three/fiber'
import {Color, RenderTarget, Texture, WebGLRenderTarget} from "three";
import {PerspectiveCamera, useFBO,} from "@react-three/drei"
import {Ref, useMemo, useRef} from "react"
import * as THREE from "three"

interface WorldBehindWindowProps {
    windowRenderTarget: RenderTarget,
    // textureRef: Ref<WebGLRenderTarget>,
}

export const WorldBehindWindow = ({
                                      windowRenderTarget,
                                      // textureRef,
                                  }) => {
    const {gl} = useThree()

    // Use the useFBO hook from drei for easier FBO handling
    // const fbo = useFBO(
    //     // {
    //     // multisample: true,
    //     // stencilBuffer: false
    //     // }
    // )

    // References for animation
    const virtualCameraRef = useRef()

    // Set up a virtual camera
    const virtualCamera = useMemo(() => {
        const cam = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
        cam.position.set(0, 0, 2.5)
        cam.lookAt(0, 0, 0)
        return cam
    }, [])

    // Scene to be rendered to texture
    const virtualScene = useMemo(() => {
        // Create a new scene
        const scene = new THREE.Scene()
        scene.background = new THREE.Color(0x2288ff)
        return scene
    }, [])

    // Animation loop
    useFrame(() => {
        // Render virtual scene to FBO
        gl.setRenderTarget(windowRenderTarget)
        gl.render(virtualScene, virtualCameraRef.current)
        gl.setRenderTarget(null)
    })
      const boxRef = useRef()
    return (
        <>
            {
                createPortal(
                    (<>
                        <primitive object={virtualCamera} ref={virtualCameraRef}/>
                        <directionalLight position={[1, 2, 3]} intensity={1.5}/>
                        <mesh
                            ref={boxRef}
                            position={[0, 0, 0]}
                        >
                            <boxGeometry args={[1, 1, 1]}/>
                            <meshStandardMaterial color={ "hotpink" }/>
                        </mesh>
                    </>),
                    virtualScene
                )
            }
        </>
    )
}