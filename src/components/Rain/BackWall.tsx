import * as THREE from 'three'
import {useLoader} from "@react-three/fiber";
import CoMap from "../../assets/textures/wood_cabinet_worn_long_diff_1k.jpg"
import DsMap from "../../assets/textures/wood_cabinet_worn_long_disp_1k.jpg"
import NoMap from "../../assets/textures/wood_cabinet_worn_long_nor_gl_1k.jpg"
import RoMap from "../../assets/textures/wood_cabinet_worn_long_rough_1k.jpg"
import AoMap from "../../assets/textures/wood_cabinet_worn_long_ao_1k.jpg"


interface BackWallPropsType {
    position: [number, number, number] | THREE.Vector3
}

export const BackWall = ({
                             position
                         }: BackWallPropsType) => {
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

    return (
        <mesh
            position={position}
        >
            <planeGeometry
                args={[15,15]}
            />
            <meshStandardMaterial
                map={colorMap}
                displacementMap={displacementMap}
                normalMap={normalMap}
                roughnessMap={roughnessMap}
                aoMap={aoMap}
            />
        </mesh>
    )
}