import {
    Context,
    createContext,
    ReactNode,
    useMemo,
    useState,
    Dispatch,
    SetStateAction,
} from "react";
import * as THREE from "three";

interface WeatherControllerContextType {
    defaultRainProps: RainyWindowPropsType,
    setRainProps: Dispatch<SetStateAction<RainyWindowPropsType>>,
    rainProps: RainyWindowPropsType,
}

interface RainyWindowPropsType  {
    u_intensity: number;
    u_speed: number;
    u_zoom: number;
    u_blur_intensity: number;
    u_blur_iterations: number;
    // u_mouse_position={new THREE.Vector2(...mousePosition)}
    u_clear_radius: number
    u_brightness: number
    u_clear_edge_softness: number
    u_clear_blur_reduction: number;
    u_lightning: boolean;
}

export function isTouchDevice() {
    return (('ontouchstart' in window) ||
        (navigator?.maxTouchPoints > 0) ||
        (navigator?.msMaxTouchPoints > 0));
}


export const defaultRainProps = {
    u_intensity: 0.7,
    u_speed: 0.3,
    u_zoom: 0.12,
    u_blur_intensity: 0.5,
    u_blur_iterations: 12,
    // u_mouse_position={new THREE.Vector2(...mousePosition)}
    u_clear_radius: isTouchDevice() ? 1 : .35,
    u_brightness: 0.7,
    u_clear_edge_softness: 0.05,
    u_clear_blur_reduction:1,
    u_lightning: true,
}

export const weatherControllerContextType: Context<WeatherControllerContextType> = createContext(null);

export const WeatherContextProvider = ({children}: {
    children: ReactNode;
}) => {
    const [rainProps, setRainProps] = useState<RainyWindowPropsType>(defaultRainProps)
    return (
        <weatherControllerContextType.Provider
            value={useMemo(() => ({
                defaultRainProps: defaultRainProps,
                rainProps: rainProps,
                setRainProps: setRainProps,
                
            }), [defaultRainProps, rainProps, setRainProps])}
        >
            {children}
        </weatherControllerContextType.Provider>
    )
}