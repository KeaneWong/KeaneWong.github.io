import {PerspectiveCamera} from "@react-three/drei";
import {useThree} from "@react-three/fiber";


export const CameraWrapper = () => {
    const {viewport} = useThree()
    return (
        <PerspectiveCamera
            makeDefault
            position={[-2, 0, 5]}
            fov={45}
            aspect={viewport.width / viewport.height}
            near={0.1}
            // lookAt={[0, 0, 0]}

        />
    )
}