import React, { useState, useEffect} from 'react'
import SavingsTab from './SavingsTab'
import DataTab from './DataTab'
import ChartTab from './ChartTab'
import Content from '../content/Content'
import Charts from '../budget/Charts'
import SavingsCard from '../budget/SavingsCard'
import './tabs.css'

const AllTabs = () => {
    const [activeTab, setActiveTab] = useState('data');


    const handleTabClick = (tab) => {
        setActiveTab(tab);
    }

    // create a parallax section
    const maxScale = 1;
    const [scrollY, setScrollY] = useState(0.7);

    const handleScroll = () => {
        const newScale = 0.7 + window.scrollY * 0.001;
        setScrollY(Math.min(newScale, maxScale));
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className='parallax-container-tabs'>
            <section className='all-tabs container section-tabs' style={{ transform: `scale(${scrollY})` }}>
                <DataTab handleTabClick={handleTabClick} activeTab={activeTab}>
                </DataTab>

                <ChartTab handleTabClick={handleTabClick} activeTab={activeTab}>
                </ChartTab>

                <SavingsTab handleTabClick={handleTabClick} activeTab={activeTab}>
                </SavingsTab>
            </section>
            <div className='content-container parallax-container-content '>
                {activeTab === 'data' && <Content />}
            </div>

            <div>
                {activeTab === 'chart' && <Charts/>}
            </div>

            <div>
                {activeTab === 'savings' && <SavingsCard/>}
            </div>

        </div>
    )
}

export default AllTabs