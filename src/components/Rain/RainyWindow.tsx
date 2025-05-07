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


export interface RainyWindowPropsType {
    worldScale?: number
}


export const RainyWindow = (
    {
        worldScale = 1.0
    }: RainyWindowPropsType) => {
    extend({RainMaterial})


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

        }

    })

    const width = 4
    const height = 2

    // Update resolution when canvas is resized
    useEffect(() => {

        if (materialRef.current) {

            if (windowRenderTarget) {
                // windowRenderTarget.texture.wrapT = windowRenderTarget.texture.wrapS = THREE.RepeatWrapping

                materialRef.current.uniforms.u_tex0.value = windowRenderTarget.texture;
                materialRef.current.uniforms.u_tex0_resolution.value.set(
                    windowRenderTarget.texture.image.width,
                    windowRenderTarget.texture.image.height,
                )
                // Set the plane size - this is the key addition
            }
            // materialRef.current.uniforms.u_resolution.value.set(size.width, size.height)
            materialRef.current.uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight)

            materialRef.current.uniforms.u_plane_size.value.set(width, height)


        } else {
            console.log("ERROR: Nullish values ", materialRef.current, windowRenderTarget)
        }

    }, [size, width, height, worldScale])

    // Load texture using drei's useTexture hook


    return (
        <mesh
        >
            {/* Use a plane that fills the entire view */}
            <planeGeometry
                args={[width, height]}


            />
            <WindowView
                windowRenderTarget={windowRenderTarget}
                // textureRef={textureRef}
            />
            <rainMaterial
                ref={materialRef}
                u_intensity={0.7}
                u_speed={0.3}
                u_zoom={0.05}
                u_blur_intensity={0.5}
                u_blur_iterations={12}
                u_mouse_position={new THREE.Vector2(...mousePosition)}
                u_clear_radius={.25}
                u_brightness={0.8}
                u_clear_edge_softness={0.05}
                u_clear_blur_reduction={1}
            />
        </mesh>
    )
}