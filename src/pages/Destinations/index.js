import React, { useEffect, useState } from 'react'
import { useLocation, useParams, useNavigate, Link } from 'react-router-dom';
import { get } from '../../helper/helper_api';
import Loader from '../../Loader';

export default function Destination() {
    const location = useLocation();
    const navigate = useNavigate();
    // console.log('detination location',location)

    const [destination, setDestination] = useState([]);
    const [loader, setLoader] = useState(true);
    useEffect(() => {
        window.scroll(0, 0);
        destinationList();
    }, [])
    const destinationList = () => {
        setLoader(true)
        get('/destination/list').then((json) => {
            setLoader(false);
            if (json?.statusCode == 200) {
                //   console.log('destination category', json);
                setDestination(json?.data);
            }
        }).catch((err) => {
            console.log(err);
            setLoader(false)
        });
    }

    const openDetail = (item) => {

        const tempId = item?._id.slice(item?._id.length - 4, item?._id.length);
        navigate('/destinations/' + tempId + "/in-" + (item?.name).split(" ").join("-").toLowerCase());
    }

    // console.log('image',destination[0]?.images[0])

    return (
        <>
            {
                loader && <Loader />
            }
            <div id="tg-wrapper" className="tg-wrapper tg-haslayout">


                <section className="tg-parallax tg-innerbanner tg_innerbanner">
                    <div className="tg-sectionspace tg-haslayout inner_banner yoga_ayurveda" style={{ backgroundImage: `url(${destination[0]?.images[0]})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <h1>Destinations</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <main id="tg-main" className="tg-main tg-haslayout container____">

                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Destinations</li>
                        </ol>
                    </nav>

                    <section className="tour_sec  pt-30px">
                        <div className="container Testimonials_section Testimonials_section_detination" style={{ position: 'relative' }}>
                            <div className="row">
                                {
                                    destination?.map((item, index) => (

                                        <div className="col-lg-4 col-md-6" key={index}>
                                            <figure className="snip1208">
                                                <img src={item?.images[0]}
                                                    alt="" onClick={() => openDetail(item)} style={{cursor:'pointer'}}/>
                                                <figcaption>
                                                    <h3>{item?.name}</h3>
                                                    <br />
                                                    <a onClick={() => openDetail(item)}>Read More</a>
                                                </figcaption>
                                            </figure>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </section>

                </main>



            </div>
        </>
    )
}
