import { AvForm, AvField } from 'availity-reactstrap-validation'
import React, { useEffect, useState } from 'react'
import { post } from './helper/helper_api'
import { toast } from 'react-toastify'
import { projectName } from './Utils';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import swal from 'sweetalert';
import { useRef } from 'react';


export default function Footer(props) {

  const navigate = useNavigate();
  const { headerData } = props;
  const [contis, setContis] = useState([]);
  const [experience, setExperience] = useState([]);
  const [month, setMonth] = useState([]);
  const [isDisclaimer, setIsDisclaimer] = useState(false);
  const [headerDatas, setHeaderDatas] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const myForm = useRef();

  const [showTopBtn, setShowTopBtn] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  useEffect(() => {
    if (headerData?.desti)
      setHeaderDatas(headerData?.desti)
  }, [headerData])

  const handleValidInquiry = (e, v) => {
    const body = {
      ...v
    }
    post('/query/add', body)
      .then((res => {
        console.log('response from subscribe');
        if (res?.statusCode == 200)
          toast.success(res?.message);
        else
          toast.error(res?.error);
      }))
      .catch(error => {
        console.log('error while subscribing', error);
        toast.error('Something went wrong');
      })
  }

  useEffect(() => {
    let time = null;
    const getData = async () => {
      const item = await localStorage.getItem('policy');
      console.log('policy from storage', item);
      if (!item)
        time = setTimeout(() => {
          setIsDisclaimer(true)
        }, 3000);
    }
    getData();
    return () => clearTimeout(time);
  }, []);

  useEffect(() => {
    // console.log(headerData);
    if (headerData) {
      setContis(headerData?.destination);
      setExperience(headerData?.experiences);
      setMonth(headerData?.months);
    }
  }, [headerData]);

  const handleOkayDisclaimer = () => {
    setIsDisclaimer(false);
    localStorage.setItem('policy', 'agreed');
  }

  const compressId = (id) => {
    const temp = id.slice(id.length - 4, id.length);
    // console.log('compressing id', temp);
    return temp;
  }

  const destinationOpen = (item) => {

    const tempId = item?._id.slice(item?._id.length - 4, item?._id.length);
    navigate('/destinations/' + tempId + "/" + (item?.name).split(" ").join("-").toLowerCase());
  }

  const handleValidSubmit = (e, v) => {
    setIsSending(true);
    const body = {
      ...v
    }
    post('/subscribe', body)
      .then((res => {
        setIsSending(false);
        if (res?.statusCode == 200) {
          console.log('Subscribe', res);
          swal({
            title: res?.message,
            text: "You've successfully subscribed. Thanks for joining us!",
            icon: "success",
          })
          toast.success(res?.message)
          // setLoading(false)
          myForm?.current?.reset();
        } else if (res?.statusCode == 208) {
          toast.success(res?.message);
          myForm?.current?.reset();
        } else {
          toast.error(res?.error);
          // setLoading(false)
        }
      }))
      .catch(error => {
        setIsSending(false);
        console.log('error while login', error);
        toast.error('Something went wrong');
      })
  }



  useEffect(() => {
    let time = null;
    const getData = async () => {
      const item = await localStorage.getItem('policy');
      console.log('policy from storage', item);
      if (!item)
        time = setTimeout(() => {
          setIsDisclaimer(true)
        }, 3000);
    }
    getData();
    return () => clearTimeout(time);
  }, []);


  return (
    <>

      <div id="notify"></div>
      <footer id="tg-footer" className="tg-footer tg-haslayout">
        <div className="tg-fourcolumns">

          <div className="container">
            <div className="row">
              <div className="col-xs-6 col-sm-6 col-md-5 col-lg-5">
                <div className="tg-footercolumn tg-widget tg-widgettext">
                  <div className="tg-widgettitle">
                    <h3>Get in Touch</h3>
                  </div>
                  <div className="tg-widgetcontent">
                    <div className="tg-description">
                      <ul className="footer_add">
                        {/* <li>Director: Isha Sharma BBA MBA (Marketing & Tourism)</li> */}
                        {/* <li><i className="fa fa-phone"></i> +91 9871476077</li> */}
                        {/* <li>Director: Anup Singh Rana B.Com MBA (Tourism)</li> */}
                        {/* <li><i className="fa fa-phone" aria-hidden="true"></i> +91 9871476099</li> */}
                        <li><h3>Aahilya Holidays (Registered Address):</h3></li>
                        <li><i className="fa fa-map" aria-hidden="true"></i>
                          C-125, Sector-1, Rohini, Delhi -110085</li>
                        <li><i className="fa fa-phone" aria-hidden="true"></i> +91 9871476077</li>
                        <li><div className='py-5 my-3'></div></li>
                        <li><h3>Aahilya Holidays (Office Address):</h3></li>
                        <li><i className="fa fa-map" aria-hidden="true"></i>
                          G-31, Level-2, Palam Vihar, Gurugram -122017</li>
                        <li><i className="fa fa-phone" aria-hidden="true"></i> +91 9910510875</li>
                        <li>
                          <a href="mailto:info@aahilyaholidays.com">
                            <i className="fa fa-envelope" aria-hidden="true"></i>
                            info@aahilyaholidays.com
                          </a>
                        </li>
                      </ul>
                    </div>
                    <ul className="tg-socialicons tg-socialiconsvtwo">
                      <li>
                        <a href=" https://www.pinterest.co.uk/Aahilyaholidays2022/_created/" target="_blank">
                          <img src={require('./assets2/images/icons/pint.png')} alt="image destinations" />
                        </a>
                      </li>
                      <li>
                        <a href="https://youtube.com/@aahilyaholidays" target="_blank" >
                          <img src={require('./assets2/images/icons/youtube-icon.png')} />
                        </a>
                      </li>
                      <li>
                        <a href="https://www.facebook.com/aahilyaholidayss/" target="_blank" >
                          <img src={require('./assets2/images/icons/facebook.png')} />
                        </a>
                      </li>
                      <li>
                        <a href="https://www.instagram.com/aahilyaholidays/" target="_blank">
                          <img src={require('./assets2/images/icons/instagram.png')} />
                        </a>
                      </li>
                    </ul>
                    <ul>
                      <li>All our international flights are ATOL protected. Please refer terms and conditions for more details</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xs-6 col-sm-6 col-md-3 col-lg-3">
                <div className="tg-footercolumn tg-widget tg-widgetdestinations">
                  <div className="tg-widgettitle">
                    <h3>Top Destinations</h3>
                  </div>
                  <div className="tg-widgetcontent">
                    <ul className='mb_30px_ul'>
                      {
                        headerDatas?.map((item, i) => (
                          <li><a onClick={() => destinationOpen(item)}>{item?.name}</a></li>
                        ))
                      }
                    </ul>
                    {/* <div className='trust_pilot_logo'>
                    <a href='https://www.trustpilot.com/review/aahilyaholidays.com' target='_blank'><img src={require('./assets2/images/trust-pilot-logo_.jpg')} /></a>
                  </div> */}
                  </div>
                  
                </div>
              </div>
              <div className="col-xs-6 col-sm-6 col-md-4 col-lg-4">
                <div className="tg-footercolumn tg-widget tg-widgetnewsletter">
                  <div className="tg-widgettitle">
                    <h3>Newsletter</h3>
                  </div>
                  <div className="tg-widgetcontent">
                    <div className="tg-description"><p>Sign up for our mailing list to get latest updates and offers</p></div>
                    <AvForm onValidSubmit={handleValidSubmit} ref={myForm} className="tg-formtheme tg-formnewsletter">
                      <AvField name="name" placeholder='Full Name' validate={{
                        required: { value: true, errorMessage: "This field is required!" },
                      }} />
                      <fieldset className='footer_form'>
                        <AvField name="email" placeholder='Email Address' validate={{
                          required: { value: true, errorMessage: "This field is required!" },
                        }} />
                        {isSending ?
                          <button type="button" id="newletter_submit"><img src={require('./assets2/images/loading-buffering.gif')} style={{ width: 30, height: 30 }} alt="image destinations" /></button>
                          :
                          <button type="submit" id="newletter_submit"><img src={require('./assets2/images/icons/icon-08.png')} alt="image destinations" /></button>
                        }
                      </fieldset>
                    </AvForm>

                    <span>We respect your privacy</span>
                    <h4 className="additional">Additional Resources</h4>
                    <ul>
                      <li><a href={require('./assets2/images/Useful-Links.pdf')} target="_blank">Useful links</a></li>
                      <li><a href={require('./assets2/images/T&C.pdf')} target="_blank">Terms & Conditions</a></li>
                      <li><a href={require('./assets2/images/General-Information.pdf')} target="_blank">General Information</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="tg-footerbar">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <p>Copyright &copy; {new Date().getFullYear()} Aahilya Holidays. All Rights Reserved.</p>
              </div>
            </div>
          </div>
        </div>

      </footer >
      <div style={{ marginTop: 20 }} className={isDisclaimer ? 'disclaimer active' : 'disclaimer'}>
        <div>
          <h2 style={{ color: '#fff' }}>Agree to policies</h2>
          <p style={{ fontSize: 12, margin: 0 }} >
            By continuing to use this website, you agree to our <a href={require('./assets2/images/T&C.pdf')} target='_blank' style={{ color: '#e752a8', textDecoration: 'none' }}>privacy policy</a>, use of cookies, and <a target='_blank' style={{ color: '#e752a8', textDecoration: 'none' }} href={require('./assets2/images/General-Information.pdf')}>General Information</a>.
          </p>
        </div>
        <Button onClick={handleOkayDisclaimer} >Okay, Got it</Button>
      </div>

      <div className='fixed_call'>
        <a className='call_action' href="https://api.whatsapp.com/send?phone=919910510875" target="_blank"><i class="fa fa-whatsapp"></i></a>
        
        <a id="tg-btnscrolltop" className={showTopBtn == false ? 'tg-btnscrolltop' : 'tg-btnscrolltop active'} onClick={goToTop} href="javascript:void(0);">
          <i className="fa fa-arrow-up"></i>
        </a>
      </div>

    </>
  )
}
