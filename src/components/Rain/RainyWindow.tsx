import * as THREE from 'three';
import
{
    useThree,
    useFrame,
    extend,
    Canvas

} from '@react-three/fiber'
import {PerspectiveCamera, useFBO, useTexture} from '@react-three/drei'
import {Scene, Texture, WebGLRenderTarget} from 'three';
import {useRef, useEffect, useState} from 'react'
import {Window} from "./Window.tsx"
import RainMaterial from "./RainMaterial.tsx"
import {WorldBehindWindow} from "../WorldBehindWindow.tsx";

extend({RainMaterial})

export interface RainyWindowPropsType {
    backgroundTexture: string;
}

const devicePixelRatio = window.devicePixelRatio || 1;


export const RainyWindow = (
    {
        backgroundTexture

    }: RainyWindowPropsType) => {

    const materialRef = useRef<THREE.ShaderMaterial>(null)
    const {size, viewport} = useThree()
    // const textureRef = useRef<WebGLRenderTarget>(null);
    const [subScene] = useState<Scene>(new Scene())
    // const [windowRenderTarget] = useState<WebGLRenderTarget>(null);
    const windowRenderTarget = useFBO();

    // const [uTexRes] = useState(new THREE.Vector2(1920,1200))
    // const [uRes] = useState(new THREE.Vector2())

    // Load texture using drei's useTexture hook
    const texture: Texture = useTexture(backgroundTexture)

    // Update resolution and time on each frame
    useFrame((state) => {
        if (materialRef.current) {
            // Update time uniform
            materialRef.current.uniforms.u_time.value = state.clock.getElapsedTime()

            // Update resolution when viewport changes
            materialRef.current.uniforms.u_resolution.value.set(
                size.width * devicePixelRatio,
                size.height * devicePixelRatio)

            // Update texture resolution when texture is loaded
            if (texture?.image) {
                materialRef.current.uniforms.u_tex0_resolution.value.set(
                    texture.image.width,
                    texture.image.height
                )
            }
        }
    })

    // useFrame(({gl, camera, scene}) => {
    //     gl.setRenderTarget(windowRenderTarget);
    //     gl.render(scene, camera);
    //     gl.setRenderTarget(null);
    // });


    // Set up texture when component mounts
    useEffect(() => {
        // if (materialRef.current && texture) {
        //     materialRef.current.uniforms.u_tex0.value = texture
        // }
        if (materialRef.current && windowRenderTarget) {
            materialRef.current.uniforms.u_tex0.value = windowRenderTarget.texture;
        } else {
            console.log("ERROR: Nullish values ", materialRef.current, windowRenderTarget)
        }
    }, [])


    return (
        <mesh>
            {/* Use a plane that fills the entire view */}
            <planeGeometry
                args={[viewport.width, viewport.height]}/>

                <WorldBehindWindow
                    windowRenderTarget={windowRenderTarget}
                    // textureRef={textureRef}
                />
            <rainMaterial
                ref={materialRef}
                u_intensity={0.5}
                u_speed={0.3}
                u_zoom={1.2}
                u_blur_iterations={16} // Reduced from 16 for better performance
                transparent={true}

            />
        </mesh>
    )
}