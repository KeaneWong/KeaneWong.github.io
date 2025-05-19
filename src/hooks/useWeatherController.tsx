import {useContext} from "react";
import {weatherControllerContextType} from "../contexts/WeatherControllerContext.tsx";

export const useWeatherController = () => {
    const {...props} = useContext(weatherControllerContextType)
    return {...props}
}