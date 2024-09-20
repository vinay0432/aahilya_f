import React, { useEffect, useState } from 'react'
import { get } from '../../helper/helper_api';
import Loader from '../../Loader';
import { Link } from 'react-router-dom';

export default function Testimonial() {
  const [testi, setTesti] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    window.scroll(0, 0);
    gateData();
  }, [])
  const gateData = () => {
    setLoader(true)
    get('/testi/list_user').then((json) => {
      if (json?.statusCode == 200) {
        //   console.log('destination category', json);
        setLoader(false)
        setTesti(json?.data);
      } else {
        setLoader(false)
      }

    }).catch((err) => {
      console.log(err);
      setLoader(false)
    });
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
  return (
    <>
      {
        loader && <Loader />
      }

      <div id="tg-wrapper" className="tg-wrapper tg-haslayout">

        <section className="tg-parallax tg-innerbanner tg_innerbanner">
          <div className="tg-sectionspace tg-haslayout yoga_ayurveda">
            <div className="container">
              <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <h1>Testimonials</h1>

                </div>
              </div>
            </div>
          </div>
        </section>

        <main id="tg-main" className="tg-main tg-haslayout container____">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">Home</Link></li>
              <li className="breadcrumb-item"><Link to="/about">About us</Link></li>
              <li className="breadcrumb-item" aria-current="page">Testimonials</li>

            </ol>
          </nav>
          <section className="tour_sec  pt-30px pb-0">
            <div className="container Testimonials_section Testimonials_section_page" style={{ position: 'relative' }}>
              <div className="row">
                {
                  testi?.imageTesti?.map((item, index) => (
                    <div className="col-lg-6" key={index}>
                      <div className="profile_box">
                        <div className="profile_h">
                          <div className="profile_content">
                            <h3>{item?.name}</h3>
                          </div>
                        </div>
                        <p>
                          {item?.desc}
                        </p>
                        <div className="profile_content_bottom">
                          <div className="review_star">
                            {getRatingStar(item?.rating)}
                          </div>
                          <p>{item?.date}</p>
                        </div>
                      </div>
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
