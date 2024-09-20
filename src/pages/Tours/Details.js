import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { get, post } from '../../helper/helper_api';
import QRCode from 'qrcode.react';
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";
import Form1 from '../Enquire/Form1';
import Loader from '../../Loader';
import { toast } from 'react-toastify';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
maptilersdk.config.apiKey = 'ylj3spoQ90gOThWG13lt';

export default function Detail(props) {
    const navigate = useNavigate();
    const pramas = useParams();
    const location = useLocation();
    // console.log('detination location', location, pramas)
    const [proID, setProID] = useState(null);
    const [type, setType] = useState(null);
    const [destinationDetails, setDestinationDetails] = useState({ maps: [] });
    const [itin, setItin] = useState(0);
    const [loader, setLoader] = useState(false);
    const swiperRef = useRef();
    const swiperRef1 = useRef();
    const swiperRef2 = useRef();
    const qrCodeRef = useRef();
    const [activeIti, setActiveIti] = useState(0);
    const [activeTab, setActiveTab] = useState("AtAGlance");
    const [currentY, setCurrentY] = useState(0);
    const [currentLY, setCurrentLY] = useState(0);
    const [stickyClass, setStickyClass] = useState("slideDown");
    const [mapLoaded, setMapLoaded] = useState(false);
    const [qrCodeModal, setQrCodeModal] = useState(false);
    useEffect(() => {
        // console.log('path on listing', location.pathname);
        let path = location.pathname.split("/");
        if (path.length > 0)
            setType(path[3].split("-").join(" "));
        if (path.length > 1)
            setProID(path[2]);
    }, [location?.pathname]);


    useEffect(() => {
        // console.log('proId',proID)
        if (proID)
            getData();
    }, [proID])


    const getData = () => {
        if (!loader) {
            setLoader(true);
            setDestinationDetails({ ...destinationDetails, maps: [] });
            get('/tour/detail?tourId=' + proID).then((json) => {
                window.scroll(0, 0);
                setLoader(false);
                if (json?.statusCode == 200) {
                    console.log('destination detail', json?.data);
                    setItin(0)
                    setDestinationDetails(json?.data);
                }
            }).catch((err) => {
                console.log(err);
                setLoader(false)
            });
        }
    }

    const toggleFunction = (index) => {
        // console.log('before set', index)
        setItin(index)
    }

    // console.log('init', itin)

    const openDetail = (item) => {

        const tempId = item?._id.slice(item?._id.length - 4, item?._id.length);
        navigate('/tour/' + tempId + "/" + (item?.name).split(" ").join("-").toLowerCase());
    }

    const compressId = (id) => {
        // console.log('compressing id', id);
        const temp = id?.slice(id.length - 4, id.length);
        return temp;
    }

    const parseName = (str) => {
        if (str)
            return str.split("-").join("").split(" ").join("-").toLowerCase();
        else
            return '';
    }

    const sendPdfToEmail = () => {
        let body = {
            email: 'abhisekgoldy14@gmail.com',
            tourId: destinationDetails?._id
        }
        post("/tour/pdf_download", body).then(res => {
            console.log('response from download pdf', res);
            if (res?.statusCode == 200) {
                toast.success(res?.message);
            }
            else {
                toast.error(res?.error);
            }
        }).catch(error => {
            toast.error('Something Went Wrong!');
            console.log('error while sending pdf to email', error);
        })
    }
    // const openDetails = (_id) => {

    //     const tempId = _id.slice(_id.length - 4, _id.length);
    //     navigate('/destinations/' + tempId + "/in-" + (item?.name).split(" ").join("-").toLowerCase() + '#faq' );
    //   }

    const handleScrollSrip = (tag) => {
        setActiveTab(tag);
        setTimeout(() => {
            console.log('current', window.scrollY);
            window.scrollTo({ left: 0, top: window.scrollY - 50, behavior: "smooth" });
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
        // console.log(windowHeight)
        if (windowHeight > 600)
            setCurrentY(windowHeight);
        // console.log('windowHeight', currentY, windowHeight);
    }

    useEffect(() => {
        window.addEventListener("scroll", stickNavbar);
    }, []);

    const printQRCode = () => {
        const canvas = qrCodeRef.current?.querySelector('canvas');
        if (canvas) {
            const url = canvas.toDataURL('image/png');
            const image = new Image();
            image.onload = function () {
                const printWindow = window.open('', '_blank');
                if (printWindow) {
                    printWindow.document.write('<img src="' + url + '" style="width:100%" />');
                    printWindow.document.close();
                    printWindow.print();
                }
            };
            image.src = url;
        }
    };


    return (
        <>
            {
                loader && <Loader />
            }
            <div id="tg-wrapper" className="tg-wrapper tg-haslayout">
                {/* <section className="tg-parallax tg-innerbanner tg_innerbanner">
                    <div className="tg-sectionspace inner_banner_new tg-haslayout" style={{ backgroundImage: `url(${destinationDetails?.images?.length > 0 && destinationDetails?.images[0]})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }} >
                        <div className="container">
                            <div className="row">
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <h1>{destinationDetails?.name}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </section> */}
                <div className="tg-bannerholder tg_innerbanner">
                    {/* <div className="tg-slidercontent">
                        <div className="container">
                            <div className="row">
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <h1>About {destinationDetails?.name}</h1>
                                    <a href={location.pathname+"#faq"}>open</a>
                                </div>
                            </div>
                        </div>
                    </div> */}
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
                        <div className='qr-container web-view'>
                            <div className='qr_box'>
                                <div ref={qrCodeRef} className='box_qr-one'>
                                    <QRCode value={"https://aahilyaholidays.com" + location.pathname} size={128} className='web_qr_code' />
                                    <QRCode value={"https://aahilyaholidays.com" + location.pathname} size={128} onClick={()=>setQrCodeModal(true)} className='mobile_qr_code' />
                                </div>
                                <div className='qr-action'>
                                    <div className='qr-action-btn' onClick={printQRCode}>
                                        <i className='fa fa-print' />
                                    </div>
                                    <div className='qr-action-btn'>
                                        <a href={`https://api.whatsapp.com/send?text=https://aahilyaholidays.com${location.pathname}`}>
                                            <i className='fa fa-whatsapp' />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <main id="tg-main" className="tg-main tg-haslayout container____">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item active" aria-current="page"><Link to="/group-tours">Tours</Link></li>
                            <li className="breadcrumb-item active" style={{ textTransform: 'capitalize' }} aria-current="page">{type}</li>
                        </ol>
                    </nav>
                    <div className={qrCodeModal == true ? 'qr-container mobile-view active':'qr-container mobile-view'}>
                        <button className='close_btn_qr' onClick={()=>setQrCodeModal(false)}>X</button>
                            <div>
                                <div ref={qrCodeRef}>
                                    <QRCode value={"https://aahilyaholidays.com" + location.pathname} size={250} />
                                </div>
                                <div className='qr-action'>
                                    <div className='qr-action-btn' onClick={printQRCode}>
                                        <i className='fa fa-print' />
                                    </div>
                                    <div className='qr-action-btn'>
                                        <a href={`https://api.whatsapp.com/send?text=https://aahilyaholidays.com${location.pathname}`}>
                                            <i className='fa fa-whatsapp' />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <section className={`tab_otions tab_otions_new dtr-sticky-tabs-nav animated ${stickyClass}`} style={{ top: props?.isHeader ? 0 : 0, backgroundColor: 'transparent' }}>
                        <ul className="dtr-sticky-tabs">
                            <li className="active">
                                <a href="#AtAGlance" onClick={() => handleScrollSrip('AtAGlance')} className={activeTab == 'AtAGlance' ? "active" : ''}>
                                    At A Glance
                                </a>
                            </li>
                            <li >
                                <a href="#About_The_Artist" onClick={() => handleScrollSrip('About_The_Artist')} className={activeTab == 'About_The_Artist' ? "active" : ''}>
                                    About The Artist
                                </a>
                            </li>
                            <li>
                                <a href="#Highlights_Of_The_Tour" onClick={() => handleScrollSrip('Highlights_Of_The_Tour')} className={activeTab == 'Highlights_Of_The_Tour' ? "active" : ''}>
                                    Highlights Of The Tour
                                </a>
                            </li>
                            <li>
                                <a href="#Tours_Name" onClick={() => handleScrollSrip('Tours_Name')} className={activeTab == 'Tours_Name' ? "active" : ''}>
                                    Itinerary
                                </a>
                            </li>
                            <li>
                                <a href="#Enquire_Now" onClick={() => handleScrollSrip('Enquire_Now')} className={activeTab == 'Enquire_Now' ? "active" : ''}>
                                    Enquire Now
                                </a>
                            </li>
                            <li>
                                <a href="#related_tours" onClick={() => handleScrollSrip('related_tours')} className={activeTab == 'related_tours' ? "active" : ''}>
                                    Related tours
                                </a>
                            </li>
                        </ul>
                    </section>
                    <section className='tg-innerbanner heading_section' id="AtAGlance">
                        <h1>{destinationDetails?.name}</h1>
                    </section>
                    <section className="glance_sec section_box section_box_padding_top" >
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="sec_title">
                                        <h2>At a Glance:</h2>
                                    </div>
                                    <div className="p_sec">
                                        <div dangerouslySetInnerHTML={{ __html: destinationDetails?.desc }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {destinationDetails?.experience && destinationDetails?.experience[0]?.name == 'Group Tour' &&
                        <>
                            {destinationDetails?.artistDesc &&
                                <section className="glance_sec bg-gray section_box" id="About_The_Artist">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-md-8">

                                                <div className="p_sec artist_section">
                                                    <div className="sec_title">
                                                        <h2>About the Artist</h2>
                                                    </div>
                                                    <div dangerouslySetInnerHTML={{ __html: destinationDetails?.artistDesc }}></div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="id_map mt-0" style={{ marginTop: 0 }}>
                                                    <img src={destinationDetails?.artistImage} />
                                                    <div className="artist_name_box">
                                                        <h5>{destinationDetails?.artistName}</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            }
                        </>
                    }
                    {destinationDetails?.highlightDesc &&
                        <section className="glance_sec section_box pb-0" id="Highlights_Of_The_Tour">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-8">

                                        <div className="p_sec artist_section">
                                            <div className="sec_title">
                                                <h2>Highlights of the tour</h2>
                                            </div>
                                            <div dangerouslySetInnerHTML={{ __html: destinationDetails?.highlightDesc }}></div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 Highlights_img">
                                        <img src={destinationDetails?.highlightImage} />

                                    </div>
                                </div>
                            </div>
                        </section>
                    }
                    <section className="tour_sec pt-100 pb-0 section_box pt-0" id="Tours_Name">
                        <div className="container" style={{ position: 'relative' }}>
                            <div className="row">
                                <div className="col-lg-12">
                                    {/* <div className=" sec_title_">
                                        <h2>
                                            {destinationDetails?.name}
                                        </h2>
                                        {destinationDetails?.pdf &&
                                            <div className="Download_it" style={{ cursor: 'pointer' }} onClick={() => sendPdfToEmail()}>
                                                <p>Download Itinerary</p><div id="play-video" className="print_ video_play_button"><i className="fa fa-print"></i></div>
                                            </div>
                                        }
                                    </div> */}
                                </div>
                                <div className="col-md-7">
                                    <div className=" sec_title_">
                                        <h2>
                                            {destinationDetails?.name}
                                        </h2>

                                    </div>

                                    <div className="tour_details">
                                        <ul className="u_details">
                                            {destinationDetails?.itin?.map((item, index) => (
                                                <li className="li_details" key={index}>
                                                    <p className="ms_d" onClick={() => setActiveIti(activeIti == index ? undefined : index)}>
                                                        <span>{item?.title}</span>
                                                        <i className="fa fa-chevron-down"></i>
                                                    </p>
                                                    <div className={`detail_section ${activeIti == index ? 'active' : ''}`}>
                                                        <div dangerouslySetInnerHTML={{ __html: item?.desc }}></div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>

                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className="row padding_20px_b">
                                        {destinationDetails?.experience && destinationDetails?.experience[0]?.name == 'Group Tour' &&
                                            <>
                                                <div className="col-xs-12">
                                                    <h4 className="tour_cost pt-0">Tour Cost</h4>
                                                </div>
                                                <div className="col-md-12">

                                                    <div className="table_h">
                                                        <table className="table table-bordered table-bordered-iten table_">
                                                            <thead className="thead-dark">
                                                                <tr>
                                                                    <th className='column-1' scope="col">DATE OF TRAVEL</th>
                                                                    <th scope="col">
                                                                        {destinationDetails?.travelDate}
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    destinationDetails?.tourPoint?.map((item, index) => (

                                                                        <tr key={index}>
                                                                            <td>{item?.about}</td>
                                                                            <td>{item?.condition}</td>
                                                                        </tr>

                                                                    ))
                                                                }
                                                            </tbody>
                                                        </table>
                                                        <p className="p-int">
                                                            *International flights are not included in the above cost.
                                                        </p>
                                                    </div>
                                                </div>
                                            </>
                                        }
                                        <div className="col-md-12">
                                            <div className="book_now_box">
                                                <Link to="/booknow" state={{ id: destinationDetails?._id }} className="book_now">Book Now</Link>
                                            </div>
                                        </div>
                                        <div className="col-xs-12">
                                            <div className="book_now_content">

                                                Book this holiday at your choice of dates.
                                                <Link to={'/contact-us'}>
                                                    Contact us
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="map_box" style={{ width: '100%' }}>
                                            {/* {console.log('destinationDetails',destinationDetails)} */}
                                            <img src={destinationDetails?.mapImage} />
                                            {/* <iframe src="https://www.google.com/maps/embed?pb=!1m46!1m12!1m3!1d1674223.9540060742!2d76.39116488704092!3d28.175005744093056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m31!3e0!4m5!1s0x390d19d582e38859%3A0x2cf5fe8e5c64b1e!2sGurgaon%2C%20Haryana!3m2!1d28.4594965!2d77.0266383!4m5!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sDelhi!3m2!1d28.7040592!2d77.10249019999999!4m5!1s0x390ce5a43173357b%3A0x37ffce30c87cc03f!2sNoida%2C%20Uttar%20Pradesh!3m2!1d28.5355161!2d77.3910265!4m5!1s0x390cdc15f5a424b1%3A0xe4f50576c850e0f2!2sFaridabad%2C%20Haryana!3m2!1d28.408912299999997!2d77.3177894!4m5!1s0x397371163d4d5205%3A0x4273a09defe10ea5!2sMathura%2C%20Uttar%20Pradesh!3m2!1d27.4924134!2d77.673673!5e0!3m2!1sen!2sin!4v1684578878681!5m2!1sen!2sin" width="100%" height="350" style={{ border: 0 }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="form_second section_box section_box_fomt_bottom" >
                        <Form1 />
                    </div>
                    <section className="tour_sec pt-30px section_box" id="related_tours">
                        <div className="container Testimonials_section_it" style={{ position: 'relative' }}>
                            <div className="sec_title">
                                <h2>Related Tours</h2>
                            </div>
                            <div className="row tg-populartoursslider tg-populartoursslider-tour tg-populartours" >

                                <div className="col-md-6 col-sm-12">

                                    <Swiper
                                        spaceBetween={30}
                                        centeredSlides={true}
                                        autoplay={{
                                            delay: 2500,
                                            disableOnInteraction: false,
                                        }}
                                        pagination={{
                                            clickable: true,
                                        }}
                                        navigation={false}
                                        modules={[Autoplay]}
                                        className="mySwiper"
                                    >
                                        {destinationDetails?.releted?.map((item, index) => (
                                            <>

                                                <SwiperSlide style={{ width: '100%' }} key={index}>
                                                    <Link to={`/tour/${compressId(item._id)}/${parseName(item?.name)}`} onClick={() => openDetail(item)}>
                                                        <div className="property_box">
                                                            <img src={item?.banner} alt="" />
                                                            <div className="box_content">
                                                                <h5>{item?.name}</h5>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </SwiperSlide>


                                            </>
                                        ))}
                                    </Swiper>
                                    {/* <div className="row"> */}
                                    {/* {destinationDetails?.releted?.map((item, index) => (
                                            <div className="col-lg-6 col-md-6 mb-3">
                                                
                                            </div>
                                        ))} */}
                                    {/* </div> */}
                                </div>
                                {destinationDetails &&
                                    <div className="col-md-6 col-sm-12" >
                                        <div className="faq_section_new">
                                            <Link to={`/destinations/${compressId(destinationDetails?.destinationId)}/${parseName(destinationDetails?.desti ? destinationDetails?.desti[0]?.name : "")}/faq`}>
                                                <img src={require('../../assets2/images/faqs.jpg')} alt='faqs' />
                                                <h2>FAQ's</h2>
                                            </Link>
                                        </div>
                                        {/* <div className="row" style={{ height: '100%', marginLeft: 0, marginRight: 0 }}>
                                            <div className="col-lg-12  mb-3" style={{ height: '100%', paddingLeft: 0, paddingRight: 0 }}>
                                                
                                            </div>
                                        </div> */}
                                    </div>
                                }
                            </div>
                        </div>
                    </section>
                </main>


            </div>
        </>
    )
}
