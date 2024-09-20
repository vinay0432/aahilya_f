import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom';
import { get } from '../../helper/helper_api';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { init } from 'aos';
import Loader from '../../Loader';
export default function Details() {
    const pramas = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    // console.log('detination location', location, pramas)
    const [proID, setProID] = useState(null);
    const [type, setType] = useState(null);
    const [experienceDetails, setExperienceDetails] = useState([]);
    const [itin, setItin] = useState(0);
    const [loader, setLoader] = useState(false);
    const swiperRef = useRef();
    const swiperRef1 = useRef();
    const swiperRef2 = useRef();
    useEffect(() => {
        // console.log('path on listing', location.pathname);
        let path = location.pathname.split("/");
        if (path.length > 0)
            setType(path[3].split('-').join(" "));
        if (path.length > 1)
            setProID(path[2]);

    }, [location?.pathname]);


    useEffect(() => {
        if (proID)
            getData();
    }, [proID])


    const getData = () => {
        setLoader(true);
        window.scroll(0, 0);
        get('/experience/detail?experienceId=' + proID).then((json) => {
           
            if (json?.statusCode == 200) {
                // console.log('destination detail', json);
                setLoader(false)
                setExperienceDetails(json?.data);
            }

        }).catch((err) => {
            console.log(err);
            setLoader(false)
        });
    }

    const toggleFunction = (index) => {
        // console.log('before set', index)
        setItin(index)
    }

    const openDetail = (item) => {

        const tempId = item?._id.slice(item?._id.length - 4, item?._id.length);
        navigate('/tour/' + tempId + "/" + (item?.name).split(" ").join("-").toLowerCase());
    }

    return (
        <>
        {
            loader && <Loader />
        }
            <div id="tg-wrapper" className="tg-wrapper tg-haslayout">

                <div className="tg-bannerholder tg_innerbanner">
                    <section className="tg-parallax tg-innerbanner">
                        <div className="tg-sectionspace inner_banner tg-haslayout" style={{ backgroundImage: `url(${experienceDetails?.banner})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }} >
                            <div className="container">
                                <div className="row">
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <h1>{experienceDetails?.name}</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>


                <main id="tg-main" className="tg-main tg-haslayout">

                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item active" aria-current="page"><Link to="/experience">Experience</Link></li>
                        <li className="breadcrumb-item active" style={{textTransform:'capitalize'}} aria-current="page">{type}</li>
                    </ol>
                </nav>
                    <section className="sec_overview sec_overview_expe pt-100 " id="about">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-10 col-mn p-0 m-0">
                                    <div className="tg-sectiontitle tg-sectiontitleleft just_">
                                        <h2>Description</h2>
                                        <img src={require('../../assets2/images/tile-heading-1.png')} />
                                    </div>
                                    <div className="d_detail">
                                        <div dangerouslySetInnerHTML={{ __html: experienceDetails?.desc }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="clothe_section pb-100  pt-30px">
                        <div className="container">
                            <div className="sec_title">
                                <h2>Discover Holidays:</h2>
                            </div>
                            {
                                experienceDetails?.tours?.map((item, index) => (
                                    <>
                                        {index % 2 ?
                                            <div className="row pt-50">
                                                <div className="col-md-8">
                                                    <div className="bg-txt">
                                                        <h2 className="et_main" onClick={() => openDetail(item)} style={{cursor:'pointer'}}>{item?.name}</h2>
                                                        <p>{item?.overview}</p>
                                                        <div className="known_more_box">
                                                            <button className="learn-more">
                                                                <span className="circle" aria-hidden="true">
                                                                    <span className="icon arrow"></span>
                                                                </span>
                                                                <a onClick={() => openDetail(item)} className="button-text">Know More</a>
                                                            </button>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="bg-one bg_one_exp">
                                                        <img src={item?.banner} onClick={() => openDetail(item)} style={{cursor:'pointer'}}/>
                                                    </div>
                                                </div>

                                            </div>
                                            :
                                            <div className="row pt-50 pt-5">
                                                <div className="col-md-4">
                                                    <div className="bg-one bg_one_exp">
                                                        <img src={item?.banner} onClick={() => openDetail(item)} style={{cursor:'pointer'}}/>
                                                    </div>
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="bg-txt">
                                                        <h2 className="et_main" onClick={() => openDetail(item)} style={{cursor:'pointer'}}>{item?.name}</h2>
                                                        <p>{item?.overview}</p>
                                                        <div className="known_more_box">
                                                            <button className="learn-more">
                                                                <span className="circle" aria-hidden="true">
                                                                    <span className="icon arrow"></span>
                                                                </span>
                                                                <a onClick={() => openDetail(item)} className="button-text">Know More</a>
                                                            </button>
                                                        </div>

                                                    </div>
                                                </div>

                                            </div>
                                        }
                                    </>
                                ))
                            }


                        </div>

                    </section>
                </main>

            </div>
        </>
    )
}
