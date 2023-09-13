import React, { createContext, useState, useContext } from "react";

export const DarkModeContext = createContext();
export const useTheme = () => useContext(DarkModeContext);

export const DarkModeProvider = ({ children }) => {
    const [mode, setMode] = useState(true);

    const handleModeButton = () => {
        console.log(mode)
        setMode((prevMode) => !prevMode);
    };

    return (
        <DarkModeContext.Provider value={{ mode, handleModeButton }}>
            {children}
        </DarkModeContext.Provider>
    );
};
