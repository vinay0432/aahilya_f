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
import StarRatings from 'react-star-ratings';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from 'reactstrap';

export default function Index(props) {
  const location = useLocation();
  let navigate = useNavigate();
  // console.log('property item', location?.state)
  const [data, setData] = useState([]);
  const [proID, setProID] = useState(location?.state);
  const [loader, setLoader] = useState(true);
  const [type, setType] = useState(null);
  const [sortBy, setSortBy] = useState(false);
  const swiperRef = useRef();
  const [properties, setProperties] = useState(0);
  const [experience, setExperience] = useState([]);
  const [headerData, setHeaderData] = useState(null);
  const [countries, setCountries] = useState([]);
  const [ads, setAds] = useState([]);
  const [filters, setFilters] = useState({ continents: [], countries: [], months: [], experiences: [], whos: [] });
  const [open, setOpen] = useState('1');
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };


  useEffect(() => {
    getCardList();
  }, []);

  useEffect(() => {
    if (headerData?.countries?.length > 0)
      setCountries(headerData?.countries);
  }, [headerData]);

  useEffect(() => {
    getSearch();
  }, [filters])

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
  }

  const getSearch = () => {
    let body = {
      continents: filters?.continents?.length > 0 ? filters?.continents : undefined,
      countries: filters?.countries?.length > 0 ? filters?.countries : undefined,
      months: filters?.months?.length > 0 ? filters?.months : undefined,
      experiences: filters?.experiences?.length > 0 ? filters?.experiences : undefined,
      whos: filters?.whos?.length > 0 ? filters?.whos : undefined
    }
    setLoader(true)
    post('/property/search/list', body)
      .then((res) => {
        console.log('response form getting popular property', res);
        if (res?.statusCode == 200) {
          setLoader(false)
          setData(res?.data?.properties);
        } else {
          toast.error(res?.error);
          setLoader(false)
        }
      })
      .catch(error => {
        console.log('error while getting popular', error);
        setLoader(false)
      })
  }

  const shorByFunction = () => {
    setSortBy(!sortBy);
  }

  const propertyDetail = (item, type) => {
    // if (props?.handleClick)
    //   props.handleClick(item, type);
    // else
    navigate('/property-detail/' + item?._id);
    console.log('history on click ', item, type);
  }

  const handleSelectContinent = (item, type) => {
    console.log('filters to find', item, type);
    let temp = Object.assign({}, filters);
    let temp2 = [];
    if (type == 'continent') {
      const found = temp?.continents.findIndex(x => x == item);
      if (found == -1) {
        temp.continents.push(item);
      } else {
        temp.continents.splice(found, 1);
        setCountries(headerData?.countries);
      }
      temp?.continents?.forEach((cont) => {
        headerData?.countries?.forEach(element => {
          if (element?.continentId == cont)
            temp2.push(element);
        });
      });
      setCountries(temp2);
    }
    else if (type == 'country') {
      const found = temp?.countries.findIndex(x => x == item);
      if (found == -1)
        temp.countries.push(item);
      else
        temp.countries.splice(found, 1);
    }
    else if (type == 'month') {
      const found = temp?.months.findIndex(x => x == item);
      if (found == -1)
        temp.months.push(item);
      else
        temp.months.splice(found, 1);
    }
    else if (type == 'experience') {
      const found = temp?.experiences.findIndex(x => x == item);
      if (found == -1)
        temp.experiences.push(item);
      else
        temp.experiences.splice(found, 1);
    }
    else if (type == 'who') {
      const found = temp?.whos.findIndex(x => x == item);
      if (found == -1)
        temp.whos.push(item);
      else
        temp.whos.splice(found, 1);
    }
    console.log('filters to find', temp);
    setFilters(temp);
  }

  const compressId = (id) => {
    const temp = id.slice(id.length - 4, id.length);
    // console.log('compressing id', temp);
    return temp;
  }

  const openProperty = (item) => {
    navigate("/destination/" + compressId(item?._id) + "/" + (item?.name).split(" ").join("-").toLowerCase() + "-in-" + (item?.country[0]?.name).split(" ").join("-").toLowerCase() + "-" + (item?.country[0]?.continent[0]?.name).split(" ").join("-").toLowerCase());
  }

  // console.log('property filter continentId list', propertydetail);

  return (

    <>
      {/* {
        loader && <Loader />
      } */}
      {/* <Header setExperience={setExperience} setHeaderData={setHeaderData} /> */}
      <main id="rlr-main" className="rlr-main--fixed-top">
        <div className="rlr-search-results-page container">
          <div className="rlr-search-results-page__breadcrumb-section">
            {/* <!-- Breadcrumb --> */}
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb rlr-breadcrumb__items">
                <li className="breadcrumb-item rlr-breadcrumb__item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item rlr-breadcrumb__item active" aria-current="page">search</li>
                {/* <li className="breadcrumb-item rlr-breadcrumb__item">{propertydetail?.name ? propertydetail?.name : ""}</li> */}
                {/* <li className="breadcrumb-item rlr-breadcrumb__item active" aria-current="page">{propertydetail[0]?.name}</li> */}
              </ol>
            </nav>
            <div className="rlr-icon-text"><i className="rlr-icon-font flaticon-email mt-1" style={{ fontWeight: 'bold' }}> </i> <span className="rlr-search-results-page__phone">Questions? {email} </span></div>
          </div>
          {/* <!-- Product cards --> */}
          <div class="row rlr-search-results-page__product-details">
            <aside class="col-lg-3 rlr-search-results-page__sidebar">
              <div class="rlr-product-filters__filters-wrapper p-0">
                {/* filters */}
                <div class="rlr-product-filters__filter">
                  <Accordion open={open} toggle={toggle} style={{ width: '100%' }}>
                    <AccordionItem style={{ border: 'none' }}>
                      <AccordionHeader targetId="1">Continents</AccordionHeader>
                      <AccordionBody accordionId="1" >
                        {headerData?.destination?.map((item, index) => (
                          <ul class="rlr-checkboxes">
                            <li class="form-check form-check-block">
                              <input
                                class="form-check-input rlr-form-check-input rlr-product-filters__checkbox"
                                id={"rlr-product-tag-continent-" + index}
                                type="checkbox"
                                style={{ cursor: 'pointer' }}
                                onChange={e => handleSelectContinent(item?._id, 'continent')}
                              />
                              <label
                                class="rlr-form-label rlr-form-label--checkbox rlr-product-filters__checkbox-label"
                                for={"rlr-product-tag-continent-" + index}
                                style={{ cursor: 'pointer' }}
                              > {item?.name} </label>
                            </li>
                          </ul>
                        ))}
                      </AccordionBody>
                    </AccordionItem>
                    <AccordionItem>
                      <AccordionHeader targetId="2">Countries</AccordionHeader>
                      <AccordionBody accordionId="2">
                        {countries?.map((item, index) => (
                          <ul class="rlr-checkboxes">
                            <li class="form-check form-check-block">
                              <input
                                class="form-check-input rlr-form-check-input rlr-product-filters__checkbox"
                                id={"rlr-product-tag-country-" + index}
                                type="checkbox"
                                style={{ cursor: 'pointer' }}
                                onChange={e => handleSelectContinent(item?._id, 'country')}
                              />
                              <label
                                class="rlr-form-label rlr-form-label--checkbox rlr-product-filters__checkbox-label"
                                for={"rlr-product-tag-country-" + index}
                                style={{ cursor: 'pointer' }}
                              > {item?.name} </label>
                            </li>
                          </ul>
                        ))}
                      </AccordionBody>
                    </AccordionItem>
                    <AccordionItem>
                      <AccordionHeader targetId="3">Months</AccordionHeader>
                      <AccordionBody accordionId="3">
                        {headerData?.months?.map((item, index) => (
                          <ul class="rlr-checkboxes">
                            <li class="form-check form-check-block">
                              <input
                                class="form-check-input rlr-form-check-input rlr-product-filters__checkbox"
                                id={"rlr-product-tag-month-" + index}
                                type="checkbox"
                                style={{ cursor: 'pointer' }}
                                onChange={e => handleSelectContinent(item?._id, 'month')}
                              />
                              <label
                                class="rlr-form-label rlr-form-label--checkbox rlr-product-filters__checkbox-label"
                                for={"rlr-product-tag-month-" + index}
                                style={{ cursor: 'pointer' }}
                              > {item?.name} </label>
                            </li>
                          </ul>
                        ))}
                      </AccordionBody>
                    </AccordionItem>
                    <AccordionItem>
                      <AccordionHeader targetId="4">Experiences</AccordionHeader>
                      <AccordionBody accordionId="4">
                        {headerData?.experiences?.map((item, index) => (
                          <ul class="rlr-checkboxes">
                            <li class="form-check form-check-block">
                              <input
                                class="form-check-input rlr-form-check-input rlr-product-filters__checkbox"
                                id={"rlr-product-tag-experience-" + index}
                                type="checkbox"
                                style={{ cursor: 'pointer' }}
                                onChange={e => handleSelectContinent(item?._id, 'experience')}
                              />
                              <label
                                class="rlr-form-label rlr-form-label--checkbox rlr-product-filters__checkbox-label"
                                for={"rlr-product-tag-experience-" + index}
                                style={{ cursor: 'pointer' }}
                              > {item?.name} </label>
                            </li>
                          </ul>
                        ))}
                      </AccordionBody>
                    </AccordionItem>
                    <AccordionItem>
                      <AccordionHeader targetId="5">Who</AccordionHeader>
                      <AccordionBody accordionId="5">
                        {headerData?.whos?.map((item, index) => (
                          <ul class="rlr-checkboxes">
                            <li class="form-check form-check-block">
                              <input
                                class="form-check-input rlr-form-check-input rlr-product-filters__checkbox"
                                id={"rlr-product-tag-who-" + index}
                                type="checkbox"
                                style={{ cursor: 'pointer' }}
                                onChange={e => handleSelectContinent(item?._id, 'who')}
                              />
                              <label
                                class="rlr-form-label rlr-form-label--checkbox rlr-product-filters__checkbox-label"
                                for={"rlr-product-tag-who-" + index}
                                style={{ cursor: 'pointer' }}
                              > {item?.name} </label>
                            </li>
                          </ul>
                        ))}
                      </AccordionBody>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div >
            </aside >
            {/* cards */}
            <div class="rlr-search-results-page__product-list col-lg-9">
              <div class="row rlr-search-results-page__card-wrapper">
                {
                  data.map((item, index) => {
                    if (ads?.length > 0 && item?.type && item?.type == 'ads')
                      return (
                        <div style={{ width: '100%' }}>
                          {ads.map((item) => {
                            if (item?.position == 'top')
                              return (
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
                                  <Link to={item?.utm} target='_black'>
                                    <img src={item?.banner} style={{ width: 'auto', height: 'auto' }} />
                                  </Link>
                                </div>
                              )
                          })}
                        </div>
                      )
                    else
                      return (
                        <div class="col-md-6 col-xl-4 col-xxl-4" style={{ cursor: 'pointer' }} onClick={() => openProperty(item)}>
                          <article class="rlr-product-card rlr-product-card--v3" itemscope itemtype="https://schema.org/Product">
                            <figure class="rlr-product-card__image-wrapper">
                              {/* <span class="rlr-badge rlr-badge-- rlr-badge-- rlr-badge--abs rlr-badge--abs-left"> {item?.properties?.length} Tours </span> */}
                              <img itemprop="image" style={{ height: 150 }} src={item?.banner} data-sizes="auto" className="lazyload" alt="" />
                            </figure>
                            <div class="rlr-product-card__detail-wrapper rlr-js-detail-wrapper">
                              <header class="rlr-product-card__header">
                                <div>
                                  <a class="rlr-product-card__anchor-title">
                                    <h2 class="rlr-product-card__title" itemprop="name">{item.name}</h2>
                                  </a>
                                  <div>
                                    <a class="rlr-product-card__anchor-cat">
                                      <span class="rlr-product-card__sub-title">{item?.overview.substring(0, 100)}...</span>
                                    </a>

                                  </div>
                                </div>
                                <div class="rlr-product-detail-header__button-wrapper">
                                  {/* <button type="button" class="btn rlr-button rlr-button--circle rlr-wishlist rlr-wishlist-button--light rlr-wishlist-button rlr-js-action-wishlist" aria-label="Save to Wishlist">
                                    <i class="rlr-icon-font flaticon-heart-1"> </i>
                                  </button> */}
                                  <span class="rlr-product-detail-header__helptext rlr-js-helptext"></span>
                                </div>
                              </header>
                              <div class="rlr-product-card__footer">
                                <div class="rlr-icon-text rlr-product-card__icon-text"><i class="rlr-icon-font flaticon-three-o-clock-clock"> </i> <span class="">{item?.nights} </span></div>
                                <ul class="rlr-product-card__icon-text-list">
                                  {/* <li class="rlr-icon-text rlr-product-card__icon-text"><i class="rlr-icon-font flaticon-check"> </i> <span class="rlr-icon-text__title">{item?.language}</span></li>
                                  <li class="rlr-icon-text rlr-product-card__icon-text"><i class="rlr-icon-font flaticon-check"> </i> <span class="rlr-icon-text__title">{item?.currency} </span></li> */}
                                  <div className="rlr-review-stars align-items-center" itemprop="ratingValue" itemscope itemtype="https://schema.org/Product">
                                    <StarRatings
                                      rating={typeof item?.avgRating == 'number' ? item?.avgRating : 0}
                                      starRatedColor={'#f7de00'}
                                      starHoverColor={'#f7de00'}
                                      numberOfStars={5}
                                      isSelectable={false}
                                      name='rating'
                                      starDimension={'20px'}
                                      starSpacing={'2px'}
                                    />
                                    {item?.reviews?.length > 0 &&
                                      <span className="rlr-product-card__from">({item?.reviews?.length})</span>
                                    }
                                  </div>
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
          </div >
        </div >
        {
          ads.map((item) => {
            if (item?.position == 'bottom')
              return (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Link to={item?.utm} target='_black'>
                    <img src={item?.banner} style={{ width: 'auto', height: 'auto' }} />
                  </Link>
                </div>
              )
          })
        }
      </main >
      {/* <Footer contis={headerData?.destination} experience={headerData?.experiences} month={headerData?.months} /> */}
    </>
  )
}