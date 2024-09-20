import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { get, post } from './helper/helper_api';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useSelector, useDispatch } from 'react-redux';
import { login } from './store/auth/login/reducer';
import { toast } from 'react-toastify';
import Mmenu from "mmenu-js";
import "mmenu-js/dist/mmenu.css";
let menuInit = false;
export default function (props) {

  let navigate = useNavigate();

  let location = useLocation();

  // const [stickyClass, setStickyClass] = useState('relative');
  const [toggle, setToggle] = useState(false);
  const user = useSelector((state) => state.user.user);
  const [destination, setDestination] = useState([]);
  const [tours, setTours] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [home, setHome] = useState([]);
  const [months, setMonths] = useState([]);
  const [whos, setWhos] = useState([]);
  const [active, setActive] = useState(0);
  const [currentItem, setCurrentItem] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dispatch = useDispatch();
  const [toasts, setToasts] = useState([]);
  const [currentY, setCurrentY] = useState(0);
  const [currentLY, setCurrentLY] = useState(0);
  const [stickyClass, setStickyClass] = useState("slideDown");
  const [toggleMenu, setToggleMenu] = useState(false);
  const [toggleMenuTwo, setToggleMenuTwo] = useState(false);
  const [experiencesMenu, setExperiencesMenu] = useState(false);
  const [whoMenu, setWhoMenu] = useState(false);
  const [monthsMenu, setMonthsMenu] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeIndex, setActiveIndex] = useState('')
  useEffect(() => {
    window.scrollTo(0, 0);
    getData();
  }, []);

  useEffect(() => {
    // Init Mmenu (use of outside let because of
    // strict mode triggering twice)
    if (!menuInit) {
      menuInit = true;

      new Mmenu("#menu", {
        offCanvas: {
          use: false
        },
        counters: {
          add: true
        },
        setSelected: {
          hover: true
        },
        navbars: [
          {
            position: "top",
            content: ["searchfield"]
          }
        ]
      });
    }
  }, []);


  const getData = async () => {
    const user = JSON.parse(await localStorage.getItem("user"));
    dispatch(login(user));
    get('/home/header').then((json) => {
      if (json?.statusCode == 200) {
        // console.log('destination category', json);
        if (props?.setHeaderData)
          props?.setHeaderData(json?.data);
        setDestination(json?.data?.desti);
        setTours(json?.data?.tours)
        setExperiences(json?.data?.exp)
        setHome(json?.data?.exp)
        // if (props?.setContis) {
        //   let arr = Object.assign([], json?.data?.destination);
        //   shuffle(arr);
        // }
        // setExperiences(json?.data?.experiences);
        // if (props?.setExperience)
        //   props?.setExperience(json?.data?.experiences);
        // setWhos(json?.data?.whos);
        // if (props?.setWhos)
        //   props?.setWhos(json?.data?.whos);
        // setMonths(json?.data?.months);
        // if (props?.setMonth)
        //   props?.setMonth(json?.data?.months);
      }

    }).catch((err) => {
      console.log(err);
    });


  }

  useEffect(() => {
    if (toasts?.length > 0) {
      const interval = setInterval(() => {
        let currentItem = toasts?.[Math.floor((Math.random() * toasts?.length))];
        // console.log('reviews to toast', toasts, currentItem);
        let toastId = 'update';
        if (!toast.isActive(toastId)) {
          if (currentItem?.type == 'review')
            toastId = toast.success(currentItem?.name + " " + currentItem?.type + " " + currentItem?.title + " to " + currentItem?.prop, {
              toastId: toastId
            });
          else
            toast.success(currentItem?.name + " " + currentItem?.type + " " + currentItem?.prop, {
              toastId: toastId
            });
        }
      }, 5 * 60000);
      return () => clearTimeout(interval);
    }
  }, [toasts]);

  function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    props?.setContis(array);
  }

  const openConti = (item) => {
    setToggleMenu(false);
    setToggleMenuTwo(false);
    const tempId = item?._id.slice(item?._id.length - 4, item?._id.length);
    navigate('/continent/' + tempId + "/" + "top-travel-destinations-in-" + (item?.name).split(" ").join("-").toLowerCase());
  }

  const openCountry = (id, conti, name) => {
    setToggleMenu(false);
    setToggleMenuTwo(false);
    const tempId = id.slice(id.length - 4, id.length);
    navigate('/country/' + tempId + "/top-travel-destinations-in-" + (conti).split(" ").join("-").toLowerCase() + "-" + (name).toLowerCase());
  }

  const openExp = (item) => {
    setToggleMenu(false);
    setExperiencesMenu(false);
    const tempId = item?._id.slice(item?._id.length - 4, item?._id.length);
    navigate('/experience/' + tempId + "/" + "top-travel-destinations-in-" + (item?.name).split(" ").join("-").toLowerCase());
  }

  const openMonth = (item) => {
    setToggleMenu(false);
    setMonthsMenu(false);
    const tempId = item?._id.slice(item?._id.length - 4, item?._id.length);
    navigate('/month/' + tempId + "/" + "top-travel-destinations-in-" + (item?.name).split(" ").join("-").toLowerCase());
  }

  const openWho = (item) => {
    setToggleMenu(false);
    setWhoMenu(false);
    const tempId = item?._id.slice(item?._id.length - 4, item?._id.length);
    navigate('/who/' + tempId + "/" + "top-travel-destinations-for-" + (item?.name).split(" ").join("-").toLowerCase());
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

  // sticky nav

  // const stickNavbar = () => {
  //   let windowHeight = window.scrollY;
  //   setCurrentY(windowHeight);
  //   // console.log('windowHeight', currentY, windowHeight);
  // }

  // useEffect(() => {
  //   window.addEventListener("scroll", stickNavbar);
  // }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    dispatch(login(null));
  }

  const destinationOpen = (item) => {

    const tempId = item?._id.slice(item?._id.length - 4, item?._id.length);
    navigate('/destinations/' + tempId + "/" + (item?.name).split(" ").join("-").toLowerCase());
  }
  const tourOpen = (item) => {

    const tempId = item?._id.slice(item?._id.length - 4, item?._id.length);
    navigate('/tour/' + tempId + "/" + (item?.name).split("-").join("").split(" ").join("-").toLowerCase());
  }
  const experienceOpen = (item) => {

    const tempId = item?._id.slice(item?._id.length - 4, item?._id.length);
    navigate('/experience/' + tempId + "/" + (item?.name).split(" ").join("-").toLowerCase());
  }

  // console.log('destinationdestination',destination)
  const isActiveLink = (item, type) => {

    const tempId = item?._id.slice(item?._id.length - 4, item?._id.length);
    let pathname = `/${type}/` + tempId + "/" + (item?.name).split(" ").join("-").toLowerCase();

    return location.pathname === pathname;
  };
  const isActiveLink1 = (pathname, pathname2) => {
    //  console.log('pathname',pathname, location.pathname?.split('/')[1]) 
    if ('/' + location.pathname?.split('/')[1] === pathname)
      return true;
    else if ('/' + location.pathname?.split('/')[1] === pathname2)
      return true;
    else return false;
  };
  // const isActiveLink2 = (pathname, pathname2) => {
  //   //  console.log('pathname',pathname, location.pathname?.split('/')[1]) 
  //   if ('/' + location.pathname?.split('/')?.length > 1 === pathname)
  //     return true;
  //   else if ('/' + location.pathname?.split('/')?.length < 1 === pathname2)
  //     return true;
  //   else return false;
  // };

  return (
    <>
      {/* <Helmet> */}
      {/* <script src="./vendors/navx/js/navigation.min.js"></script> */}
      {/* <script src="./js/main.js"></script> */}
      {/* </Helmet> */}
      <header id="tg-header" className={mobileMenu == true ? `tg-header tg-haslayout active animated` : `animated tg-header tg-haslayout`}>
        <div className="container-fluid">
          <div className="row">
            <div className="tg-topbar">
              <nav className="tg-infonav">
                <ul>

                  <li>
                    <i class="fa fa-phone" aria-hidden="true"></i>
                    <span><a href='tel:919910510875'>+91 9910510875</a></span>
                  </li>
                  <li>
                    <i class="fa fa-envelope" aria-hidden="true"></i>
                    <span><a href='mailto:info@aahilyaholidays.com'>info@aahilyaholidays.com</a> </span>
                  </li>
                </ul>
              </nav>
              <div className="tg-addnavcartsearch">
                <nav className="tg-cartsearch">
                  <ul className='mobile_view_number'>
                    <li>
                      <i class="fa fa-phone" aria-hidden="true"></i>
                      <span><a href='tel:919910510875'>+91 9910510875</a></span>
                    </li>
                  </ul>
                  <ul>

                    {/* <li className='trust_pilot_'>
                      <a href='https://www.trustpilot.com/review/aahilyaholidays.com' target='_blank'><img src={require('./assets2/images/trust-pilot-logo.png')} /></a>
                    </li> */}
                    <li>
                      <a href=" https://www.pinterest.co.uk/Aahilyaholidays2022/_created/"
                        target="_blank"><img src={require('./assets2/images/icons/pint.png')} alt="image destinations" /></a>
                    </li>
                    <li>
                      <a href="https://youtube.com/@aahilyaholidays" target="_blank"><img
                        src={require('./assets2/images/icons/youtube-icon.png')} alt="image destinations" /></a>
                    </li>
                    <li>
                      <a href="https://www.facebook.com/aahilyaholidayss/" target="_blank"><img
                        src={require('./assets2/images/icons/facebook.png')} alt="image destinations" /></a>
                    </li>
                    <li>
                      <a href="https://www.instagram.com/aahilyaholidays/" target="_blank"><img
                        src={require('./assets2/images/icons/instagram.png')} alt="image destinations" /></a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <div className="tg-navigationarea tg-headerfixed">
              <strong className="tg-logo">
                <Link to="/"><img src={require('./assets2/images/logo.png')} alt="company logo here" /></Link>
              </strong>
              <div className="tg-socialsignin tg_socialsignin_right">
              <div className='search-icon-right'>
                  <Link to="/search"><i class="fa fa-search" aria-hidden="true"></i></Link>
                  </div>
                <div className="tg-userbox">
                  <Link id="tg-btnsignin" className="tg-btn" to="/contact-us"><span>Contact Us</span></Link>
                  <div className="dropdown tg-dropdown">
                    <button className="tg-btndropdown" id="tg-dropdowndashboard" type="button"
                      data-toggle="dropdown">
                      <img src="images/author/img-01.jpg" alt="image description" />
                      <span>john smith</span>
                      <i className="fa fa-caret-down"></i>
                    </button>
                    <ul className="dropdown-menu tg-dropdownusermenu" aria-labelledby="tg-dropdowndashboard">
                      <li><a href="#">Dashboard</a></li>
                      <li><a href="#">Edit Profile</a></li>
                      <li><a href="#">Sign Out</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <nav id="tg-nav" className="tg-nav">
              <div className='search-icon-right search-icon-right-mobile'>
                  <Link to="/search"><i class="fa fa-search" aria-hidden="true"></i></Link>
                  </div>
                <div className="navbar-header">
                  
                  <a href="#menu" className="navbar-toggle collapsed" onClick={() => setMobileMenu(true)}>
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </a>
                </div>
                <div id="tg-navigation" className="collapse navbar-collapse tg-navigation">
                  <ul>
                    <li className="menu-item-has-children current-menu-item">
                      <Link to="/">Home</Link>

                    </li>
                    <li className="menu-item-has-children">
                      <Link to="/top-destinations">Destinations</Link>
                      <ul className="sub-menu">
                        {
                          destination?.map((item, index) => (
                            <li key={index}><a onClick={() => destinationOpen(item)}>{item?.name}</a></li>
                          ))
                        }

                      </ul>
                    </li>
                    <li className="menu-item-has-children">
                      <Link to="/group-tours">Group Tours</Link>
                      <ul className="sub-menu sub_menu_s">
                        {
                          tours?.map((item, index) => (
                            <li key={index}><a onClick={() => tourOpen(item)}>{item?.name}</a></li>
                          ))
                        }
                      </ul>
                    </li>
                    <li className="menu-item-has-children">
                      <Link to='/experience'>Tailormade Tours</Link>
                      <ul className="sub-menu">
                        {
                          experiences?.map((item, index) => (
                            <li key={index}><a onClick={() => experienceOpen(item)}>{item?.name}</a></li>
                          ))
                        }
                      </ul>
                    </li>
                    <li className="menu-item-has-children">
                      <Link to='/blog'>Blogs</Link>
                    </li>
                    <li className="menu-item-has-children">
                      <Link to='/gallery'>Gallery</Link>
                    </li>
                    <li className="menu-item-has-children">
                      <Link to="#">About</Link>
                      <ul className="sub-menu">
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/testimonial">Testimonials</Link></li>
                        <li><Link to="/testimonial/hear_from_our_guests">Hear From Our Guests</Link></li>
                        {/* <li><a href="about-us.php#guests">Hear from our guests</a></li> */}
                      </ul>
                    </li>
                    <li><Link to="/booknow">Book Now</Link></li>
                  
                  </ul>
                  
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
      <nav id="menu">
      
        <button className='close_men_icon' onClick={() => setMobileMenu(false)}>
          <i class="fa-solid fa-xmark"></i>
        </button>
        <ul>

          <li>
            <Link to="/" className={isActiveLink1('/') ? 'activlink active' : ''} onClick={() => setMobileMenu(false)}>Home</Link>
          </li>
          <li className={isActiveLink1('/top-destinations', '/destinations') ? 'activlink active' : ''}>
            <span><Link to="/top-destinations" onClick={() => setMobileMenu(false)}>Destinations</Link></span>

            <ul>
              {
                destination?.map((item, index) => (
                  <li key={index}><a onClick={() => {
                    destinationOpen(item)
                    setMobileMenu(false)
                  }} className={isActiveLink(item, 'destinations') ? 'activlink active' : ''}>{item?.name}</a></li>
                ))
              }
            </ul>
          </li>
          <li className={isActiveLink1('/group-tours', '/tour') ? 'activlink active' : ''}>
            <span><Link to="/group-tours">Group Tours</Link></span>
            <ul>
              {
                tours?.map((item, index) => (
                  <li key={index}><a onClick={() => {
                    tourOpen(item)
                    setMobileMenu(false)
                  }} className={isActiveLink(item, 'tour') ? 'activlink active' : ''}>{item?.name}</a></li>
                ))
              }
            </ul>
          </li>
          <li className={isActiveLink1('/experience') ? 'activlink active' : ''}>
            <span><Link to='/experience'>Tailormade Holidays</Link></span>
            <ul>

              {
                experiences?.map((item, index) => (
                  <li key={index}><a onClick={() => {
                    experienceOpen(item)
                    setMobileMenu(false)
                  }} className={isActiveLink(item, 'experience') ? 'activlink active' : ''}>{item?.name}</a></li>
                ))
              }
            </ul>
          </li>
          <li>
            <Link to='/blog' className={isActiveLink1('/blog') ? 'activlink active' : ''} onClick={() => setMobileMenu(false)}>Blogs</Link>
          </li>
          <li>
            <Link to='/gallery' className={isActiveLink1('/gallery') ? 'activlink active' : ''} onClick={() => setMobileMenu(false)}>Gallery</Link>
          </li>
          <li>
            <Link to='/booknow' className={isActiveLink1('/booknow') ? 'activlink active' : ''} onClick={() => setMobileMenu(false)}>Book Now</Link>
          </li>
          <li className={isActiveLink1('/about', '/about') ? 'activlink active' : ''}>
            <span><Link to="/about" onClick={() => setMobileMenu(false)}>About Us</Link></span>
            <ul>
              <li><Link to="/about" className={isActiveLink1('/about') ? 'activlink active' : ''} onClick={() => setMobileMenu(false)}>About Us</Link></li>
              <li><Link to="/testimonial" className={isActiveLink1('/testimonial') ? 'activlink active' : ''} onClick={() => setMobileMenu(false)}>Testimonials</Link></li>
              <li><Link to="/testimonial/hear_from_our_guests" className={isActiveLink1('/testimonial/hear_from_our_guests') ? 'activlink active' : ''} onClick={() => setMobileMenu(false)}>Hear From Our Guests</Link></li>
              {/* <li>
                <Link to='/testimonial' onClick={() => setMobileMenu(false)}>Testimonials</Link>
              </li> */}
            </ul>
          </li>
          <li>
            <Link to='/contact-us' className={isActiveLink1('/contact-us') ? 'activlink active' : ''} onClick={() => setMobileMenu(false)}>Contact Us</Link>
          </li>
        </ul>
      </nav>

    </>
  )
}
