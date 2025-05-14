import {useContext} from 'react'
import {shipControllerContext, ShipControllerContextType} from "../contexts/ShipControllerContext.tsx"

export const useShipController = (): ShipControllerContextType => {
    const {...props} = useContext(shipControllerContext)
    return {...props}
}