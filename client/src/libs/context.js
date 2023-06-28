import { useContext, createContext } from "react";

// Create empty context
const AppContext = createContext(null)

// Hook to get our data stored in context
export const useAppContext = () => {
    useContext(AppContext)
}

export default AppContext