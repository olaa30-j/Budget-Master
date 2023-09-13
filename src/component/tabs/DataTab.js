import React from 'react';

const DataTab = ({activeTab, handleTabClick }) => {
    return (
        <div>
            <button
                className={`tab-btn ${activeTab === 'data' ? 'active' : ''}`}
                onClick={() => handleTabClick('data')}
            >
                Data
            </button>
        </div>
    );
};

export default DataTab;
