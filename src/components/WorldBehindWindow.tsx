import {Canvas, useThree, useFrame, createPortal} from '@react-three/fiber'
import {Color, RenderTarget, Texture, WebGLRenderTarget} from "three";
import {PerspectiveCamera, useFBO,} from "@react-three/drei"
import {Ref, useMemo, useRef} from "react"
import * as THREE from "three"

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
    return (
        <>
            <directionalLight position={[1, 2, 3]} intensity={1.5}/>
            {/*<mesh*/}
            {/*    position={[0, 0, 0]}*/}
            {/*>*/}
            {/*    <boxGeometry args={[1, 1, 1]}/>*/}
            {/*    <meshStandardMaterial color={"hotpink"}/>*/}
            {/*</mesh>*/}
        </>
    )
}