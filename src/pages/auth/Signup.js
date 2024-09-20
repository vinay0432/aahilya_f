import React, { useState } from 'react'
import Header from '../../Header'
import Footer from '../../Footer'
import { AvField, AvForm } from 'availity-reactstrap-validation';
import { post } from '../../helper/helper_api';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../store/auth/login/reducer';
import { useLocation, useParams, useNavigate, Link } from 'react-router-dom';
import Loader from '../../Loader';

export default function Signup() {

  const [file, setFile] = useState(null);
  const [isOtp, setIsOtp] = useState(false);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleValidSubmit = (e, v) => {
    setLoading(true);
    const body = {
      ...v
    }
    console.log('req on register', body);
    let url = '/register';
    if (isOtp)
      url = '/verify';
    post(url, body)
      .then(res => {
        setLoading(false);
        if (res?.statusCode == 200) {
          console.log('request on register', res?.user);
          if (isOtp) {
            localStorage.setItem("user", JSON.stringify(res?.data));
            dispatch(login(res?.data));
            navigate(-2);
          }else{
            setIsOtp(true);
          }
        } else
          toast.error(res?.error);
      })
      .catch(error => {
        setLoading(false);
        console.log('error while login', error);
        toast.error('Something went wrong');
      })
  }

  return (
    <>
    
      {loading &&
        <Loader />
      }
      <main id="rlr-main" className="rlr-main--fixed-top">
        <div className="rlr-section__content--lg-top">
          <section className="rlr-section rlr-section__mt rlr-account">
            <div className="container">
              <div className="row">
                <div className="col-lg-5 offset-lg-4">
                  <div className="rlr-authforms">
                    <div className="rlr-authforms__header">
                      <img className="mb-2" src={file ? file : require("../../assets/images/loading.gif")} alt="Logo" />
                      <h2>Create an account</h2>
                      <p>Helps to access all features of the site.</p>
                    </div>
                    <AvForm onValidSubmit={handleValidSubmit}>
                      <div className="rlr-authforms__form">
                        <div className="rlr-authforms__inputgroup"><label className="rlr-form-label rlr-form-label--light required"> Name </label>
                          <AvField
                            type="text"
                            name="name"
                            // autocomplete="off"
                            className="form-control form-control--light"
                            required
                          />
                        </div>
                        <div className="rlr-authforms__inputgroup"><label className="rlr-form-label rlr-form-label--light required"> Email </label>
                          <AvField
                            type="email"
                            name="email"
                            // autocomplete="off"
                            className="form-control form-control--light"
                            required
                          />
                        </div>
                        <div className="rlr-authforms__inputgroup">
                          <label className="rlr-form-label rlr-form-label--light required"> Password </label>
                          <AvField
                            type="password"
                            name="password"
                            // autocomplete="off"
                            className="form-control form-control--light"
                            required
                          />
                          <p className="help-text">Must be 8 characters or more.</p>
                        </div>
                        {isOtp &&
                          <div className="rlr-authforms__inputgroup">
                            <label className="rlr-form-label rlr-form-label--light required"> OTP </label>
                            <AvField
                              type="number"
                              name="otp"
                              // autocomplete="off"
                              className="form-control form-control--light"
                              required
                            />
                            <p className="help-text">We have sent you a 4 digit otp. Please check your mailbox.</p>
                          </div>
                        }
                        <button type="submit" className="btn rlr-button rlr-button--fullwidth rlr-button--primary">Sign in</button>
                        <button type="button" className="btn rlr-button rlr-button--fullwidth rlr-button--google">Sign up with Google</button>
                      </div>

                    </AvForm>
                    <div className="rlr-authforms__notes">
                      <p>Already have an account? <Link to="/login">Log in</Link></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
 
    </>
  )
}
