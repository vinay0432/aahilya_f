import React, { useRef } from 'react'
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from 'react';
import { useEffect } from 'react';
import Loader from '../../Loader';
import { Link } from 'react-router-dom';

function About() {
  const [loader, setLoader] = useState(true);
  useEffect(()=>{
    setTimeout(()=>{
      setLoader(false)
    },1000)
   },[])
   useEffect(()=>{
    window.scroll(0, 0);
   },[])
  const swiperRef = useRef();
  return (
    <>
    {
      loader && <Loader />
    }
      <div id="tg-wrapper" className="tg-wrapper tg-haslayout">

        <div className="tg-bannerholder tg_innerbanner">

          <div className="tg-slidercontent">

            <div className="container">

              <div className="row">

                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">

                  <h1>About Us</h1>

                </div>

              </div>

            </div>

          </div>

          <div id="tg-homeslider" className="tg-homeslider owl-carousel tg-haslayout">
            <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: true,
              }}
              pagination={{
                clickable: true,
              }}
              LazyLoadImage
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
              }}
              modules={[Autoplay, Pagination, Navigation]}
              className="mySwiper banner_slide "
            >
              <SwiperSlide style={{ cursor: 'pointer' }}>
                <figure className="item inner_slider" data-vide-bg=""
                  data-vide-options="position: 0% 50%">
                  <img src={require('../../assets2/images/about-us-banner.jpg')} alt="" />
                </figure>
              </SwiperSlide>
              <SwiperSlide style={{ cursor: 'pointer' }}>
                <figure className="item inner_slider" data-vide-bg=""
                  data-vide-options="position: 0% 50%">
                  <img src={require('../../assets2/images/about-us-banner_1.jpg')} alt="" />
                </figure>
              </SwiperSlide>
              <SwiperSlide style={{ cursor: 'pointer' }}>
                <figure className="item inner_slider" data-vide-bg=""
                  data-vide-options="position: 0% 50%">
                  <img src={require('../../assets2/images/about-us-banner_2.jpg')} alt="" />
                </figure>
              </SwiperSlide>
              <SwiperSlide style={{ cursor: 'pointer' }}>
                <figure className="item inner_slider" data-vide-bg=""
                  data-vide-options="position: 0% 50%">
                  <img src={require('../../assets2/images/about-us-banner_3.jpg')} alt="" />
                </figure>
              </SwiperSlide>
            </Swiper>


          </div>

        </div>


        <main id="tg-main" className="tg-main tg-haslayout">
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item" aria-current="page">About Us</li>
               
            </ol>
        </nav>


          <section className="sec_overview pt-100 pb-0" id="about">

            <div className="container-fluid">

              <div className="row">

                <div className="col-md-10 col-mn">

                  <div className="tg-sectiontitle tg-sectiontitleleft just_">

                    <h2>About us</h2>

                    <img src={require('../../assets2/images/tile-heading-1.png')} />

                  </div>

                  <div className="d_detail">

                    <p>

                      Aahilya Holidays are perfect for you if you just love stitch, embroidery, block
                      printing, quilting and textile art. We specialise in really unique holidays that go
                      off the normal tourist route and

                      onto the off the beaten track. We love to explore rural villages, traditional
                      textile techniques which honour the ethnic culture of each country that we visit.
                      Always looking out for colour, culture,

                      patterns and people, you will discover India presents a feast for the senses. On our
                      textile trips, we really want to find the real event with the real people by taking
                      you places that you did not

                      even know existed. Some of our textile holidays are aimed at those who like a little
                      more comfort - such as in Jaipur, we stay for the whole holiday in one hotel and
                      take little day trips out from

                      that one base. However, some of our textile trips are more intrepid - we have our
                      own coach which travels around a specific area - such as the embroidery holidays -
                      moving onto the next attraction

                      each day. Whatever you love to do and see, you will be delighted at our magnificent
                      little daily adventures together. So if you need a holiday that is for you,
                      featuring visits to what you love, then

                      our Aahilya Textile Holidays are designed for you! Come, enjoy and make new friends
                      too. With a friend, a partner, a family member, or by yourself - we are all together
                      having the time of our lives.

                    </p>

                    <p>

                      On our textile trips, we really want to find the real event with the real people by
                      taking you places that you did not even know existed. Some of our textile holidays
                      are aimed at those who like a

                      little more comfort - such as in Jaipur, we stay for the whole holiday in one hotel
                      and take little day trips out from that one base. However, some of our textile trips
                      are more intrepid - we have our

                      own coach which travels around a specific area - such as the embroidery holidays -
                      moving onto the next attraction each day. Whatever you love to do and see, you will
                      be delighted at our magnificent

                      little daily adventures together. So if you need a holiday that is for you,
                      featuring visits to what you love, then our Aahilya Textile Holidays are designed
                      for you!

                    </p>

                    <p>

                      Come, enjoy and make new friends too. With a friend, a partner, a family member, or
                      by yourself - we are all together having the time of our lives.

                    </p>

                    <p>We love to share our enthusiasm with our guests to find something different, unique
                      and most of all, authentic. That is quite a challenge these days, but not
                      impossible!

                      We work with a team of travel specialists in India. Our account managers are Anup
                      and Isha who do all the on ground research to satisfy our requirements and organise
                      the itinerary that we request.

                      Great team work! Check out the videos to see and hear about previous trips and then
                      go ahead and book your dream holiday. Need any more help? Then just email us

                      <a href="mailto:info@aahilyaholidays.com">info@aahilyaholidays.com</a> with your
                      questions.

                    </p>

                  </div>

                </div>

              </div>

            </div>

          </section>

          <section className="clothe_section pb-100">

            <div className="container">

              <div className="row pt-50 desktop_view">



                <div className="col-md-5">


                </div>



              </div>

              <div className="row pt-50 mobile_view">

                <div className="col-md-5">

                  <div className="bg-one">



                  </div>

                </div>







              </div>

              <div className="row pt-50 pt-5">

                <div className="col-md-5">

                  <div className="bg-one">

                    <img src={require('../../assets2/images/IshaSharma-Aahilya-Holidays.jpeg')} />

                  </div>

                </div>

                <div className="col-md-7">

                  <div className="bg-txt">

                    <h2 className="et_main">Isha Sharma [Director]</h2>

                    <p>

                      Isha was born in the Northern State of Punjab and home is now the capital , Delhi.
                      She has been in the travel industry for over well over a decade traveling to all
                      regions in South India and now heads

                      up our textile department organising trips all over the Indian sub-continent,
                      Uzbekistan and Japan and her superb knowledge of all things travel textile provides
                      us with a fantastic content that we

                      offer or guests- all at great value too.

                    </p>



                    <p>

                      Isha’s deep passion for textile and the crafts helps her curate immersive rich
                      experiences alongside internationally renowned textile artists – many of our textile
                      theme guests have visited the region

                      at least 5 times with us! There is a huge amount of logistics and finer detail that
                      go into making a successful well run trip with plenty to keep folk occupied whilst
                      at the same time allowing some

                      time to breathe and take it all in and she is an expert at making sure all the trips
                      run like clockwork. She will accompany trips where possible although she is always
                      on the lookout for artisans well

                      off the beaten track and is all consumed by the vast array on offer in South Asia
                      and beyond – in her words its become ‘An Obsession’ which absolutely fits with the
                      Aahilya Holidays culture.

                    </p>

                    <p>

                      She an avid collector of fabric so to understand different styles, weaves, and
                      patterns and she loves accompanying the group to all the local bazaars and giving
                      them all the best tips on haggling and

                      of course making sure that what catches there eye is a quality piece worthy of the
                      journey to back home.

                    </p>

                  </div>

                </div>

                <div className="col-md-12">

                  <div className="bg-txt">



                  </div>

                </div>

              </div>

              <div className="row pt-50 desktop_view">

                <div className="col-md-7">

                  <div className="bg-txt">

                    <h2 className="et_main">Anup Singh Rana [Director]</h2>

                    <p>

                      Anup was born in the Northern State of Himachal and home is now the capital, Delhi.
                      Anup has a Master's Degree in Tourism from Himachal Pradesh University, Shimla
                      (former summer capital of British

                      India period).

                    </p>



                    <p>

                      He has an experience of 12 years in travel service and worked with the prestigious
                      travel companies like Cox and Kings, Western & Oriental & Travel Counsellors and
                      learned the art of service delivery

                      specifically to the inbound clients visiting India especially from UK, USA & Europe.
                      He guided various Textile & Art holidays tours arranging block printing/art
                      workshops in the different parts of

                      India.

                    </p>

                    <p>

                      He has the expertise in handling the entire ground operations so that everything
                      works well starting from the day of arrival until their departure by taking care of
                      all the aspects. He has

                      well-travelled in most of the parts of India and sub-continent having hands-on
                      experience of various destinations. He ensures you to give the perfect holiday
                      assistance and the broadest tour and

                      travel solutions leading to an amazing holiday experience.

                    </p>

                  </div>

                </div>

                <div className="col-md-5">

                  <div className="bg-one">

                    <img src={require('../../assets2/images/anup-image.jpg')} />

                  </div>

                </div>

              </div>



              <div className="row pt-50 pt-5">

                <div className="col-md-5">

                  <div className="bg-one">

                    <img src={require('../../assets2/images/Gulzar-Bagri.jpg')} />

                  </div>

                </div>

                <div className="col-md-7">

                  <div className="bg-txt">

                    <h2 className="et_main">Gulzar Bagri [Travel Consultant]</h2>

                    <p>Gulzar Bagri is a Travel vlogger, Photographer and he made his career in the Inbound
                      travel industry</p>



                    <p>

                      He has done his graduation in Tourism Management from Delhi University and started
                      his career in the travel industry in 2015 and gained 5+ years of experience in the
                      Inbound travel industry. In his

                      career journey he learnt a lot about tourism like Itinerary making, costing, file
                      handling, transport, flight & train ticket bookings, interacting and briefing the
                      guests.

                    </p>

                    <p>

                      He got the opportunity to travel around North, East and west India with travel
                      groups. He has been to Rajasthan, Punjab, Himachal Pradesh, West Bengal, Uttar
                      Pradesh, Uttrakhand, Maharashtra & Bihar

                    </p>

                    <p id="testimonial">In 2020, due to lockdown he had to switch his industry and work in
                      different industries where he learnt about Management, sales, strategy Making, team
                      handling and client servicing.</p>

                    <p>Now he has come back to the travel industry with more experience and Managerial
                      skills.</p>

                  </div>

                </div>

              </div>

            </div>



          </section>
          <div className="container-fluid" style={{display:'none'}}>

            <div className="testimonials">

              <div className="row">

                <div className="col-md-12">

                  <div className="tg-sectiontitle tg-sectiontitleleft just_">

                    <h2>Hear from our guests</h2>

                    <img src={require('../../assets2/images/tile-heading-1.png')} />

                  </div>

                </div>

              </div>

              <div className="swiper swiper_about testimonials_video">
                <Swiper
                  slidesPerView={1}
                  spaceBetween={10}
                  // autoplay={{
                  //   delay: 2500,
                  //   disableOnInteraction: false,
                  // }}
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
                      slidesPerView: 5,
                      spaceBetween: 10,
                    },
                  }}


                  modules={[Autoplay, Navigation]}
                  className="mySwiper footer_slider"
                >
                   <SwiperSlide>
                        <div className="tp-widget-review">

                          <a data-toggle="modal" data-target="#video2" href="javascript:void(0);">

                            <img src={require('../../assets2/images/thumb_2.jpg')} />

                          </a>
                        </div>
                      </SwiperSlide>
                </Swiper>



              </div>

            </div>

          </div>
        </main>


      </div>
    </>
  )
}

export default About;