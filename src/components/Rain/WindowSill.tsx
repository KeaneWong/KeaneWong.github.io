import {useEffect} from "react";
import * as THREE from "three";
import {useLoader} from "@react-three/fiber";

import CoMap from "../../assets/textures/wood_table_worn_diff_1k.jpg"
import DsMap from "../../assets/textures/wood_table_worn_disp_1k.jpg"
import NoMap from "../../assets/textures/wood_table_worn_nor_gl_1k.jpg"
import RoMap from "../../assets/textures/wood_table_worn_rough_1k.jpg"
import AoMap from "../../assets/textures/wood_table_worn_ao_1k.jpg"


interface WindowSillPropsType {
    windowDimensions: [number, number],
    windowPosition: [number, number, number],
}

export const WindowSill = ({
                               windowDimensions,
                               windowPosition
                           }: WindowSillPropsType) => {

    const [colorMap, displacementMap, normalMap, roughnessMap, aoMap] = useLoader(
        THREE.TextureLoader,
        [
            CoMap,
            DsMap,
            NoMap,
            RoMap,
            AoMap,
        ]
    )

    useEffect(() => {

    }, [windowDimensions]);
    const barThickness = 0.2
    const sideDimensions = [barThickness, windowDimensions[1], barThickness];
    return (
        <group
            position={windowPosition}
        >
            <mesh
                position={[
                    -(windowDimensions[0] / 2),
                    0,
                    0,
                ]}
            >
                <boxGeometry
                    args={sideDimensions}
                />
                <meshStandardMaterial
                    map={colorMap}
                    // displacementMap={displacementMap}
                    normalMap={normalMap}
                    roughnessMap={roughnessMap}
                    aoMap={aoMap}
                />
            </mesh>
            <mesh
                position={[
                    windowDimensions[0] / 2,
                    0,
                    0,
                ]}
            >
                <boxGeometry
                    args={sideDimensions}
                />
                <meshStandardMaterial
                    map={colorMap}
                    displacementMap={displacementMap}
                    normalMap={normalMap}
                    roughnessMap={roughnessMap}
                    aoMap={aoMap}

                />
            </mesh>
        </group>
    )
}