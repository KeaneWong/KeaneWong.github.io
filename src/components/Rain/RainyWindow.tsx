import * as THREE from 'three';
import
{
    useThree,
    useFrame,
    extend,
} from '@react-three/fiber'
import {useFBO, useTexture} from '@react-three/drei'
import {useRef, useEffect, useState} from 'react'
import RainMaterial from "./RainMaterial.tsx"
import {WindowView} from "../WindowView.tsx";

extend({RainMaterial})

export interface RainyWindowPropsType {
}

const devicePixelRatio = window.devicePixelRatio || 1;

export const RainyWindow = (
    {}: RainyWindowPropsType) => {

    const materialRef = useRef<THREE.ShaderMaterial>(null)
    const {size, viewport} = useThree()
    const windowRenderTarget = useFBO();

    const [mousePosition, setMousePosition] = useState([0.5, 0.5])
    // Track mouse position
    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            setMousePosition([
                event.clientX / size.width,
                1.0 - (event.clientY / size.height) // Invert Y since WebGL coordinate system is bottom-up
            ])
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [size])
    // Update resolution and time on each frame
    useFrame((state) => {
        if (materialRef.current) {
            // Update time uniform
            materialRef.current.uniforms.u_time.value = state.clock.getElapsedTime()

            // Update resolution when viewport changes
            materialRef.current.uniforms.u_resolution.value.set(
                size.width * devicePixelRatio,
                size.height * devicePixelRatio)

        }
    })

    // Set up texture when component mounts
    useEffect(() => {
        if (materialRef.current && windowRenderTarget) {
            materialRef.current.uniforms.u_tex0.value = windowRenderTarget.texture;
        } else {
            console.log("ERROR: Nullish values ", materialRef.current, windowRenderTarget)
        }
    }, [])
    // Update resolution when canvas is resized
    useEffect(() => {
        if (materialRef.current) {
            materialRef.current.u_resolution.set(size.width, size.height)
        }
    }, [size])


    return (
        <mesh>
            {/* Use a plane that fills the entire view */}
            <planeGeometry
                args={[viewport.width, viewport.height]}

            />
            <WindowView
                windowRenderTarget={windowRenderTarget}
                // textureRef={textureRef}
            />
            <rainMaterial
                ref={materialRef}
                u_resolution={
                    windowRenderTarget !== null ?
                        (new THREE.Vector2(windowRenderTarget.width, windowRenderTarget.height)) :
                        undefined}
                u_intensity={0.5}
                u_speed={0.3}
                u_blur_intensity={4}
                u_zoom={1.2}
                u_blur_iterations={16} // Reduced from 16 for better performance
                // transparent={true}
                u_mouse_position={new THREE.Vector2(...mousePosition)}
                u_clear_radius={1}
                u_clear_edge_softness={0.05}
                u_clear_blur_reduction={1}

            />
        </mesh>
    )
}