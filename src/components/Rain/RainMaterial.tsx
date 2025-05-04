import {extend} from '@react-three/fiber'
import {shaderMaterial} from '@react-three/drei';
import {FragmentShader} from "./shaders/FragmentShader.js"
import {VertexShader} from "./shaders/VertexShader.js"
import * as THREE from 'three'


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
        u_tex0_resolution: new THREE.Vector2(1, 1), // Will be updated in the component

        // New parameters for the clear spot effect
        u_mouse_position: new THREE.Vector2(0.5, 0.5), // Mouse position in normalized coordinates
        u_clear_radius: 0.15,                          // Radius of the clear spot
        u_clear_edge_softness: 0.05,                   // Softness of the clear spot edge
        u_clear_blur_reduction: 0.9                    // How much to reduce blur in the clear area (0-1)
    },
     VertexShader,
     FragmentShader,
)
// extend(RainMaterial)
export default RainMaterial;