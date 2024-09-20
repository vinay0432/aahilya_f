import React from 'react'
import Header from '../../Header'
import Footer from '../../Footer'
import { Link } from 'react-router-dom'

export default function ForgotPassword() {
  return (
    <>

    <main id="rlr-main" className="rlr-main--fixed-top">
      <div className="rlr-section__content--lg-top">
        <section className="rlr-section rlr-section__mt rlr-account">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 offset-lg-4">
                <div className="rlr-authforms">
                  <div className="rlr-authforms__header">
                  <img src={require('../../assets/images/loading.gif')} alt="Logo" />
                    <h2>Forgot password?</h2>
                    <p>No worries, we’ll send you reset instructions.</p>
                  </div>
                  <div className="rlr-authforms__form">
                    <div className="rlr-authforms__inputgroup"><label className="rlr-form-label rlr-form-label--light required"> Email </label> <input type="text" autocomplete="off" className="form-control form-control--light" /></div>
                    <button type="button" className="btn rlr-button rlr-button--fullwidth rlr-button--primary">Reset password</button>
                  </div>
                  <div className="rlr-authforms__back">
                    <Link to="/login"><img src={require('../../assets/assets/images/back-arrow.png')} alt="back arrow" /> Back to log in</Link>
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
