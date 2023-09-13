import React, { useEffect, useState } from 'react'
import Header from '../component/layout/header/Header';
import Cards from '../component/cards/Cards';
import './MainLayout.css';


const MainLayout = (props) => {
    const maxScale = 1;
    const [scrollY, setScrollY] = useState(0.9);

    const handleScroll = () => {
        const newScale = 0.9 + window.scrollY * 0.001;
        setScrollY(Math.min(newScale, maxScale));
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            // Remove the scroll event listener when the component unmounts
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className='container parallax-container'>
            <section className="section" style={{ transform: `scale(${scrollY})` }}>
                <Header></Header>
                <Cards></Cards>
                <main>
                    {props.childern}
                </main>
            </section>
        </div>
    )
}

export default MainLayout