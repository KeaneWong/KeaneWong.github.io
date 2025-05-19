import {extend} from '@react-three/fiber'
import {shaderMaterial} from '@react-three/drei';
import * as THREE from 'three'
import {VertexShader} from "./shaders/VertexShader.js"
import {FragmentShader} from "./shaders/FragmentShader.js"



const rainMaterial = shaderMaterial(
    {
        u_tex0: null, // Texture will be set after initialization
        u_time: 0,
        u_intensity: 0.7,
        u_speed: 0.25,
        u_brightness: 0.8,
        u_normal: 0.5,
        u_zoom: 0.2,
        u_blur_intensity: 0.5,
        u_blur_iterations: 16,
        u_panning: false,
        u_post_processing: true,
        u_lightning: false,
        u_texture_fill: true,
        u_resolution: new THREE.Vector2(1, 1), // Screen resolution
        u_tex0_resolution: new THREE.Vector2(1, 1), // Texture resolution
        u_plane_size: new THREE.Vector2(1, 1), // Plane geometry size
        u_world_scale: 1.0, // Scale factor for world space to shader space

        // Parameters for the clear spot effect
        u_mouse_position: new THREE.Vector2(0.5, 0.5),
        u_clear_radius: 0.15,
        u_clear_edge_softness: 0.05,
        u_clear_blur_reduction: 0.9
    },
      VertexShader,
     FragmentShader
)

// Create and extend our custom shader material
extend({ RainMaterial: rainMaterial })

export default rainMaterial;