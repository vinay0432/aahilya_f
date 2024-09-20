import React, { useRef, useState } from 'react'
import { AvForm, AvField, AvGroup, AvInput, AvFeedback, AvRadioGroup, AvRadio, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { Button, Label, FormGroup, CustomInput } from 'reactstrap';
import { toast } from 'react-toastify';
import { post } from '../../helper/helper_api';
import Loader from '../../Loader';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Contact() {
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(true);
  const form = useRef();
  // console.log('user on login', user);

 useEffect(()=>{
  setTimeout(()=>{
    setLoader(false)
  },1000)
 },[])

 useEffect(()=>{
  window.scroll(0, 0);
 },[])
  const handleValidSubmit = (e, v) => {
    setLoading(true);
    const body = {
      ...v
    }
    post('/contact', body)
      .then((res => {
        setLoading(true);
        if (res?.statusCode==200){
          // console.log('request on contact', res);
          setLoading(false);
          toast.success(res?.message);
          form.current.reset();
        }else{
          toast.error(res?.error);
        }
    }))
    .catch(error=>{
      setLoading(false);
      console.log('error while login', error);
      toast.error('Something went wrong');
    })
  }
  return (
    <>
    {
      loader && <Loader />
    }
      <div id="tg-wrapper" class="tg-wrapper tg-haslayout">
        <section class="tg-parallax tg-innerbanner tg_innerbanner" >
          <div class="tg-sectionspace tg-haslayout contact_us">
            <div class="container">
              <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <h1>Contact Us</h1>


                </div>
              </div>
            </div>
          </div>
        </section>

        <main id="tg-main" class="tg-main tg-haslayout">
          <ol class="breadcrumb">
            <li><Link to="/">Home</Link></li>
            <li class="active">Contact us</li>
          </ol>
          <div class="container pt-100">
            <div class="row">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div id="tg-content" class="tg-content">
                  <ul class="tg-contactinfo">
                    <li>
                      <span class="tg-contactinfoicon"><i class="fa fa-commenting-o"></i></span>
                      <h2>Get in Touch</h2>
                      <span>Mobile: +91-9910510875</span>
                      <a href="mailto:info@aahilyaholidays.com">info@aahilyaholidays.com</a>
                    </li>
                    <li>
                      <span class="tg-contactinfoicon"><i class="icon-map-marker"></i></span>
                      <h2>Visit Our Location</h2>
                      <address>Address: C-125, Sector-1, Rohini,<br/> Delhi -110085</address>
                      {/* <a href="javascript:void(0);">Get Directions</a> */}
                    </li>

                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="form_second form_second_two ">
            <section class="footer_form footer_form_contact">
              <div class="form_main">
                <div class="form_logo_section">
                  <div class="logo_f">
                    <img src={require('../../assets2/images/logo.png')} />
                  </div>
                  <h4 class="enquiry_now">Enquire Now</h4>
                </div>
                <AvForm ref={form} onValidSubmit={handleValidSubmit}>
                  <div class="col-lg-6">
                    <AvField name="name" label="Name *" validate={{
                            required: {value: true, errorMessage: "This field is required!"},
                        }} />
                  </div>
                  <div class="col-lg-6">
                    <AvField name="email" label="Email *" validate={{
                            required: {value: true, errorMessage: "This field is required!"},
                        }} />
                  </div>
                  <div className='col-lg-12'>
                    <AvField name="mobile" type="number" label="Phone *" validate={{
                            required: {value: true, errorMessage: "This field is required!"},
                        }} />
                  </div>

                  <div className='col-lg-12'>
                    <AvField name="msg" label="Your Message *" type="textarea" validate={{
                            required: {value: true, errorMessage: "This field is required!"},
                        }} />
                  </div>
                  <div className='col-lg-12'>
                    <button type="submit" class="btn form_btn_box send_btn">
                      <span>Send</span>
                      {loading && 
                      <div class="spiner_box_c spiner_box_d">
                        <img src={require('../../assets2/images/loading-buffering.gif')} />
                      </div>
                      }
                    </button>
                  </div>
                </AvForm>

              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  )
}

export default Contact;
