import React, { useState, useEffect } from 'react'
import Header from '../Header';
import Footer from '../Footer';
import Home from '../Home';

function Dashboard(props) {
    const [popular, setPopular] = useState([]);
    const [ads, setAds] = useState([]);
    const [contis, setContis] = useState([]);
    const [experience, setExperience] = useState([]);
    const [month, setMonth] = useState([]);
    const [whos, setWhos] = useState([]);
    const [loader, setLoader] = useState(true);

    console.log('props on dashboard', props?.component);

    return (
        <div>
            <Header setContis={setContis} setExperience={setExperience} setMonth={setMonth} setWhos={setWhos} />
            <Home />
            <Footer contis={contis} experience={experience} month={month} />
        </div>
    )
}

export default Dashboard;