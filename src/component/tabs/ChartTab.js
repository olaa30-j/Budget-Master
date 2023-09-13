import React from 'react'

const ChartTab = ({activeTab, handleTabClick }) => {
  return (
    <>
      <button className= {`tab-btn ${activeTab === 'chart' ? 'active' : ''}`} onClick={() => handleTabClick('chart')}>Chart</button>
    </>
  )
}

export default ChartTab;