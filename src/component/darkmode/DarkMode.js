import React from 'react'
import './ModeButton.css'
import { useTheme } from '../../services/context/darkmodeContext'
const DarkMode = () => {
    const {mode, handleModeButton } = useTheme();

    return (
        <div className="mode-container container">
            <div className={mode ? "btn-container" : "btn-container-dark"}>
                <button className={mode ? "mode-btn mode-btn-light" : "mode-btn "} onClick={handleModeButton}>light</button>
                <button className={mode ? "mode-btn" : "mode-btn  mode-btn-dark"} onClick={handleModeButton}>dark</button>
            </div>
        </div>
    )
}

export default DarkMode;
