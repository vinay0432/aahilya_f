import React, { useEffect, useState } from 'react'
import { get, post } from '../../helper/helper_api';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Loader from '../../Loader';

function Tour() {
    const location = useLocation();
    const navigate = useNavigate();
    // console.log('detination location',location)
    const [exp, setExp] = useState([]);
    const [tour, setTour] = useState([]);
    const [loader, setLoader] = useState(false);
    const [loaderMore, setLoaderMore] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [currentPage, tour]);

    useEffect(() => {
        window.scroll(0, 0);
        destinationList(0);
    }, []);

    const destinationList = (current) => {
        if (!loaderMore) {
            setLoaderMore(true);
            post('/tour/group/list', { currentPage: current == 0 ? 0 : currentPage }).then((json) => {
                if (json?.statusCode == 200) {
                    //   console.log('destination category', json);
                    let temp = current == 0 ? [] : Object.assign([], tour);
                    setExp(json?.data?.exp[0]);
                    setTotalPage(json?.data?.totalPage);
                    setTour([...tour, ...json?.data?.tours]);
                    setCurrentPage(json?.data?.currentPage + 1);
                    setLoader(false);
                    setLoaderMore(false);
                }
            }).catch((err) => {
                console.log(err);
                setLoader(false)
                setLoaderMore(false)
            });
        }
    }

    const openDetail = (item) => {
        const tempId = item?._id.slice(item?._id.length - 4, item?._id.length);
        navigate('/tour/' + tempId + "/" + (item?.name).split(" ").join("-").toLowerCase());
    }


    const handleScroll = () => {
        const currentPosition = window.scrollY;
        let divHeight = document.getElementById("scrollableView")?.scrollHeight;
        console.log("scroll", divHeight, window?.scrollY);
        if (window?.scrollY > (divHeight - 271))
            if (totalPage > currentPage)
                destinationList();
    }

    return (
        <>
            {
                loader && <Loader />
            }
            <div id="tg-wrapper" className="tg-wrapper tg-haslayout">
                <section className="tg-parallax tg-innerbanner tg_innerbanner">
                    <div className="tg-sectionspace tg-haslayout inner_banner yoga_ayurveda" style={{ backgroundImage: `url(${exp?.banner})` }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <h1>{exp?.name}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <main id="tg-main" className="tg-main tg-haslayout container____">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Group Tours</li>
                        </ol>
                    </nav>
                    {/* <section className='tg-innerbanner heading_section heading_section_g' id="AtAGlance">
                    <h1>{exp?.name}</h1>
                    </section> */}
                    <section className="tour_sec pt_0_top">
                        <div className="container container_tour Testimonials_section Testimonials_section_new_1" style={{ position: 'relative' }} id="scrollableView">
                            <div className="row tg-populartoursslider tg-populartoursslider-tour tg-populartours">
                                {tour?.map((item, index) => (
                                    <div key={index} className="col-lg-4 col-md-6 mb-3" onClick={() => openDetail(item)}>
                                        <div className="item tg-populartour">
                                            <figure>
                                                <a>
                                                    <img
                                                        src={item?.banner}
                                                        alt={item?.imageTitle}
                                                    />
                                                </a>
                                                {/* <!-- <span className="tg-descount">25% Off</span> --> */}
                                            </figure>
                                            <div className="tg-populartourcontent tg_populartourcontent_new">
                                                <div className="tg-populartourtitle">
                                                    <h3><a>
                                                        {item?.name}
                                                     {/* with {item?.artistName} */}
                                                     </a></h3>
                                                </div>
                                                <div className="tg-description">
                                                    <p>{item?.overview?.length > 100 ? item?.overview?.substring(0, 100) + "..." : item?.overview}</p>
                                                </div>
                                                <div className="tg-populartourfoot">
                                                    <div className="tg-durationrating">
                                                        <span className="tg-tourduration">{item?.itin?.length} Days</span>
                                                        <span className="tg-stars"><span></span></span>
                                                        <em>(5 Review)</em>
                                                        <em style={{ marginTop: '4px', textAlign: 'left' }}>{item?.travelDate?.map((item1, index) => (<p style={{ fontSize: '15px', marginTop: '2px', marginBottom: 0 }}>{item1}</p>))}</em>
                                                        {/* <em style={{ fontSize: '15px', marginTop: '10px' }}>{item?.travelDate[1]}</em> */}
                                                    </div>
                                                    <div className="tg-pricearea">
                                                        <span>from</span>
                                                        <h4>{item?.amount}</h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                
                            </div>
                          
                        </div>
                          {loaderMore &&
                          <div className="loading-container container">
                                 <img src={require('../../assets2/images/favi.png')} alt="loading" />
                                 <span>Loading...</span>
                             </div>
                             }
                           
                    </section>
                </main>
            </div>
        </>
    )
}

export default Tour; 
