import {useThree} from "@react-three/fiber";


export const DirectionLightWrapper = () => {

    const {clock} = useThree();

    const baseIntensity = 1.2
    const amplitude = 0.15
    const period = 10

    return (
        <directionalLight
            position={3, 4, 3}
            intensity={
            baseIntensity + amplitude * Math.sin(
                 clock.getElapsedTime() * period/ (2*Math.PI)
                )
            }

        />
    )
}