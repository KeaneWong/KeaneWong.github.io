import {extend} from '@react-three/fiber'
import {shaderMaterial} from '@react-three/drei';
import {FragmentShader} from "./shaders/FragmentShader.js"
import {VertexShader} from "./shaders/VertexShader.js"
import * as THREE from 'three'
import {VectorKeyframeTrack} from "three";


const RainMaterial = shaderMaterial(
    {
        u_tex0: null, // Texture will be set after initialization
        u_time: 0,
        u_intensity: 0.7,
        u_speed: 0.25,
        u_brightness: 0.8,
        u_normal: 0.5,
        u_zoom: 2.61,
        u_blur_intensity: 0.5,
        u_blur_iterations: 16,
        u_panning: false,
        u_post_processing: true,
        u_lightning: false,
        u_texture_fill: true,
        u_resolution: new THREE.Vector2(1, 1), // Will be updated in the component
        u_tex0_resolution: new THREE.Vector2(1, 1) // Will be updated in the component
    },
    VertexShader,
    FragmentShader,
)
// extend(RainMaterial)
export default RainMaterial;
