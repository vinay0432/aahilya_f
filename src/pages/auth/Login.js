import React, { useState } from 'react';
import Header from '../../Header';
import Footer from '../../Footer';
import { projectName } from '../../Utils';
import { AvField, AvForm } from 'availity-reactstrap-validation';
import { post } from '../../helper/helper_api';
import Loader from '../../Loader';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../store/auth/login/reducer';
import { useLocation, useParams, useNavigate, Link } from 'react-router-dom';


export default function Login() {

  let navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // console.log('user on login', user);

  const handleValidSubmit = (e, v) => {
    setLoading(true);
    const body = {
      ...v
    }
    post('/login', body)
      .then((res => {
        setLoading(false);
        if (res?.statusCode==200){
          console.log('request on login', res?.user);
          localStorage.setItem("user", JSON.stringify(res?.user));
          dispatch(login(res?.user));
          navigate(-1);
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
     
      {loading &&
        <Loader />
      }
      <main id="rlr-main" className="rlr-main--fixed-top">
        <div className="rlr-section__content--lg-top">
          <section className="rlr-section rlr-section__mt rlr-account mt-0">
            <div className="container">
              <div className="row">
                <div className="col-lg-5 offset-lg-4">
                  <div className="rlr-authforms">
                    <div className="rlr-authforms__header">
                      <img src={require('../../assets/images/loading.gif')} alt="Logo" />

                      <p>Welcome back! Please enter login details.</p>
                    </div>
                    <AvForm onValidSubmit={handleValidSubmit}>
                      <div className="rlr-authforms__form">
                        <div className="rlr-authforms__inputgroup"><label className="rlr-form-label rlr-form-label--light required"> Email </label>
                          <AvField
                            type="text"
                            name="email"
                            // autocomplete="off"
                            className="form-control form-control--light"
                            required
                          />
                        </div>
                        <div className="rlr-authforms__inputgroup"><label className="rlr-form-label rlr-form-label--light required"> Password </label>
                          <AvField
                            type="password"
                            name="password"
                            // autocomplete="off"
                            className="form-control form-control--light"
                          />
                        </div>
                        <div className="rlr-authforms__forgotpassword">
                          <div className="form-check-inline">
                            <input className="form-check-input rlr-form-check-input" id="rlr-checkbox-1" type="checkbox" value="defaultValue" />
                            <label className="rlr-form-label rlr-form-label--checkbox rlr-form-label--font-inherit rlr-form-label--bold" for="rlr-checkbox-1">Remember me on this device</label>
                          </div>
                          <Link to="/forgot-password">Forgot password</Link>
                        </div>
                        <button type="submit" className="btn mb-3 rlr-button rlr-button--fullwidth rlr-button--primary">Sign in</button>
                        <button type="button" className="btn mb-3 rlr-button rlr-button--fullwidth rlr-button--google">Sign in with Google</button>
                      </div>
                    </AvForm>
                    <div className="rlr-authforms__notes">
                      <p>Don’t have an account? <Link to="/signup">Sign up</Link></p>
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
