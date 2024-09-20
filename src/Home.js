import React, { useRef, useState, useEffect } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";

import { useLocation, useParams, useNavigate, Link } from 'react-router-dom';
import { get, post } from './helper/helper_api';
import { toast } from 'react-toastify';
import StarRatings from 'react-star-ratings';
import { useSelector } from 'react-redux';
import Loader from './Loader';
import { Helmet } from 'react-helmet';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { AvField, AvForm } from 'availity-reactstrap-validation';
import { useCookies } from 'react-cookie';
// const { compress, decompress } = require('shrink-string');
import swal from 'sweetalert';

export default function Home(props) {
  let navigate = useNavigate();
  // console.log('navigate on home', navigate)
  const user = useSelector((state) => state.user.user);
  const [popular, setPopular] = useState([]);
  const [ads, setAds] = useState([]);
  const [contis, setContis] = useState([]);
  const [experience, setExperience] = useState([]);
  const [month, setMonth] = useState([]);
  const [whos, setWhos] = useState([]);
  const [banner, setBanner] = useState([]);
  const swiperRef = useRef();
  const swiperRef_ = useRef();
  const swiperRef1 = useRef();
  const swiperRef_1 = useRef();
  const swiperRef2 = useRef();
  const swiperRef_2 = useRef();
  const swiperRef3 = useRef();
  const swiperRef_3 = useRef();
  const [swiperAutoplay, setSwiperAutoplay] = useState(true);
  const [currentContis, setCurrentContis] = useState([0, 1, 2, 3, 4, 5]);
  const [currentBanner, setCurrentBanner] = useState(null);
  const [loader, setLoader] = useState(false);
  const [modalBox, setModalBox] = useState(false);
  const [tours, setTours] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [testimonial, setTestimonial] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [affili, setAffili] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cookie, setCookie] = useState();


  console.log('banner data', banner)

  const [quotes, setQuotes] = useState([
    {
      head: 'Excursion',
      quote: '"The world is a book, and those who do not travel read only a page." - Saint Augustine'
    },
    {
      head: 'Traveling',
      quote: '"Traveling – it leaves you speechless, then turns you into a storyteller." – Ibn Battuta'
    },
    {
      head: 'Journey',
      quote: '"The journey not the arrival matters." – T.S. Eliot'
    },
    {
      head: 'Flying',
      quote: '"Travel is fatal to prejudice, bigotry, and narrow-mindedness." – Mark Twain'
    },
    {
      head: 'Trip',
      quote: '"A good traveler has no fixed plans and is not intent on arriving." – Lao Tzu'
    },
    {
      head: 'Movement',
      quote: '"The world is too big to stay in one place and life is too short to do just one thing." - Anonymous'
    },
    {
      head: 'Escape',
      quote: '"I travel not to escape life, but for life not to escape me." – Anonymous'
    },
    {
      head: 'Discover',
      quote: 'To travel is to discover that everyone is wrong about other countries." – Aldous Huxley'
    },
    {
      head: 'Navigation',
      quote: '"Travel makes one modest. You see what a tiny place you occupy in the world." – Gustave Flaubert'
    },
    {
      head: 'Sightseeing',
      quote: '"Adventure is worthwhile." – Aesop'
    }
  ]);
  const [random, setRandom] = useState(Math.floor((Math.random() * quotes?.length)));
  const [mainBanner, setMainBanner] = useState([]);
  // const [random, setRandom] = useState(8)

  useEffect(() => {
    window.scroll(0, 0);
    checkPopup();
    getHomeData();
    getAffili();
  }, []);

  useEffect(() => {
    // console.log('headerData @ Home', props?.headerData);
    if (props?.headerData) {
      setContis(props?.headerData?.destination);
      setWhos(props?.headerData?.whos);
      setExperience(props?.headerData?.experiences);
      setMonth(props?.headerData?.months);
      setBanner(props?.headerData)
    }
  }, [props?.headerData]);

  let Background = currentBanner?.banner;

  var sectionStyle = {
    width: "100%",
    height: "auto",
    backgroundAttachment: 'fixed',
    borderRadius: '1.5rem',
    backgroundImage: `url(${Background})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '50% 85%',
    backgroundSize: 'cover',
    zIndex: 2
  };
  // console.log('Background', sectionStyle)

  const getHomeData = () => {
    setLoader(true);
    get('/home').then((json) => {
      if (json?.statusCode == 200) {
        // console.log('home data get', json);
        setLoader(false);
        // setDestination(json?.data?.desti);
        setTours(json?.data?.tours)
        setExperiences(json?.data?.exp)
        setDestinations(json?.data?.desti)
        setTestimonial(json?.data?.testi)
        setGallery(json?.data?.gallery)
      } else {
        throw 'Something Went Wrong'
      }
    }).catch((err) => {
      console.log(err);
      setLoader(false);
      toast.error(err);
    });
  }

  const getAffili = () => {
    get('/affili/list').then((json) => {
      if (json?.statusCode == 200) {
        setAffili(json?.data)
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  const handleProLike = (id) => {
    if (user) {
      const body = {
        token: user?.token,
        propertyId: id
      }
      post("/property/like", body)
        .then((res) => {
          // console.log('response from like property', res);
          if (res?.statusCode == 200) {
            // toast.success(res?.message);
            // getPopulers();
          } else
            toast.error(res?.error);
        })
        .catch(error => {
          console.log('error while liking property', error);
          toast.error('Something went wrong');
        })
    } else {
      navigate("/login");
    }
  }

  const compressId = (id) => {
    const temp = id.slice(id.length - 4, id.length);
    // console.log('compressing id', temp);
    return temp;
  }

  const getRatingStar = (star) => {
    if (star == 5) {
      return (
        <>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
        </>
      )
    }
    else if (star == 4) {
      return (
        <>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star-o" aria-hidden="true"></i>
        </>
      )
    }
    else if (star == 3) {
      return (
        <>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star-o" aria-hidden="true"></i>
          <i className="fa fa-star-o" aria-hidden="true"></i>
        </>
      )
    }
    else if (star == 2) {
      return (
        <>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star-o" aria-hidden="true"></i>
          <i className="fa fa-star-o" aria-hidden="true"></i>
          <i className="fa fa-star-o" aria-hidden="true"></i>
        </>
      )
    }
    else {
      return (
        <>
          <i className="fa fa-star"></i>
          <i className="fa fa-star-o" aria-hidden="true"></i>
          <i className="fa fa-star-o" aria-hidden="true"></i>
          <i className="fa fa-star-o" aria-hidden="true"></i>
          <i className="fa fa-star-o" aria-hidden="true"></i>
        </>
      )
    }
  }

  // console.log('gallery',gallery[0]?.banner)

  const destinationOpen = (item) => {

    const tempId = item?._id.slice(item?._id.length - 4, item?._id.length);
    navigate('/destinations/' + tempId + "/in-" + (item?.name).split(" ").join("-").toLowerCase());
  }
  const tourOpen = (item) => {

    const tempId = item?._id.slice(item?._id.length - 4, item?._id.length);
    navigate('/tour/' + tempId + "/in-" + (item?.name).split(" ").join("-").toLowerCase());
  }
  const experienceOpen = (item) => {

    const tempId = item?._id.slice(item?._id.length - 4, item?._id.length);
    navigate('/experience/' + tempId + "/in-" + (item?.name).split(" ").join("-").toLowerCase());
  }

  const delayPopup = () => {
    localStorage.setItem('currentpopuptime', new Date().getTime());
    setModalBox(false);
  }

  const handleValidSubmit = (e, v) => {
    setLoading(true)
    const body = {
      ...v
    }
    post('/subscribe', body)
      .then((res => {

        if (res?.statusCode == 200) {
          console.log('Subscribe', res);
          setLoading(false)
          // setModalBox(false);
          swal({
            title: res?.message,
            text: "You've successfully subscribed. Thanks for joining us!",
            icon: "success",
          })
          delayPopup();
          toast.success(res?.message)

        } else if (res?.statusCode == 208) {
          // setModalBox(false);
          delayPopup();
          toast.success(res?.message);
        } else {
          toast.error(res?.error);
          setLoading(false)
        }
      }))
      .catch(error => {
        setLoading(false)
        console.log('error while login', error);
        toast.error('Something went wrong');
      })
  }

  const checkPopup = () => {
    const cookies = localStorage.getItem('currentpopuptime');
    const timenow = new Date().getTime() - 86400000;
    if (!cookies || Number(cookies) < timenow)
      setModalBox(true);
  }

  const handleMouseEnter = () => {
    // Pause autoplay when mouse enters the Swiper
    if (swiperRef_.current && swiperAutoplay) {
      swiperRef_.current.swiper.autoplay.stop();
      setSwiperAutoplay(false);
    }
  };

  const handleMouseLeave = () => {
    // Resume autoplay when mouse leaves the Swiper
    if (swiperRef_.current && !swiperAutoplay) {
      swiperRef_.current.swiper.autoplay.start();
      setSwiperAutoplay(true);
    }
  };
  const handleMouseEnter1 = () => {
    // Pause autoplay when mouse enters the Swiper
    if (swiperRef_1.current && swiperAutoplay) {
      swiperRef_1.current.swiper.autoplay.stop();
      setSwiperAutoplay(false);
    }
  };

  const handleMouseLeave1 = () => {
    // Resume autoplay when mouse leaves the Swiper
    if (swiperRef_1.current && !swiperAutoplay) {
      swiperRef_1.current.swiper.autoplay.start();
      setSwiperAutoplay(true);
    }
  };
  const handleMouseEnter2 = () => {
    // Pause autoplay when mouse enters the Swiper
    if (swiperRef_2.current && swiperAutoplay) {
      swiperRef_2.current.swiper.autoplay.stop();
      setSwiperAutoplay(false);
    }
  };

  const handleMouseLeave2 = () => {
    // Resume autoplay when mouse leaves the Swiper
    if (swiperRef_2.current && !swiperAutoplay) {
      swiperRef_2.current.swiper.autoplay.start();
      setSwiperAutoplay(true);
    }
  };

  return (
    <>
      {
        loader && <Loader />
      }
      <Helmet>
        <title>Aahilya Holidays | Textiles | Embroidery|Craft | Block Printing.</title>
      </Helmet>
      {/**modal */}
      <div className={modalBox ? 'custome_popup active ' : 'custome_popup'}>
        <div className={modalBox ? 'container_section active' : 'container_section'}>
          <div className='popup_left_box'>
            <img src={require('../src/assets2/images/left2.jpeg')} alt="left.png" />
          </div>
          <div className='right_section_popup'>
            <button className='close_btn' onClick={delayPopup}>
              <img src={require('../src/assets2/images/close.png')} alt="close.png" />
            </button>
            <h1>Don't miss out on the adventure of a
              lifetime - join our community of passionate travelers today!</h1>
            <p>Sign up for our email subscription to receive the latest travel tips, exclusive deals, and insider information on the world's most breathtaking Aahilya Holidays.</p>
            <AvForm onValidSubmit={handleValidSubmit} className="subscribe_form">
              <div className='row'>
                <div className='col-md-6'>
                  <AvField name="name" placeholder='Full Name' required errorMessage={"This field is required!"} />

                </div>
                <div className='col-md-6'>
                  <AvField name="email" placeholder='Email Address' required errorMessage={"This field is required!"} />
                </div>
              </div>
              {/* <input type="email" name="" value="" placeholder='Email Address' /> */}
              <button type="submit">
                <span>  Subscribe now</span>
                {loading &&
                  <div className="spiner_box_c spiner_box_d">
                    <img src={require('./assets2/images/loading-buffering.gif')} />
                  </div>
                }
              </button>
            </AvForm>
            <h6>Subscribe to receive Latest emails from Aahilya Holidays.<br />
              Read our <a href="#">Privacy Policy</a>.
            </h6>
          </div>
        </div>
      </div>
      <div className={modalBox ? 'overflow active' : 'overflow'}>
      </div>
      <div id="tg-wrapper" className="tg-wrapper tg-haslayout">
        <div className="banner_video tg_innerbanner" style={{ marginBottom: '-6px' }}>
          <div className="space_">
            <div>
              <h3 className="line-1 anim-typewriter">{banner?.title}</h3>
              <h5>{banner?.subTitle}</h5>
            </div>
          </div>
          {/* <video src={banner?.home?.video} poster={require('./assets2/images/bg-header.jpg')} playsInline loop muted>
            <source src="https://download.samplelib.com/mp4/sample-5s.mp4" type="video/mp4" />
            <source src={banner?.home?.video} type="video/webm" />
            <source src="https://filesamples.com/samples/video/ogv/sample_1280x720_surfing_with_audio.ogv" type="video/ogg" />
            Your browser does not support the video tag.
          </video> */}
          <video src={require('./assets2/images/banner-video_1.mp4')} poster={require('./assets2/images/bg-header.jpg')} playsInline autoPlay loop muted>
            {/* <source src="https://download.samplelib.com/mp4/sample-5s.mp4" type="video/mp4" /> */}
            {/* <source src={banner?.home?.video} type="video/webm" /> */}
            {/* <source src="https://filesamples.com/samples/video/ogv/sample_1280x720_surfing_with_audio.ogv" type="video/ogg" /> */}
            Your browser does not support the video tag.
          </video>
        </div>
        <section className="height" style={{ background: '#22968e' }}></section>
        <main id="tg-main" className="tg-main tg-haslayout">
          <section className="tg-parallax tg-parallax_one Upcoming_Tours" data-appear-top-offset="600" data-parallax="scroll"
            data-image-src="">
            <div className="tg-sectionspace tg-haslayout py_5">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="tg-sectiontitle tg-sectiontitleleft just_ pbd_60" style={{ position: 'relative' }}>
                      <h2 className='Upcoming_Tours' ><Link to='/group-tours'>Upcoming Tours</Link></h2>
                      <img src={require('./assets2/images/tile-heading-2w.png')} />
                      <Link className='view_more_btn' to='/group-tours'>View More</Link>

                    </div>
                    <div id="tg-populartoursslider"
                      className="tg-populartoursslider tg-populartours owl-carousel"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <Swiper
                        slidesPerView={1}
                        spaceBetween={10}
                        autoplay={{
                          delay: 3500
                        }}
                        breakpoints={{
                          640: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                          },
                          768: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                          },
                          1024: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                          },
                        }}
                        onBeforeInit={(swiper) => {
                          swiperRef.current = swiper;
                        }}
                        ref={swiperRef_}
                        navigation={false}
                        modules={[Autoplay, Navigation]}
                        className="mySwiper slider_list"
                      >
                        {tours?.map((item, index) => (
                          <SwiperSlide key={index}>
                            <a style={{ textDecoration: 'none' }} onClick={() => tourOpen(item)}>
                              <div className="item tg-populartour">
                                <figure>
                                  <img src={item?.banner}
                                    alt="image destinations" />
                                  {/* <!-- <span className="tg-descount">25% Off</span> --> */}
                                </figure>
                                <div className="tg-populartourcontent">
                                  <div className='content-box-section'>
                                    <div className="tg-populartourtitle">
                                      <h3><a>{item?.name}</a></h3>
                                    </div>
                                    <div className="tg-description">
                                      <p>{item?.overview?.length > 200 ? item?.overview?.substring(0, 200) + "..." : item?.overview}</p>
                                    </div>
                                  </div>
                                  <div className="tg-populartourfoot">
                                    <div className="tg-durationrating">
                                      <span className="tg-tourduration">{item?.itin?.length} Days</span>
                                      <span className="tg-stars"><span></span></span>
                                      <em>(5 Review)</em>
                                      <em style={{ marginTop: '2px', textAlign: 'left' }}>{item?.travelDate?.map((item1, index) => (<p style={{ fontSize: '15px', marginTop: '2px', marginBottom: 0 }}>{item1}</p>))}</em>
                                    </div>
                                    <div className="tg-pricearea">
                                      <span>from</span>
                                      <h4>{item?.amount}</h4>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </a>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                      <div className='navigation_slider_btn navigation_slider_btn_one'>
                        <div onClick={() => swiperRef.current?.slidePrev()} className="swiper-button-prev">
                        </div>
                        <div className='view_more_gallery upcomming_t mb-0'>
                        <Link to="/group-tours">View More</Link>
                         </div>
                        <div onClick={() => swiperRef.current?.slideNext()} className="swiper-button-next">
                        </div>
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="tg-parallax Top_Destinations" data-appear-top-offset="600" data-parallax="scroll" data-image-src="">
            <div className="tg-sectionspace tg-haslayout py_5 padding_top_m">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="tg-sectiontitle tg-sectiontitleleft just_">
                      <h2>Top Destinations</h2>
                      <img src={require('./assets2/images/tile-heading-1.png')} />
                    </div>
                    <div id="tg-populartourssliderone"
                      className="tg-populartoursslider tg-populartours owl-carousel populartoursslidertwo"
                      onMouseEnter={handleMouseEnter1}
                      onMouseLeave={handleMouseLeave1}>
                      <Swiper
                        slidesPerView={1}
                        spaceBetween={10}
                        autoplay={{
                          delay: 3500,
                          disableOnInteraction: false,
                        }}
                        breakpoints={{
                          640: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                          },
                          768: {
                            slidesPerView: 3,
                            spaceBetween: 10,
                          },
                          1024: {
                            slidesPerView: 3,
                            spaceBetween: 10,
                          },
                        }}

                        onBeforeInit={(swiper) => {
                          swiperRef2.current = swiper;
                        }}
                        ref={swiperRef_1}
                        modules={[Autoplay, Navigation]}
                        className="mySwiper "
                      >
                        {destinations?.map((item, index) => (
                          <SwiperSlide key={index}>
                            <a style={{ textDecoration: 'none' }} onClick={() => destinationOpen(item)}>
                              <div className="item tg-populartour">
                                <figure>
                                  <img src={item?.images[0]}
                                    alt="image destinations" />

                                  {/* <!-- <strong>INDONESIA</strong> --> */}

                                  <span className="tg-descount">{item?.name}</span>
                                </figure>
                              </div>
                            </a>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                      <div className='navigation_slider_btn navigation_slider_two'>
                        <div onClick={() => swiperRef2.current?.slidePrev()} className="swiper-button-prev">
                        </div>
                        <div onClick={() => swiperRef2.current?.slideNext()} className="swiper-button-next">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="tg-parallax Experiences" data-appear-top-offset="600" data-parallax="scroll" data-image-src="">
            <div className="tg-sectionspace tg-haslayout py_5 bg-gray">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="tg-sectiontitle tg-sectiontitleleft just_">
                      <h2>Experiences</h2>

                      <img src={require('./assets2/images/tile-heading-1.png')} />
                    </div>

                    <div id="tg-experiences"
                      className="tg-populartoursslider tg-populartours owl-carousel populartoursslidertwo"
                      onMouseEnter={handleMouseEnter2}
                      onMouseLeave={handleMouseLeave2}>
                      <Swiper
                        slidesPerView={1}
                        spaceBetween={10}
                        autoplay={{
                          delay: 3500,
                          disableOnInteraction: false,
                        }}
                        breakpoints={{
                          640: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                          },
                          768: {
                            slidesPerView: 3,
                            spaceBetween: 10,
                          },
                          1024: {
                            slidesPerView: 3,
                            spaceBetween: 10,
                          },
                        }}
                        onBeforeInit={(swiper) => {
                          swiperRef3.current = swiper;
                        }}
                        ref={swiperRef_2}
                        modules={[Autoplay, Navigation]}
                        className="mySwiper "
                      >
                        {experiences?.map((item, index) => (
                          <SwiperSlide key={index}>
                            <a style={{ textDecoration: 'none' }} onClick={() => experienceOpen(item)}>
                              <div className="item tg-populartour">
                                <figure>
                                  <img src={item?.banner}
                                    alt="image destinations" />

                                  {/* <!-- <strong>INDONESIA</strong> --> */}

                                  <span className="tg-descount">{item?.name}</span>
                                </figure>
                              </div>
                            </a>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                      <div className='navigation_slider_btn navigation_slider_btn_three'>
                        <div onClick={() => swiperRef3.current?.slidePrev()} className="swiper-button-prev">


                        </div>
                        <div onClick={() => swiperRef3.current?.slideNext()} className="swiper-button-next">

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="fixed_images_bg tg-sectionspace tg-haslayout">

            <div className="fixed_images">
              <div className='overlay_b'></div>
              <Link to="/group-tours">
                <h1>Travel with purpose and experience culture.</h1>
              </Link>
            </div>

          </section>
          <section className="tg-parallax" data-appear-top-offset="600" data-parallax="scroll" data-image-src="">
            <div className="tg-sectionspace tg-haslayout tg_haslayout_paddb ">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="tg-sectiontitle tg-sectiontitleleft just_ " style={{ float: 'initial' }}>
                      <h2>Testimonial</h2>

                      <img src={require('./assets2/images/tile-heading-1.png')} />
                    </div>
                    <div className="row p-0 teatimonial_row">
                      <div className="col-lg-6 p-0">
                        <div className="left_video_section">
                          <img src={require('./assets2/images/video-bg.png')} className="thumb" alt="" />
                          <Link id="play-video"
                            className="video-play-button" to="/testimonial/hear_from_our_guests">
                            <img src={require('./assets2/images/play.png')} alt="" />
                          </Link>
                        </div>
                      </div>
                      <div className="col-lg-6 testimonial_sliser_testi">
                        <div className="swiper testimonial_sliser">
                          <div className="swiper-wrapper">


                            <Swiper
                              slidesPerView={1}
                              spaceBetween={10}
                              autoplay={{
                                delay: 3500,
                                disableOnInteraction: false,
                              }}
                              breakpoints={{
                                640: {
                                  slidesPerView: 1,
                                  spaceBetween: 10,
                                },
                                768: {
                                  slidesPerView: 1,
                                  spaceBetween: 10,
                                },
                                1024: {
                                  slidesPerView: 1,
                                  spaceBetween: 10,
                                },
                              }}
                              onBeforeInit={(swiper) => {
                                swiperRef1.current = swiper;
                              }}


                              modules={[Autoplay, Navigation]}
                              className="mySwiper "
                            >
                              {testimonial?.map((item, index) => (
                                <SwiperSlide key={index}>
                                  <Link style={{ textDecoration: 'none' }} to='/testimonial' >
                                    <div className="swiper-slide">
                                      <div className="profile_box">
                                        <div className="profile_h">
                                          {/* <div className="profile_img">
                                                        <img src="https://webmitr.com/PROJECTS/Test3/ilam-new/assets/images/profile.png" alt="" />
                                                    </div>  */}
                                          <div className="profile_content">
                                            <h3>{item?.name}</h3>
                                            <p>{item?.date}</p>
                                          </div>
                                        </div>
                                        <p>
                                          {
                                            item?.desc
                                          }
                                        </p>
                                        <div className="review_star">
                                          {getRatingStar(item?.rating)}
                                          {/* <i className="fa fa-star"></i>
                                          <i className="fa fa-star"></i>
                                          <i className="fa fa-star"></i>
                                          <i className="fa fa-star-o"></i> */}
                                        </div>
                                      </div>
                                    </div>
                                  </Link>
                                </SwiperSlide>
                              ))}
                            </Swiper>
                          </div>
                          <div className="swiper_pagination_t"></div>

                          <div onClick={() => swiperRef1.current?.slidePrev()} className="swiper-button-prev swiper_button_prev swiper_button_prev_t"></div>
                          <div onClick={() => swiperRef1.current?.slideNext()} className="swiper-button-next swiper_button_next swiper_button_next_t"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="tg-parallax pb-0 pt-0" data-appear-top-offset="600" data-parallax="scroll" data-image-src="">
            <div className="tg-sectionspace tg-haslayout pb-0 pt-0 tg_haslayout_padd_to" style={{ paddingTop: 0 }}>
              <div className="tg-sectiontitle tg-sectiontitleleft just_ ">
                <h2>Gallery</h2>
                <img src={require('./assets2/images/tile-heading-1.png')} />
              </div>
              <div className="gallery_section_box">
                {
                  gallery?.map((item, index) => (
                    <div className="gallery_img_box" key={index}>
                      <img src={item?.banner} alt="" />
                    </div>
                  ))
                }

              </div>
              <div className='view_more_gallery'>
                <Link to="/gallery">View More</Link>
              </div>

            </div>
          </section>
          <section className="tg-parallax pb-0">
            <div className="tg-sectiontitle tg-sectiontitleleft just_ pb-0" style={{ marginTop: 40 }}>
              <h2>Instagram</h2>
              <img src={require('./assets2/images/tile-heading-1.png')} />
            </div>
            <div className="insta_section">
              <div className="elfsight-app-35b21566-853b-4fb2-bcfc-1385a06c0e34"></div>
            </div>
          </section>
          <section className="tg-parallax pb-0">
            <div className="tg-sectionspace tg-haslayout pb-0">
              <div className="tg-sectiontitle tg-sectiontitleleft just_">
                <h2>Our Affiliations</h2>
                <img src={require('./assets2/images/tile-heading-1.png')} />
              </div>
              <div className="footer_logo">
                {/* <Swiper
                  slidesPerView={1}
                  spaceBetween={10}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  breakpoints={{
                    640: {
                      slidesPerView: 2,
                      spaceBetween: 10,
                    },
                    768: {
                      slidesPerView: 3,
                      spaceBetween: 10,
                    },
                    1024: {
                      slidesPerView: 4,
                      spaceBetween: 10,
                    },
                  }}

                  // centeredSlides='true'
                  loop={false}

                  modules={[Autoplay, Navigation]}
                  className="mySwiper footer_slider"
                >
                  {affili?.map((item, index) => (
                    <>
                      <SwiperSlide key={index}>
                        <ul>
                          <li><img src={item?.image} /></li>
                        </ul>
                      </SwiperSlide>

                    </>
                  ))}
                </Swiper> */}


                <ul>
                  {affili?.map((item, index) => (
                    <>
                      <li key={index}><img src={item?.image} /></li>
                    </>
                  ))}
                </ul>


              </div>
            </div>
          </section>
        </main >
      </div >
    </>
  )
}
