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
import HTMLRenderer from 'react-html-renderer';
export default function Index(props) {
  const location = useLocation();
  let navigate = useNavigate();
  // console.log('property item', location?.state)
  const [propertydetail, setPropertydetail] = useState(null);
  const [proID, setProID] = useState(location?.state);
  const [loader, setLoader] = useState(true);
  const [type, setType] = useState(null);
  const [sortBy, setSortBy] = useState(false);
  const swiperRef = useRef();
  const [properties, setProperties] = useState(0);
  const [experience, setExperience] = useState([]);
  const [headerData, setHeaderData] = useState(null);
  const [ads, setAds] = useState([]);

  useEffect(() => {
    // console.log('path on listing', location.pathname);
    let path = location.pathname.split("/");
    if (path.length > 0)
      setType(path[1]);
    if (path.length > 1)
      setProID(path[2]);
    return;
  }, [location]);

  useEffect(() => {
    if (proID)
      getCardList();
  }, [proID]);

  const getCardList = () => {
    // console.log('pro id type', type);
    setLoader(true);
    get("/ads/list?screen=home")
      .then(res => {
        console.log('response from ads list', res)
        if (res?.statusCode == 200)
          setAds(res?.data);
      }).catch(err => {
        console.log('error while getting ads list', err);
      });
    let url = '/continent/continent/';
    let body = {
      continentId: proID
    }
    post(url, body).then((json) => {
      // console.log('property filter continentId list', json);
      setLoader(false);
      if (json?.statusCode == 200) {
        let properties = 0, data = [];
        json?.data?.country?.map((con, index) => {
          properties = properties + con.properties?.length;
          data.push(con);
          if (index == 5)
            data.push({ type: 'ads' });
        });
        json.data.country = data
        setPropertydetail(json?.data);
        setProperties(properties);
      }
    }).catch((err) => {
      toast.error(err);
      console.log(err)
      setLoader(false);
    })
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

  return (

    <>
      {
        loader && <Loader />
      }
      {propertydetail &&
        <Helmet>
          <title>{propertydetail?.name} | Woow Destinations</title>
          <meta name="keywords" content={`Woow Destinations, best top travel destination in${propertydetail?.country?.map((item) => ` ${item?.name}`)}`} />
          <meta name="twitter:image:src" content={propertydetail?.banner} />
          <meta name="twitter:site" content="@woowdestinations" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={`${propertydetail?.name} | Woow Destinations`} />
          <meta name="twitter:description" content={propertydetail?.desc} />
          <meta property="og:locale" content="en-in" />
          <meta property="og:image" content={propertydetail?.banner} />
          <meta property="og:image:alt" content={propertydetail?.desc} />
          <meta property="og:site_name" content="Woow Destinations" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={`${propertydetail?.name} | Woow Destinations`} />
          <meta property="og:url" content={"http://woowdestinations.com" + location?.pathname} />
          <meta property="og:description" content={propertydetail?.desc} />

          <meta name="dc.language" content="English" />
          <meta name="dc.source" content={"http://www.woowdestinations.com" + location.pathname} />
          <meta name="dc.title" content="woow destinations" />
          <meta name="dc.keywords" content={`Woow Destinations, best top travel destination in${propertydetail?.country?.map((item) => ` ${item?.name}`)}`} />
          <meta name="dc.description" content={propertydetail?.desc} />
          {/* <meta name="geo.region" content="IN-GN" />
         <meta name="geo.placename" content={propertydetail?.location} />
         <meta name="geo.position" content={`${propertydetail?.lat};${propertydetail?.long}`} />
         <meta name="ICBM" content={`${propertydetail?.lat};${propertydetail?.long}`} /> */}
          <meta name="Author" content="Woow Destinations" />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href="http://woowdestinations.com/" />
        </Helmet>
      }
      {/* <Header setExperience={setExperience} setHeaderData={setHeaderData} /> */}
      <main id="rlr-main" className="rlr-main--fixed-top">
        <div className="rlr-search-results-page container">
          <div className="rlr-search-results-page__breadcrumb-section">
            {/* <!-- Breadcrumb --> */}
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb rlr-breadcrumb__items">
                <li className="breadcrumb-item rlr-breadcrumb__item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item rlr-breadcrumb__item" style={{ cursor: 'pointer' }} aria-current="page"><Link to="/continent">Continent</Link></li>
                <li className="breadcrumb-item rlr-breadcrumb__item active">{propertydetail?.name ? propertydetail?.name : ""}</li>
                {/* <li className="breadcrumb-item rlr-breadcrumb__item active" aria-current="page">{propertydetail[0]?.name}</li> */}
              </ol>
            </nav>
            <div className="rlr-icon-text"><i className="rlr-icon-font flaticon-email mt-1" style={{ fontWeight: 'bold' }}> </i> <span className="rlr-search-results-page__phone">Questions? {email} </span></div>
          </div>
          <div className='banner-section'>
            <img src={propertydetail?.banner} alt={propertydetail?.banner} />
          </div>
          <aside className="row">
            {/* <!-- Search results header --> */}
            <div className="rlr-search-results-header rlr-search-results-header__wrapper">
              {/* <!-- Title --> */}
              <h1 className="rlr-search-results-header__value">
                Results for <strong>{propertydetail?.name}</strong> / {propertydetail?.country?.length} Country / {properties} Destinations
              </h1>
              {/* <!-- Sort order --> */}
              {/* <div className="rlr-search-results-header__sorting-wrapper">
                <span className="rlr-search-results-header__label">Sort by:</span>
                <div className="dropdown rlr-dropdown rlr-js-dropdown">
                  <button className="btn dropdown-toggle rlr-dropdown__button rlr-js-dropdown-button" type="button" id="" onClick={shorByFunction} data-bs-toggle="dropdown" aria-expanded="false" data-bs-offset="-50,35">Most Popular</button>
                  <ul className={sortBy == false ? 'dropdown-menu rlr-dropdown__menu sortby_item' : 'dropdown-menu rlr-dropdown__menu sortby_item active'} aria-labelledby="rlr_dropdown_menu_search_results">
                    <li>
                      <Link className="dropdown-item rlr-dropdown__item rlr-js-dropdown-item" >Recommended</Link>
                    </li>
                    <li>
                      <Link className="dropdown-item rlr-dropdown__item rlr-js-dropdown-item" >Price (Low to High)</Link>
                    </li>
                    <li>
                      <Link className="dropdown-item rlr-dropdown__item rlr-js-dropdown-item" >Price (High to Low)</Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider rlr-dropdown__divider" />
                    </li>
                    <li>
                      <Link className="dropdown-item rlr-dropdown__item rlr-js-dropdown-item" >Duration ( Short to Long)</Link>
                    </li>
                    <li>
                      <Link className="dropdown-item rlr-dropdown__item rlr-js-dropdown-item" >Duration (Long to Short)</Link>
                    </li>
                    <li>
                      <Link className="dropdown-item rlr-dropdown__item rlr-js-dropdown-item" >New on Emprise</Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider rlr-dropdown__divider" />
                    </li>
                    <li>
                      <Link className="dropdown-item rlr-dropdown__item rlr-js-dropdown-item" >Traveler Rating</Link>
                    </li>
                    <li>
                      <Link className="dropdown-item rlr-dropdown__item rlr-js-dropdown-item" >Deals</Link>
                    </li>
                    <li>
                      <Link className="dropdown-item rlr-dropdown__item rlr-js-dropdown-item" >Distance</Link>
                    </li>
                    <li>
                      <Link className="dropdown-item rlr-dropdown__item rlr-js-dropdown-item" >Star Rating</Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider rlr-dropdown__divider" />
                    </li>
                    <li>
                      <Link className="dropdown-item rlr-dropdown__item rlr-js-dropdown-item" >Default</Link>
                    </li>
                  </ul>
                </div>
              </div> */}
            </div>
          </aside>


          <div className="rlr-section__title mt-4 pt-0 pb-2">
            <h2 className="rlr-section__title--main">Top Countries in {propertydetail?.name} Continent</h2>
            {/* <span className="rlr-section__title--sub">Embark on an epic journey of discovery and adventure with our continent-wise tours, exploring the diverse cultures and natural wonders of each corner of the world.</span> */}
          </div>

          {/* <!-- Dynamic filter --> */}
          {/* <aside className="row rlr-search-results-page__dynamic-filter-section">
            <div className="swiper_h" style={{ position: 'relative' }}>
              <Swiper
                slidesPerView={1}
                spaceBetween={10}

                centeredSlides={true}
                loop={true}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                  },
                  768: {
                    slidesPerView: 4,
                    spaceBetween: 10,
                  },
                  1024: {
                    slidesPerView: 5,
                    spaceBetween: 10,
                  },
                }}

                onBeforeInit={(swiper) => {
                  swiperRef.current = swiper;
                }}
                modules={[Autoplay, Navigation]}
                className="mySwiper"
              >
                {experience?.map((item) => (
                  <SwiperSlide>
                    <Link className="rlr-icon-text btn rlr-icon-text__card rlr-icon-text--anchor"><span className="rlr-icon-text__card-title">{item?.name} ({item?.properties?.length})</span> </Link>
                  </SwiperSlide>
                ))}
              </Swiper>

              <button type="button" onClick={() => swiperRef.current?.slidePrev()} className="btn rlr-button splide__arrow splide__arrow--prev">
                <i className="rlr-icon-font flaticon-left-chevron"> </i>
              </button>
              <button type="button" onClick={() => swiperRef.current?.slideNext()} className="btn rlr-button splide__arrow splide__arrow--next">
                <i className="rlr-icon-font flaticon-chevron"> </i>
              </button>
            </div>
          </aside> */}
          {/* <!-- Product cards --> */}

          <div class="row rlr-search-results-page__product-details">
            <div class="rlr-search-results-page__product-list col-xl-12">
              <div class="row rlr-search-results-page__card-wrapper rlr-search-results-page__card-wrapper_bot">
                {
                  propertydetail?.country?.map((item, index) => {
                    if (ads?.length > 0 && item?.type && item?.type == 'ads')
                      return (
                        <div style={{ width: '100%' }}>
                          {ads.map((item) => {
                            if (item?.position == 'top')
                              return (
                                <div className='add_section_mid'>
                                  <img src={item?.banner} style={{ width: 'auto', height: 'auto' }} />
                                </div>
                              )
                          })}
                        </div>
                      )
                    else
                      return (
                        <div class="col-md-6 col-lg-4 col-xl-4 col-xxl-4" onClick={() => openCountry(item)} style={{ cursor: 'pointer' }}>
                          <article class="rlr-product-card rlr-product-card--v3" itemscope itemtype="https://schema.org/Product">
                            <figure class="rlr-product-card__image-wrapper" >
                              <span class="rlr-badge rlr-badge-- rlr-badge-- rlr-badge--abs rlr-badge--abs-left"> {item?.properties?.length} Tours </span>
                              <img itemprop="image" style={{ height: 150 }} src={item?.banner} data-sizes="auto" className="lazyload" alt="" />
                            </figure>
                            <div class="rlr-product-detail-header__button-wrapper" style={{ top: 25, right: 20 }}>
                              <button type="button" class="btn rlr-button rlr-button--circle rlr-wishlist rlr-wishlist-button--light rlr-wishlist-button rlr-js-action-wishlist" aria-label="Save to Wishlist">
                                <i class="rlr-icon-font flaticon-heart-1"> </i>
                              </button>
                              <span class="rlr-product-detail-header__helptext rlr-js-helptext"></span>
                            </div>
                            <div class="rlr-product-card__detail-wrapper rlr-js-detail-wrapper">
                              <header class="rlr-product-card__header">
                                <div>
                                  <a href='javascript:void(0);' class="rlr-product-card__anchor-title">
                                    <h2 class="rlr-product-card__title" itemprop="name">{item.name} <span class="rlr-product-card__sub-title">({item?.capital})</span></h2>
                                  </a>
                                  <div>
                                    <a href='javascript:void(0);' class="rlr-product-card__anchor-cat">
                                      <span class="rlr-product-card__sub-title">{item?.desc?.length > 95 ? item?.desc?.substring(0, 95) + "..." : item?.desc}</span>
                                    </a>

                                  </div>
                                </div>
                              </header>
                              <div class="rlr-product-card__footer">
                                <div class="rlr-icon-text rlr-product-card__icon-text"><i class="rlr-icon-font flaticon-three-o-clock-clock"> </i> <span class="">{item?.timeDiff} </span></div>
                                <ul class="rlr-product-card__icon-text-list">
                                  <li class="rlr-icon-text rlr-product-card__icon-text"><i class="rlr-icon-font fa fa-language"> </i> <span class="rlr-icon-text__title">{item?.language}</span></li>
                                  <li class="rlr-icon-text rlr-product-card__icon-text"><i class="rlr-icon-font fa fa-usd"> </i> <span class="rlr-icon-text__title">{item?.currency} </span></li>
                                </ul>
                              </div>
                            </div>
                          </article>
                        </div>
                      )
                  })
                }
              </div>
              <hr class="rlr-search-results-page__divider" />
              {/* <nav class="rlr-pagination" aria-label="Product list navigation">
                <ul class="pagination rlr-pagination__list">
                  <li class="page-item rlr-pagination__page-item disabled">
                    <a class="page-link rlr-pagination__page-link rlr-pagination__page-link--prev"  aria-label="Previous">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.833 10H4.167m0 0L10 15.833M4.167 10 10 4.167" stroke="var(--body-color)" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                      <span aria-hidden="true">Previous</span>
                    </a>
                  </li>
                  <li class="page-item rlr-pagination__page-item">
                    <ul class="pagination rlr-pagination__child-list">
                      <li class="page-item rlr-pagination__page-item"><a class="page-link rlr-pagination__page-link rlr-pagination__page-link--counter" >1</a></li>
                      <li class="page-item rlr-pagination__page-item"><a class="page-link rlr-pagination__page-link rlr-pagination__page-link--counter" >2</a></li>
                      <li class="page-item rlr-pagination__page-item"><a class="page-link rlr-pagination__page-link rlr-pagination__page-link--counter" >3</a></li>
                      <li class="page-item rlr-pagination__page-item"><a class="page-link rlr-pagination__page-link rlr-pagination__page-link--counter" >...</a></li>
                      <li class="page-item rlr-pagination__page-item"><a class="page-link rlr-pagination__page-link rlr-pagination__page-link--counter" >8</a></li>
                      <li class="page-item rlr-pagination__page-item"><a class="page-link rlr-pagination__page-link rlr-pagination__page-link--counter" >9</a></li>
                      <li class="page-item rlr-pagination__page-item"><a class="page-link rlr-pagination__page-link rlr-pagination__page-link--counter" >10</a></li>
                    </ul>
                  </li>
                  <li class="page-item rlr-pagination__page-item">
                    <a class="page-link rlr-pagination__page-link rlr-pagination__page-link--next"  aria-label="Next">
                      <span aria-hidden="true">Next</span>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.167 10h11.666m0 0L10 4.167M15.833 10 10 15.833" stroke="var(--body-color)" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </a>
                  </li>
                </ul>
              </nav> */}
            </div>
          </div>
          <aside className="row rlr-search-results-page__dynamic-filter-section mb-0">
          <p className="rlr-readmore-desc__content rlr-js-desc">
           
              <HTMLRenderer html={propertydetail?.desc} />
              </p>
          </aside>
          <section id="features" className="rlr-section rlr-section__mb landding__plugin">
          <div className="container">
            {ads.map((item) => {
              if (item?.position == 'bottom')
                return (
                  <div className='addSection addSection_inner' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src={item?.banner} style={{ width: 'auto', height: 'auto' }} />
                  </div>
                )
            })}
          </div>
        </section>
          <section className="rlr-section rlr-section__mt rlr-related-product-wrapper">
            {/* <!-- Section heading --> */}
            <div className="rlr-section-header">
              {/* <!-- Section heading --> */}
              <div className="rlr-section__title">
                <h2 className="rlr-section__title--main">Also Check More Continents</h2>
                <span className="rlr-section__title--sub">Explore the diverse array of destinations within this beautiful country.</span>
              </div>
              <div className="button-row">
                <a href="./search-results--left-sidebar.html" className="btn rlr-button rlr-button--large rlr-button--rounded rlr-button--brand rlr_button_brand"> Check All </a>
              </div>
            </div>
            <div className="row rlr-featured__cards">
              {propertydetail?.hotel?.map((item) => (
                <div className="col-md-4 col-lg-4" data-aos="fade-up" data-aos-offset="250" data-aos-duration="700" style={{ cursor: 'pointer' }} onClick={() => openConti(item)}>
                  {/* <!-- Featured prodcut card --> */}
                  <article className="rlr-product-card rlr-product-card--featured" itemscope itemtype="https://schema.org/Product">
                    {/* <!-- Image --> */}
                    <figure className="rlr-product-card__image-wrapper ">
                      <img itemprop="image" src={item?.banner} data-src={item?.banner} data-srcset={item?.banner} data-sizes="auto" className="lazyload" alt="" />
                    </figure>
                    {/* <!-- Card body --> */}
                    <div className="rlr-product-card--featured__inner">
                      <span className="rlr-badge rlr-badge--right rlr-badge-- rlr-badge--abs rlr-badge--abs-right"> {item?.city} </span>
                      <div className="rlr-product-card--featured__body card-img-overlay">
                        {/* <div className="rlr-product-card--featured__duration">
                          <p className="body">10 Days | 09 Nights</p>
                          <h4 className="type-h4">$895.50</h4>
                        </div> */}
                        <div className="rlr-product-detail-header__actions justify-content-end" style={{ width: '100%' }}>
                          {/* <div className="rlr-product-detail-header__button-wrapper">
                            <button type="button" className="btn rlr-button rlr-button--circle rlr-wishlist rlr-wishlist-button--no-bg rlr-wishlist-button rlr-js-action-wishlist" aria-label="Save to Wishlist">
                              <i className="rlr-icon-font flaticon-heart-1"> </i>
                            </button>
                            <span className="rlr-product-detail-header__helptext rlr-js-helptext"></span>
                          </div> */}
                          <div className="btn rlr-button product-card-buttonrlr-button--medium rlr-button--rounded rlr-button--brand"> Explore </div>
                        </div>
                      </div>
                    </div>
                    {/* <a href="./product-detail-page.html" className="rlr-product-card__anchor rlr-product-card__anchor--featured"></a> */}
                  </article>
                  {/* <!-- Summary --> */}
                  <div className="rlr-product-card--featured__summary">
                    <h4 className="type-h6-semi-bold pb-0">{item?.name}</h4>
                    {/* <p className="type-body">{item?.location} | {item?.city}</p> */}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
        
        
      </main>
      {/* <Footer contis={headerData?.destination} experience={headerData?.experiences} month={headerData?.months} /> */}
    </>
  )
}
