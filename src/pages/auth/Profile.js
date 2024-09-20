import React from 'react'
import { Link } from 'react-router-dom'

export default function Profile() {
    return (
        <main id="rlr-main" className="rlr-main--fixed-top">
            <div className="rlr-search-results-page container">
               
                <div className='banner-section'>
                    <img src="https://eeasy.s3.ap-south-1.amazonaws.com/Continent/1681273601281.JPEG" />
                </div>
                <div className="rlr-search-results-page container-fluid padding_35px collection_page">

                <div className="rlr-search-results-page__breadcrumb-section rlr-search-results-page__breadcrumb-section-nav">
                            {/* <!-- Breadcrumb --> */}
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb rlr-breadcrumb__items">
                                    <li className="breadcrumb-item rlr-breadcrumb__item"><Link to="/">Home</Link></li>
                                    <li className="breadcrumb-item rlr-breadcrumb__item active" aria-current="page">My Profile</li>
                                    {/* <li className="breadcrumb-item rlr-breadcrumb__item">{propertydetail?.name ? propertydetail?.name : ""}</li> */}
                                    {/* <li className="breadcrumb-item rlr-breadcrumb__item active" aria-current="page">{propertydetail[0]?.name}</li> */}
                                </ol>
                            </nav>
                            {/* <div className="rlr-icon-text"><i className="rlr-icon-font flaticon-email" style={{ fontWeight: 'bold' }}> </i> <span className="rlr-search-results-page__phone">Questions? {email} </span></div> */}
                        </div>
                    <div className='profile-page'>
                        <div className='row'>
                            <div className='col-lg-4'>
                                <div className='left_profile_box'>
                                    <div className='profile_img'>
                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" />
                                    </div>
                                    <h3>John Smith</h3>
                                    <p>Bay Area, San Francisco, CA</p>
                                </div>
                            </div>
                            <div className='col-lg-8'>
                                <div className='right_profile_content'>
                                    <ul>
                                        <li><div className='left_detail'>Full Name</div><div className='right_detail'>Johnatan Smith</div></li>
                                        <li><div className='left_detail'>Email</div><div className='right_detail'>example@example.com</div></li>
                                        <li><div className='left_detail'>Company Name</div><div className='right_detail'>ABC</div></li>
                                        <li><div className='left_detail'>Company Website Name</div><div className='right_detail'>abc.com</div></li>
                                        <li><div className='left_detail'>Mobile</div><div className='right_detail'>(098) 765-4321</div></li>
                                        <li><div className='left_detail'>Address</div><div className='right_detail'>Bay Area, San Francisco, CA</div></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
