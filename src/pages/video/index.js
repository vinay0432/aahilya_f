import React, { useEffect, useState } from 'react'
import { get } from '../../helper/helper_api';
import Loader from '../../Loader';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Video() {
    const [gallery, setGallery] = useState([]);
    const [loader, setLoader] = useState(false);
    const [show, setShow] = useState(false);
    const [currentUrl, setCurrentUrl] = useState("");
    const handleClose = () => setShow(false);

    useEffect(() => {
        window.scroll(0, 0);
        destinationList();
    }, []);

    const destinationList = () => {
        setLoader(true);
        get('/testi/list_user').then((json) => {
            // setLoader(false);
            if (json?.statusCode == 200) {
                //   console.log('destination category', json);
                setGallery(json?.data?.videoTesti);
            }
        }).catch((err) => {
            setLoader(false);
            console.log(err);
        });
    }

    const getVideoUrl = (video) => {
        console.log(video.split("/")[video.split("/")?.length - 1]);
        let videoId = video.split("/")[video.split("/")?.length - 1];
        return "https://www.youtube.com/embed/" + videoId;
    }

    const handleShow = (video) => {
        setCurrentUrl(getVideoUrl(video));
        setShow(true);
    }
    // console.log('gallery',gallery)
    return (
        <>
            {
                loader && <Loader />
            }
            <Modal show={show}
                centered
                className='video_modal' onHide={handleClose}>
                <Modal.Body className='modal_body_popup'>
                    <button className='close_btn' onClick={handleClose}>
                        <img src={require('../../../src/assets2/images/close.png')} alt="close.png" />
                    </button>
                    <div className='iframe_box'>
                        <iframe style={{ width: '100%' }} src={currentUrl} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    </div>
                </Modal.Body>
            </Modal>
            <div id="tg-wrapper" className="tg-wrapper tg-haslayout">
                <section className="tg-parallax tg-innerbanner tg_innerbanner">
                    <div className="tg-sectionspace tg-haslayout golden_t_new" style={{ backgroundImage: `url(https://eeasy.s3.ap-south-1.amazonaws.com/aahilya/Destination/1684143545973.webp)`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <h1>Hear From Our Guests</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <main id="tg-main" className="tg-main tg-haslayout container____">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item"><Link to="/about">About us</Link></li>
                            <li className="breadcrumb-item" aria-current="page">Hear From Our Guests</li>
                        </ol>
                    </nav>
                    <section id="portfolio-masonry" className="portfolio portfolio-masonry masonry-spaced
                portfolio-4 col portfolio-animation pb-100 pt-100">
                        <div className="container portfolio-filter">
                            <div id="portfolio-all" className="row">
                                {gallery?.map((item, index) => (
                                    <div onClick={() => handleShow(item?.video)} style={{ cursor: 'pointer' }} className="col-lg-3 col-md-4 col-sm-6 portfolio-item filter-Mobile" key={index}>
                                        <div className="portfolio-img" onClick={() => { }}>
                                            {/* <img src={item?.image} alt="praarthana" /> */}
                                            {/* <div className='iframe_box'> */}
                                            <iframe style={{ width: '100%', pointerEvents: 'none' }} onLoad={()=>setLoader(false)} src={getVideoUrl(item?.video)} title="YouTube video player" frameborder="0"></iframe>
                                            {/* </div> */}
                                        </div>
                                    </div>
                                ))
                                }
                            </div>
                        </div>
                    </section>
                    {/* <div className="form_second footer_form_contact">
                    </div> */}
                </main>
            </div>
        </>
    )
}

export default Video;
