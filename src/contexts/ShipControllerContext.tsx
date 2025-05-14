import {
    createContext,
    useMemo,
    ReactNode,
    useState,
    Context,
    Dispatch,
    SetStateAction,
} from 'react';

export type ShipControllerContextType = {
    shipTargetPosition: Position,
    setShipTargetPosition: Dispatch<SetStateAction<ShipControllerContextType>>;
}

export const shipControllerContext: Context<ShipControllerContextType> = createContext(null);

export type Position = [number, number, number]

export const ShipControllerProvider = ({children}: {
    children: ReactNode;
}) => {
    const [shipTargetPosition, setShipTargetPosition] = useState<Position>([2, 1, 1]);

    return (
        <shipControllerContext.Provider
            value={useMemo(() => ({
                shipTargetPosition,
                setShipTargetPosition
            }), [
                shipTargetPosition,
                setShipTargetPosition
            ])}
        >
            {children}
        </shipControllerContext.Provider>
    )
}
