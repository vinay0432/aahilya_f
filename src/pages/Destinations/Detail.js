import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom';
import { get } from '../../helper/helper_api';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Form1 from '../Enquire/Form1';
import Loader from '../../Loader';
import 'react-sticky-header/styles.css';
import StickyHeader from 'react-sticky-header';

export default function Detail(props) {
    const pramas = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    // console.log('detination location', location, pramas)
    const [proID, setProID] = useState(null);
    const [type, setType] = useState(null);
    const [destinationDetails, setDestinationDetails] = useState([]);
    const [loader, setLoader] = useState(false);
    const swiperRef = useRef();
    const swiperRef1 = useRef();
    const swiperRef2 = useRef();
    const [activeFaq, setActiveFaq] = useState(undefined);
    const [activeTab, setActiveTab] = useState("About");
    const [currentY, setCurrentY] = useState(0);
    const [currentLY, setCurrentLY] = useState(0);
    const [stickyClass, setStickyClass] = useState("slideDown");
    useEffect(() => {
        console.log('path on listing', location.pathname);
        let path = location.pathname.split("/");
        if (path.length > 0)
            setType(path[3]);
        if (path.length > 1)
            setProID(path[2]);
    }, [location?.pathname]);

    useEffect(() => {
        if (proID)
            getData();
    }, [proID])

    const getData = () => {
        setLoader(true)
        window.scroll(0, 0);
        get('/destination/detail?destinationId=' + proID).then((json) => {
            if (json?.statusCode == 200) {
                // console.log('destination detail', json);
                console.log('pathname on india', location.pathname, location.pathname.includes("faq"))
                setLoader(false)
                setDestinationDetails(json?.data);
                if (location.pathname.includes("faq"))
                document.querySelector(`#faq`).scrollIntoView();
            }
        }).catch((err) => {
            console.log(err);
            setLoader(false)
        });
    }

    const handleScrollSrip=(tag)=>{
        setActiveTab(tag);
        setTimeout(()=>{
            console.log('current', window.scrollY);
            window.scrollTo({left:0, top:window.scrollY-50, behavior: "smooth"});
        }, 50);
    }


        
    useEffect(() => {
        if (currentLY < currentY) {
          if (props?.setIsHeader)
            props?.setIsHeader(false);
          setCurrentLY(currentY);
          setStickyClass('slideUp');
        } else {
          if (props?.setIsHeader)
            props?.setIsHeader(true);
          setStickyClass('slideDown');
          setCurrentLY(currentY);
        }
        // console.log('current height', currentY, currentLY);
      }, [currentY]);

  const stickNavbar = () => {
    let windowHeight = window.scrollY;
    if(windowHeight > 500)
    setCurrentY(windowHeight);
    // console.log('windowHeight', currentY, windowHeight);
  }

  useEffect(() => {
    window.addEventListener("scroll", stickNavbar);
  }, []);

    return (
        <>
            {
                loader && <Loader />
            }
            <div id="tg-wrapper" className="tg-wrapper tg-haslayout">
                <div className="tg-bannerholder tg_innerbanner">
                    <div className="tg-slidercontent">
                        <div className="container">
                            <div className="row">
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <h1>About {destinationDetails?.name}</h1>
                                    {/* <a href={location.pathname+"#faq"}>open</a> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="tg-homeslider" className="tg-homeslider  inner_slider_section owl-carousel tg-haslayout">
                        <Swiper
                            spaceBetween={30}
                            centeredSlides={true}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: true,
                            }}
                            pagination={{
                                clickable: true,
                            }}
                            LazyLoadImage
                            onBeforeInit={(swiper) => {
                                swiperRef.current = swiper;
                            }}
                            modules={[Autoplay, Pagination, Navigation]}
                            className="mySwiper banner_slide "
                        >
                            {destinationDetails?.images?.map((item, index) => (
                                <SwiperSlide style={{ cursor: 'pointer' }} key={index}>
                                    <figure className="item inner_slider" data-vide-bg=""
                                        data-vide-options="position: 0% 50%">
                                        <img src={item} alt="" />
                                    </figure>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                    </div>
                </div>

                <main id="tg-main" className="tg-main tg-haslayout">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/">Home</Link>
                            </li>
                            <li className="breadcrumb-item">
                                <Link to="/top-destinations">Destinations</Link>
                            </li>
                            <li className="breadcrumb-item active" style={{textTransform:'capitalize'}} aria-current="page">
                                {type}
                            </li>
                        </ol>
                    </nav>

                    <section className={`tab_otions tab_otions_new dtr-sticky-tabs-nav animated ${stickyClass}`} style={{ top: props?.isHeader ? 0 : 0 }}>
                        <ul className="dtr-sticky-tabs">
                            <li className="active">
                                <a href="#about" className={activeTab =='About' ? "active" : ''}>
                                    About
                                </a>
                            </li>
                            {
                                destinationDetails?.tag?.map((item, index) => (
                                    <li key={index} onClick={()=>handleScrollSrip(item?.tagName)}>
                                        <a href={'#' + item?.tagName} className={activeTab==item?.tagName ? 'active' : ''}>
                                            {item?.tagName}
                                        </a>
                                    </li>
                                ))
                            }


                        </ul>
                    </section>

                    <section className="sec_overview pt-100 pb-100 section_box" id="about">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-10 col-mn">
                                    <div className="tg-sectiontitle tg-sectiontitleleft just_">
                                        <h2>About {destinationDetails?.name}</h2>
                                        <img src="" />
                                    </div>
                                    <div className="d_detail">
                                        <div dangerouslySetInnerHTML={{ __html: destinationDetails?.desc }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {
                        destinationDetails?.tag?.map((item, index) => (
                            <section className="sec_culture section_box" id={item?.tagName}>
                                {index % 2 ?
                                    <div className="container-fluid">
                                        <div className="row mobile_view_view">
                                            <div className="img_sec img_sec_new col-lg-6 p-0">
                                                <div className="">
                                                    <img src={item?.image} />
                                                </div>
                                            </div>
                                            <div className="con_sec col-lg-6">
                                                <div className="sm_sc padding_20px">
                                                    <div className="sec_title">
                                                        <h2>{item?.tagName}</h2>
                                                    </div>
                                                    <div className="right_cont">
                                                        <div className="r_cont">
                                                            <div dangerouslySetInnerHTML={{ __html: item?.desc }}></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className="container-fluid">
                                        <div className="row ">
                                            <div className="con_sec col-lg-6">
                                                <div className="sm_sc padding_20px">
                                                    <div className="sec_title">
                                                        <h2>{item?.tagName}</h2>
                                                    </div>
                                                    <div className="right_cont">
                                                        <div className="r_cont">
                                                            <div dangerouslySetInnerHTML={{ __html: item?.desc }}></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="img_sec img_sec_new col-lg-6 p-0">
                                                <div className="">
                                                    <img src={item?.image} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </section>
                        ))
                    }

                    <section className="faq_section section_box" id='faq'>
                        <div className="accordion arrows">
                            <div className="sec_title">
                                <h2>FAQ's</h2>
                            </div>
                            {
                                destinationDetails?.faq?.map((item, index) => (
                                    <>
                                        <input type="radio" name="accordion" id={item?._id} />
                                        <section key={index} className={`box ${item?._id == activeFaq ? "active" : ""}`} onClick={() => setActiveFaq(activeFaq == item?._id ? undefined : item?._id)}>
                                            <label className="box-title" forHtml={item?._id}>
                                                {item?.question}
                                            </label>
                                            <label className="box-close" forHtml="acc-close"></label>
                                            <div className={`box-content ${item?._id == activeFaq ? "active" : ""}`}>
                                                {item?.answer}
                                            </div>
                                        </section>
                                    </>
                                ))}

                            <input type="radio" name="accordion" id="acc-close" />
                        </div>
                    </section>

                    <div className="form_second form_second_two section_box">
                        <Form1 />
                    </div>

                </main>



            </div>
        </>
    )
}
