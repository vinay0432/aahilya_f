import React, { useEffect } from 'react'
import Mmenu from "mmenu-js";
import "mmenu-js/dist/mmenu.css";
import { get } from './helper/helper_api';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
let menuInit = false;
export default function MobileHeader(props) {
    const [destination, setDestination] = useState([]);
    const [tours, setTours] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const [home, setHome] = useState([]);
    const [hideMenu,setHideMenu] = useState()
    const navigate = useNavigate();
    useEffect(() => {
        // Init Mmenu (use of outside let because of
        // strict mode triggering twice)
        if (!menuInit) {
            menuInit = true;

            new Mmenu("#menu", {
                offCanvas: {
                    use: false
                },
                counters: {
                    add: true
                },
                setSelected: {
                    hover: true
                },
                navbars: [
                    {
                        position: "top",
                        content: ["searchfield"]
                    }
                ]
            });
        }
    }, []);


    useEffect(() => {
        window.scrollTo(0, 0);
        getData();
    }, []);

    const getData = async () => {

        get('/home/header').then((json) => {
            if (json?.statusCode == 200) {
                console.log('destination category mobile_hewader', json);
                if (props?.setHeaderData)
                    props?.setHeaderData(json?.data?.home);
                setDestination(json?.data?.desti);
                setTours(json?.data?.tours)
                setExperiences(json?.data?.exp)
                setHome(json?.data?.exp)
                // if (props?.setContis) {
                //   let arr = Object.assign([], json?.data?.destination);
                //   shuffle(arr);
                // }
                // setExperiences(json?.data?.experiences);
                // if (props?.setExperience)
                //   props?.setExperience(json?.data?.experiences);
                // setWhos(json?.data?.whos);
                // if (props?.setWhos)
                //   props?.setWhos(json?.data?.whos);
                // setMonths(json?.data?.months);
                // if (props?.setMonth)
                //   props?.setMonth(json?.data?.months);
            }

        }).catch((err) => {
            console.log(err);
        });


    }

    const hideMenuFunction = () =>{
        props?.setMobileMenu(false)
    }

    const destinationOpen = (item) => {

        const tempId = item?._id.slice(item?._id.length - 4, item?._id.length);
        navigate('/destinations/' + tempId + "/" + (item?.name).split(" ").join("-").toLowerCase());
    }
    const tourOpen = (item) => {

        const tempId = item?._id.slice(item?._id.length - 4, item?._id.length);
        navigate('/tour/' + tempId + "/" + (item?.name).split(" ").join("-").toLowerCase());
    }
    const experienceOpen = (item) => {

        const tempId = item?._id.slice(item?._id.length - 4, item?._id.length);
        navigate('/experience/' + tempId + "/" + (item?.name).split(" ").join("-").toLowerCase());
    }


    return (
        <nav id="menu">
            <ul>

                <li>
                    <Link to="/" onClick={hideMenuFunction}>Home</Link>
                </li>
                <li>
                    <span><Link to="/group-tours">Destinations</Link></span>
                    
                    <ul>
                        {
                            destination?.map((item, index) => (
                                <li key={index}><a onClick={() => destinationOpen(item)}>{item?.name}</a></li>
                            ))
                        }
                    </ul>
                </li>
                <li>
                    <span><Link to="/group-tours">Group Tours</Link></span>
                    <ul>
                        {
                            tours?.map((item, index) => (
                                <li key={index}><a onClick={() => tourOpen(item)}>{item?.name}</a></li>
                            ))
                        }
                    </ul>
                </li>
                <li>
                    <span><Link to='/experience'>Tailormade Holidays</Link></span>
                    <ul>

                        {
                            experiences?.map((item, index) => (
                                <li key={index}><a onClick={() => experienceOpen(item)}>{item?.name}</a></li>
                            ))
                        }
                    </ul>
                </li>
                <li>
                    <Link to='/blog'>Blogs</Link>
                </li>
                <li>
                    <Link to='/gallery'>Gallery</Link>
                </li>
                <li>
                    <span><Link to="/about">About Us</Link></span>
                    <ul>

                        <li>
                            <Link to='/testimonial'>Testimonials</Link>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>

    )
}
