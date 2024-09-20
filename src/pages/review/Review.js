import React, { useState, useEffect } from 'react';
import Header from '../../Header';
import Footer from '../../Footer';
import { AvForm, AvField } from "availity-reactstrap-validation";
import StarRatings from 'react-star-ratings';
import { post, put } from '../../helper/helper_api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Review(props) {
  const user = useSelector((state) => state.user.user);
  const [isRecomm, setIsRecomm] = useState('');
  const [star, setStar] = useState(4.5);
  const [propertyId, setPropertyId] = useState(null);
  let navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState(null);

  useEffect(() => {
    console.log('property details', location?.state?.data);
    if (location?.state?.data) {
      setData(location?.state?.data);
      if (location?.state?.data?.isRecomm)
        setIsRecomm('true')
    }
    setStar(location?.state?.data?.star);
    let path = location.pathname.split("/");
    if (path.length > 1)
      setPropertyId(path[2]);
  }, [location]);

  const handleValidSubmit = (e, v) => {
    console.log('user login', user);
    if (user) {
      if (data) {
        let body = {
          ...v,
          star,
          isRecomm: isRecomm == 'false' ? false : true,
          reviewId: data?._id,
          token: user?.token,
        }
        put('/review/update', body)
          .then((res => {
            console.log('response from adding review', res);
            if (res?.statusCode == 200) {
              toast.success(res?.message);
              navigate(-1);
            }
            else if (res?.statusCode == 208) {
              toast.error(res?.error);
              navigate(-1);
            }
            else
              toast.error(res?.error);
          }))
          .catch(err => {
            console.log('error whiling adding rating', err);
            toast.error('Something went wrong!');
          })
      } else {
        let body = {
          ...v,
          star,
          isRecomm: isRecomm == 'false' ? false : true,
          propertyId: propertyId,
          token: user?.token,
        }
        console.log('sending reviews', body)
        post('/review/add', body)
          .then((res => {
            console.log('response from adding review', res);
            if (res?.statusCode == 200) {
              toast.success(res?.message);
              navigate(-1);
            }
            else if (res?.statusCode == 208) {
              toast.error(res?.error);
              navigate(-1);
            }
            else
              toast.error(res?.error);
          }))
          .catch(err => {
            console.log('error whiling adding rating', err);
            toast.error('Something went wrong!');
          })
      }
    } else
      navigate("/login");
  }

  return (
    <>
      <Header />
      <div style={{ marginTop: 100, zIndex: 99999, position: 'relative' }}>
        <ToastContainer />
      </div>
      <main id="rlr-main" className="rlr-main--fixed-top">
        <div id="rlr-review-from" className="container-xxxl">
          <section className="rlr-section rlr-section__content--md-top row justify-content-center">
            <div className="col-xl-5">
              <AvForm onValidSubmit={handleValidSubmit}>
                <fieldset className="rlr-review-form__fieldset">
                  <legend className="rlr-review-form__hidden-legend">Write a review</legend>
                  {/* <!-- Section heading --> */}
                  <div className="rlr-section__heading">
                    <h1 className="rlr-section__heading--main">{data != null ? 'Update your review' : 'Write a review'}</h1>
                    <span className="rlr-section__heading--sub">Review helps other travelers so please be mindful while reviewing.</span>
                  </div>
                  <div className="rlr-fieldrow">
                    <div className="rlr-fieldrow__form-element">
                      <div className="rlr-fieldrow__item">
                        <label className="rlr-form-label rlr-form-label--dark" for="rlr_review_form_title"> Set a title </label>
                        <AvField
                          type="text"
                          name="name"
                          value={data?.name}
                          autocomplete="off"
                          maxlength="70"
                          id="rlr_review_form_title"
                          className="form-control"
                          placeholder="Bungee jumping trip in Kathmandu"
                          required
                        />
                      </div>
                      <div className="rlr-fieldrow__item">
                        <label className="rlr-form-label rlr-form-label--dark" for="rlr_review_form_desc"> What did you like or dislike? </label>
                        <AvField
                          type="textarea"
                          value={data?.desc}
                          name="desc"
                          id="rlr_review_form_desc"
                          className="form-control form-control--text-area"
                          placeholder="Provide more information for travelers to find your starting point easily, for example, opposite to the xyz landmark building"
                          rows="12"
                          required
                        />
                      </div>
                      <div className="rlr-fieldrow__item">
                        <div className="rlr-recommendation-button">
                          <span className="rlr-recommendation-button__label">Recommend to others?</span>
                          <div className="rlr-recommendation-button__buttons">
                            <button type="button" onClick={() => setIsRecomm('true')} className={isRecomm == 'true' ? "btn rlr-button rlr-recommendation-button__button rlr-recommendation-button__button--approve active_class" : "btn rlr-button rlr-recommendation-button__button rlr-recommendation-button__button--approve"}>
                              <i className="rlr-icon-font flaticon-check-rounded"> </i>
                            </button>
                            <button type="button" onClick={() => setIsRecomm('false')} className={isRecomm == 'false' ? "btn rlr-button rlr-recommendation-button__button rlr-recommendation-button__button--disapprove active_class" : "btn rlr-button rlr-recommendation-button__button rlr-recommendation-button__button--disapprove"}>
                              <i className="rlr-icon-font flaticon-cross-rounded"> </i>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="rlr-fieldrow__item">
                        <div className="rlr-rating-stars">
                          <span className="rlr-rating-stars__label">How many stars should they get?</span>
                          <div className="rlr-rating-stars__iconset">
                            {/* <i className="rlr-icon-font flaticon-star-1"> </i> <i className="rlr-icon-font flaticon-star-1"> </i> <i className="rlr-icon-font flaticon-star-1"> </i> <i className="rlr-icon-font flaticon-star-1"> </i> <i className="rlr-icon-font flaticon-star"> </i> */}
                            <StarRatings
                              rating={star}
                              starRatedColor={'#f7de00'}
                              starHoverColor={'#f7de00'}
                              changeRating={(e) => setStar(e)}
                              numberOfStars={5}
                              name='rating'
                              starDimension={'25px'}
                              starSpacing={'2px'}
                            />
                          </div>
                        </div>
                      </div>
                      {/* <div className="rlr-fieldrow__item">
                    <label className="rlr-form-label rlr-form-label--" for="rlr_review_form_uploader"> Add photos from your experiences. </label>
                    <div className="rlr-drop-region js-rlr-drop-region">
                      <div className="rlr-drop-region__add-section">
                        <input required id="rlr_review_form_uploader" className="rlr-drop-region__image-input js-rlr-drop-input" type="file" accept="image/*" />
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M24 1.928c12.144 0 22.072 9.928 22.072 22.072 0 12.144-9.928 22.072-22.072 22.072-12.144 0-22.072-9.928-22.072-22.072C1.928 11.856 11.856 1.928 24 1.928zM24 0A23.94 23.94 0 0 0 0 24c0 13.302 10.794 24 24 24 13.204 0 24-10.698 24-24A23.94 23.94 0 0 0 24 0z"
                            fill="#99A3AD"
                          />
                          <path d="M22.844 11.374h1.928v25.06h-1.928v-25.06z" fill="#99A3AD" />
                          <path d="M11.18 23.132h24.868v1.928H11.18v-1.928z" fill="#99A3AD" />
                        </svg>
                        <div className="type-lead rlr-drop-region__add-section__text">Add Photos</div>
                      </div>
                    </div>
                    <div className="splide rlr-view-region" id="rlr_js_splide_photouploader">
                      <div className="splide__track rlr-view-region__strack">
                        <ul id="image-preview" className="splide__list"></ul>
                      </div>
                    </div>
                    <div className="rlr-view-input rlr-view-input--js-hide js-rlr-view-input">
                      <span className="rlr-view-input__submit js-label-submit">
                        <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5.394 11.123a.698.698 0 0 1-.99 0L.45 7.17a1.05 1.05 0 0 1 0-1.485l.495-.495a1.05 1.05 0 0 1 1.486 0l2.468 2.468 6.67-6.67a1.05 1.05 0 0 1 1.485 0l.495.496c.41.41.41 1.075 0 1.485l-8.155 8.155z" fill="var(--white)" />
                        </svg>
                      </span>
                    </div>
                  </div> */}
                    </div>
                  </div>
                  <div className="rlr-review-form__buttons">
                    <button type="reset" className="btn rlr-button rlr-review-form__cancel rlr-button--small rlr-button--rounded rlr-button--white">Cancel</button>
                    <button type="submit" className="btn rlr-button rlr-review-form__submit rlr-button--small rlr-button--rounded rlr-button--brand">Submit</button>
                  </div>
                </fieldset>
              </AvForm>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
