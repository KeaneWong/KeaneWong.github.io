import {useContext} from 'react'
import {backgroundTextContext, BackgroundTextContextType} from "../contexts/BackgroundTextContext.tsx"

export const useBackgroundText = (): BackgroundTextContextType => {
    const {...props} = useContext(backgroundTextContext)
    return {...props}
}