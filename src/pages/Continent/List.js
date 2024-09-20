import React, { useEffect, useState } from 'react'
import Header from '../../Header'
import Footer from '../../Footer'
import { Link } from 'react-router-dom'
import { get, post } from '../../helper/helper_api';
import Loader from '../../Loader';
import { toast } from 'react-toastify';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";
import { useRef } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { email } from '../../Utils';
import { Helmet } from 'react-helmet';

export default function List(props) {
  const location = useLocation();
  let navigate = useNavigate();
  // console.log('property item', location?.state)
  const [propertydetail, setPropertydetail] = useState([]);
  const [proID, setProID] = useState(location?.state);
  const [loader, setLoader] = useState(true);
  const [type, setType] = useState(null);
  const [sortBy, setSortBy] = useState(false);
  const swiperRef = useRef();
  const [properties, setProperties] = useState(0);
  const [experience, setExperience] = useState([]);
  const [headerData, setHeaderData] = useState(props?.headerData);
  const [destinationData, setDestinationData] = useState(headerData);
  const [ads, setAds] = useState([]);

  useEffect(() => {
    console.log('path on listing headerData', destinationData);
    let path = location.pathname.split("/");
    if (path.length > 0)
      setType(path[1]);
    if (path.length > 1)
      setProID(path[2]);
    return;
  }, [location]);

  useEffect(() => {
    getCardList();
  }, [proID]);

  useEffect(() => {
    if (props?.headerData)
      getDestinationAdd();
  }, [props?.headerData])

  const getCardList = () => {
    // console.log('pro id type', type);
    setLoader(true);
    get("/ads/list?screen=home")
      .then(res => {
        console.log('response from ads list', res)
        setLoader(false);
        if (res?.statusCode == 200)
          setAds(res?.data);
      }).catch(err => {
        console.log('error while getting ads list', err);
        setLoader(false);
      });
  }

  const getDestinationAdd = () => {
    let properties = 0, data = [];
    console.log('header data on continent list', headerData);
    headerData?.destination?.map((con, index) => {
      // properties = properties + con.properties?.length;
      // data.push(con);
      if (index == 6)
        data.push({ type: 'ads' });
      else
        data.push(con)
    });
    setDestinationData({ ...headerData, destination: data })
    console.log('datadatadatadata', data)
  }

  const shorByFunction = () => {
    setSortBy(!sortBy);
  }

  const compressId = (id) => {
    const temp = id.slice(id.length - 4, id.length);
    // console.log('compressing id', temp);
    return temp;
  }

  const openCountry = (item) => {
    navigate('/country/' + compressId(item?._id) + "/" + "top-travel-destinations-in-" + (propertydetail?.name).split(" ").join("-").toLowerCase() + "-" + (item?.name).split(" ").join("-").toLowerCase());
  }

  const propertyDetail = (item, type) => {
    // if (props?.handleClick)
    //   props.handleClick(item, type);
    // else
    navigate('/property-detail/' + item?._id);
    console.log('history on click ', item, type);
  }

  // console.log('property filter continentId list', propertydetail);

  const openConti = (item) => {
    const tempId = item?._id.slice(item?._id.length - 4, item?._id.length);
    navigate('/continent/' + tempId + "/" + "top-travel-destinations-in-" + (item?.name).split(" ").join("-").toLowerCase());
  }


  return (

    <>
      {
        loader && <Loader />
      }
      {destinationData?.destination?.length > 0 &&
        <Helmet>
          <title>Top Continent | Woow Destinations</title>
          <meta name="keywords" content={`Woow Destinations, best top travel destination in${destinationData?.destination?.map((item) => ` ${item?.name}`)}`} />
          <meta name="twitter:image:src" content={destinationData?.destination[0]?.banner} />
          <meta name="twitter:site" content="@woowdestinations" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={`Top Continent | Woow Destinations`} />
          <meta name="twitter:description" content={destinationData?.destination[0]?.desc} />
          <meta property="og:locale" content="en-in" />
          <meta property="og:image" content={destinationData?.destination[0]?.banner} />
          <meta property="og:image:alt" content={destinationData?.destination[0]?.desc} />
          <meta property="og:site_name" content="Woow Destinations" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={`Top Continent | Woow Destinations`} />
          <meta property="og:url" content={"http://woowdestinations.com" + location?.pathname} />
          <meta property="og:description" content={destinationData?.destination[0]?.desc} />

          <meta name="dc.language" content="English" />
          <meta name="dc.source" content={"http://www.woowdestinations.com" + location.pathname} />
          <meta name="dc.title" content="woow destinations" />
          <meta name="dc.keywords" content={`Woow Destinations, best top travel destination in${destinationData?.destination?.map((item) => ` ${item?.name}`)}`} />
          <meta name="dc.description" content={destinationData?.destination[0]?.desc} />
          {/* <meta name="geo.region" content="IN-GN" />
         <meta name="geo.placename" content={propertydetail?.location} />
         <meta name="geo.position" content={`${propertydetail?.lat};${propertydetail?.long}`} />
         <meta name="ICBM" content={`${propertydetail?.lat};${propertydetail?.long}`} /> */}
          <meta name="Author" content="Woow Destinations" />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href="http://woowdestinations.com/" />
        </Helmet>
      }
      <main id="rlr-main" className="rlr-main--fixed-top">
        <div className="rlr-search-results-page container">
          <div className="rlr-search-results-page__breadcrumb-section">
            {/* <!-- Breadcrumb --> */}
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb rlr-breadcrumb__items">
                <li className="breadcrumb-item rlr-breadcrumb__item"><Link to="/">Home</Link></li>
                {/* <li className="breadcrumb-item rlr-breadcrumb__item active" aria-current="page">country</li> */}
                <li className="breadcrumb-item rlr-breadcrumb__item">Continent</li>
                {/* <li className="breadcrumb-item rlr-breadcrumb__item active" aria-current="page">{propertydetail[0]?.name}</li> */}
              </ol>
            </nav>
            <div className="rlr-icon-text"><i className="rlr-icon-font flaticon-email mt-1" style={{ fontWeight: 'bold' }}> </i> <span className="rlr-search-results-page__phone">Questions? {email} </span></div>
          </div>
          <div className='banner-section'>
            <img src={destinationData?.destination[0]?.banner} alt={destinationData?.destination[0]?.banner} />
          </div>
          <aside className="row">
          </aside>
          <div className="rlr-section__title mt-3 pt-0 pb-2">
            <h2 className="rlr-section__title--main">Top {propertydetail?.name} Continent</h2>
          </div>

          {/* <!-- Destination cards --> */}

          <div class="row rlr-search-results-page__product-details">
            <div class="rlr-search-results-page__product-list col-xl-12">
              <div class="row rlr-search-results-page__card-wrapper rlr-search-results-page__card-wrapper_bot">
                {
                  destinationData?.destination?.map((item, index) => {
                    if (ads?.length > 0 && item?.type && item?.type == 'ads')
                      return (
                        <div style={{ width: '100%' }}>
                          {ads.map((item) => {
                            if (item?.position == 'top')
                              return (
                                <div  className='add_section_mid'>
                                  <img src={item?.banner} style={{ width: 'auto', height: 'auto' }} />
                                </div>
                              )
                          })}
                        </div>
                      )
                    else
                      return (
                        <div class="col-md-6 col-lg-4 col-xl-4 col-xxl-4" onClick={() => openConti(item)} style={{ cursor: 'pointer' }}>
                          <article class="rlr-product-card rlr-product-card--v3" itemscope itemtype="https://schema.org/Product">
                            <figure class="rlr-product-card__image-wrapper" >
                              <span class="rlr-badge rlr-badge-- rlr-badge-- rlr-badge--abs rlr-badge--abs-left"> {item?.properties?.length} Tours </span>
                              <img itemprop="image" style={{ height: 150 }} src={item?.banner} data-sizes="auto" className="lazyload" alt="" />
                              <div class="rlr-product-detail-header__button-wrapper" style={{top:'25px',right:'25px'}}>
                                  <button type="button" class="btn rlr-button rlr-button--circle rlr-wishlist rlr-wishlist-button--light rlr-wishlist-button rlr-js-action-wishlist" aria-label="Save to Wishlist">
                                    <i class="rlr-icon-font flaticon-heart-1"> </i>
                                  </button>
                                  <span class="rlr-product-detail-header__helptext rlr-js-helptext"></span>
                                </div>
                            </figure>
                            <div class="rlr-product-card__detail-wrapper rlr-js-detail-wrapper">
                              <header class="rlr-product-card__header">
                                <div>
                                  <a href='javascript:void(0);' class="rlr-product-card__anchor-title">
                                    <h2 class="rlr-product-card__title" itemprop="name">{item.name} <span class="rlr-product-card__sub-title">({item?.countries?.length})</span></h2>
                                  </a>
                                  <div>
                                    <a href='javascript:void(0);' class="rlr-product-card__anchor-cat">
                                      <span class="rlr-product-card__sub-title">{item?.desc?.length > 100 ? item?.desc?.substring(0, 100) + "..." : item?.desc}</span>
                                    </a>

                                  </div>
                                </div>
                               
                              </header>

                            </div>
                          </article>
                        </div>
                      )
                  })
                }
              </div>
              
            </div>
          </div>
          {/* <aside className="row rlr-search-results-page__dynamic-filter-section mb-0 px-5">
            <p className='first-paragraph' style={{ textAlign: 'center', padding: '0 100px' }}>{destinationData?.destination[0]?.overview?.split("/n").join('\n')}</p>
          </aside> */}
        </div>
        <section id="features" className="rlr-section rlr-section__mb landding__plugin">
          <div className="container">
            {ads.map((item) => {
              if (item?.position == 'bottom')
                return (
                  <div className='addSection addSection_inner pt-0' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src={item?.banner} style={{ width: 'auto', height: 'auto' }} />
                  </div>
                )
            })}
          </div>
        </section>
      </main>
    </>
  )
}
