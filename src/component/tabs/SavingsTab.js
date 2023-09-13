import React from 'react'

const SavingsTab = ({activeTab, handleTabClick}) => {
    return (
        <>
            <button
            className= {`tab-btn ${activeTab === 'savings' ? 'active' : ''}`} 
            onClick={() => handleTabClick('savings')}>Savings</button>
        </>
    )
}

export default SavingsTab;