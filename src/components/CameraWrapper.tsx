import {PerspectiveCamera} from "@react-three/drei";
import {useThree} from "@react-three/fiber";


export const CameraWrapper = () => {
    const {viewport} = useThree()
    return (
        <PerspectiveCamera
            makeDefault
            // position={[-1.8,0, 4]}
            position={[1, -0.3, 5]}
            fov={55}
            aspect={viewport.width / viewport.height}
            near={0.1}
            // lookAt={[0, 0, 0]}

        />
    )
}