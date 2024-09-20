import React, { useEffect, useRef, useState } from 'react'
import { AvForm, AvField, AvGroup, AvInput, AvFeedback, AvRadioGroup, AvRadio, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { Button, Label, FormGroup, CustomInput } from 'reactstrap';
import { toast } from 'react-toastify';
import { get, post } from '../../helper/helper_api';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Loader from '../../Loader';

import SelectSearch from 'react-select-search';
import 'react-select-search/style.css'
import swal from 'sweetalert';
export default function BookingForm(props) {
    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();
    const [tour, setTour] = useState([]);
    const [proID, setProID] = useState(null);
    const form = useRef();
    // console.log('user on login', user);
    const options = [
        {
            name: 'Afghanistan',
            value: 'AF'
          },
          {
            name: 'Åland Islands',
            value: 'AX'
          },
          {
            name: 'Albania',
            value: 'AL'
          },
          {
            name: 'Algeria',
            value: 'DZ'
          },
    ];
    useEffect(() => {
        if (location?.state?.id)
            setProID(location?.state?.id);
    }, [proID])

    useEffect(() => {
        window.scroll(0, 0);
        getData();
    }, [])

    const handleValidSubmit = (e, v) => {
        console.log('submite request on login')
        if(!proID){
            toast.error('Please select a tour !')
            return
        }
        setLoading(true);
        const body = {
            ...v,
            covid: v?.covid == 'Yes' ? true : false,
            isSingleRoom: v?.isSingleRoom == 'Yes' ? true : false,
            isFlight: v?.isFlight == 'Yes' ? true : false,
            tourId:proID
        }
        // console.log(body)
        // return
        post('/booking/add', body)
            .then((res => {
                setLoading(true);

                if (res?.statusCode == 200) {
                    console.log('request on login', res);
                    setLoading(false);
                    swal({
                        title: res?.message,
                        text: "Booking Confirmed!",
                        icon: "success",
                    })
                    toast.success(res?.message)
                    setLoading(false);
                    form.current.reset();
                    // navigate('/');
                } else {
                    setLoading(false)
                    toast.error(res?.error);

                }
            }))
            .catch(error => {
                setLoading(false);

                console.log('error while login', error);
                toast.error('Something went wrong');
            })
    }

    const getData = () => {
        setLoading1(true);
        get('/tour/list/all').then((json) => {

            if (json?.statusCode == 200) {
                //   console.log('destination category', json);
                setLoading1(false);
                let temp = [];
                json?.data.map((item)=>(
                    temp.push({name:item?.name,value:item?._id})
                ))
                setTour(temp);
            }

        }).catch((err) => {
            setLoading1(false);
            console.log(err);
        });
    }

    return (
        <>
            {
                loading1 && <Loader />
            }
            <div id="tg-wrapper" className="tg-wrapper tg-haslayout">

                <section className="tg-parallax tg-innerbanner tg_innerbanner" >
                    <div className="tg-sectionspace tg-haslayout book_now_img">
                        <div className="container">
                            <div className="row">
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <h1>Booking Form</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <main id="tg-main" className="tg-main tg-haslayout">
                    <ol className="breadcrumb">
                        <li><Link to="/">Home</Link></li>
                        <li className="active">Book Now</li>
                    </ol>
                    <div className="tg-sectionspace tg-haslayout pt-100 pb-100 booking_form_padding_top">
                        <div className="container">
                            <div className="row">
                                <div className="col-xs-12">
                                    <div className="book_form">
                                        <div className="logo_f">
                                            <img src={require('../../assets2/images/logo.png')} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">

                                    <div id="tg-content" className="tg-content booking_form_">
                                        <div className="tg-billingdetail">
                                            <AvForm ref={form} onValidSubmit={handleValidSubmit} className="tg-formtheme tg-formbillingdetail" id="member_form">

                                                <fieldset>
                                                    <div className="tg-bookingdetail">
                                                        <div className="tg-box">

                                                            <div className="tg-heading">
                                                                <h3>Your details:</h3>
                                                            </div>
                                                            <div className="clearfix"></div>
                                                            <div className="row">
                                                                <div className="mb-3 col-xs-12 col-sm-12">
                                                                    <Label>Full name <span style={{ color: 'red' }}>*</span></Label>
                                                                    <AvField name="name"
                                                                         />

                                                                </div>
                                                                <div className="mb-3 col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                                                    <Label>Mobile no </Label>
                                                                    <AvField name="phone" type="number"
                                                                        />

                                                                </div>
                                                                <div className="mb-3 col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                                                    <Label>E-mail <span style={{ color: 'red' }}>*</span></Label>
                                                                    <AvField name="email"
                                                                        />

                                                                </div>

                                                                <div className="mb-3 col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                                                    <Label>Address <span style={{ color: 'red' }}>*</span></Label>
                                                                    <AvField name="address" type="textarea"
                                                                        rows={5}
                                                                         />

                                                                </div>
                                                                <div className="mb-3 col-xs-12 col-sm-12 dob_field col-md-12 col-lg-12">
                                                                    <AvField name="dob" type="date" label="D.O.B" />

                                                                </div>

                                                                <div className="pb-3 col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                                                    <AvField name="hPhone" type="number" label="Tel. no. (home):" />

                                                                </div>
                                                            </div>


                                                        </div>
                                                    </div>
                                                    <div className="tg-bookingdetail">
                                                        <div className="tg-box">

                                                            <div className="tg-heading">
                                                                <h3>Emergency Contact:</h3>
                                                            </div>
                                                            <div className="clearfix"></div>
                                                            <div className="row">
                                                                <div className="col-xs-12 col-sm-12">
                                                                    <AvField name="eName" type="text" label="Name" />

                                                                </div>
                                                                <div className="col-xs-12 col-sm-12">
                                                                    <AvField name="eRelation" type="text" label="Relationship" />

                                                                </div>


                                                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                                                    <AvField name="eHPhone" type="number" label="Tel. no. (home):" />

                                                                </div>
                                                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                                                    <AvField name="ePhone" type="number" label="Mobile no:" />

                                                                </div>
                                                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                                                    <AvField name="eEmail" type="email" label="E-mail:" />

                                                                </div>
                                                                <div className="col-xs-12 col-sm-12 ">
                                                                    <AvField name="eAddress" rows={5} type="textarea" label="Address" />

                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>

                                                </fieldset>
                                                <fieldset>
                                                    <div className="tg-bookingdetail" style={{ marginTop: 15 }}>
                                                        <div className="tg-box">

                                                            <div className="tg-heading" style={{ marginBottom: 20 }}>
                                                                <h3 style={{ color: '#000', fontSize: 18 }}>Medical Conditions:</h3>
                                                            </div>
                                                            <div className="clearfix"></div>
                                                            <div className="row">
                                                                {/* <div className="col-xs-12 col-sm-12 checkbox_section">

                                                                    <AvRadioGroup name="covid" label="Have you had a Covid Jab?" >
                                                                        <AvRadio label="Yes" value="Yes" />
                                                                        <AvRadio label="No" value="No" />

                                                                    </AvRadioGroup>
                                                                </div> */}
                                                                <div className="mb-3 col-xs-12 col-sm-12 ">
                                                                    <AvField name="medication" style={{ height: '90px' }} type="textarea" label="Do you have any walking difficulty?" placeholder="If Yes please explain..." />

                                                                </div>
                                                                <div className="col-xs-12 search_option col-sm-12 mb-3">
                                                                    <Label>Which holiday would you like to book? <span style={{ color: 'red' }}>*</span></Label>
                                                                    {/* <AvField type="select" name="tourId" value={proID} style={{ width: '100%' }}
                                                                        validate={{
                                                                            required: { value: true, errorMessage: "This field is required!" },
                                                                        }}>
                                                                        <option value={""}>Which holiday would you like to book?</option>
                                                                        {
                                                                            tour?.map((item, index) => (
                                                                                <option key={index} value={item?._id}>{item?.name}</option>
                                                                            ))
                                                                        }
                                                                    </AvField> */}
                                                                    <SelectSearch search options={tour} value={proID} onChange={(e)=> setProID(e)} name="tourId" placeholder="Which holiday would you like to book?" />
                                                                </div>
                                                                <div className="col-xs-12 col-sm-12 ">
                                                                    <AvField name="dietary" style={{ height: '90px' }} type="textarea" label="Dietary requirements:" placeholder="Dietary requirements" />

                                                                </div>


                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="tg-bookingdetail">
                                                        <div className="tg-box">

                                                            <div className="clearfix"></div>
                                                            <div className="row">
                                                                <div className="col-xs-12 col-sm-12 checkbox_section _label_margin_bottom">
                                                                <Label>Do you want a single room (subject to availability) <span style={{ color: 'red' }}>*</span></Label>
                                                                    <AvRadioGroup name="isSingleRoom" className="mb_2" >
                                                                        <AvRadio label="Yes" value="Yes" />
                                                                        <AvRadio label="No" value="No" />

                                                                    </AvRadioGroup>
                                                                </div>
                                                                <div className="col-xs-12 col-sm-12 checkbox_section _label_margin_bottom mb-3">

                                                                    <AvRadioGroup name="isFlight" label="Do you want Aahilya Holidays to book your international flights:" >
                                                                        <AvRadio label="Yes" value="Yes" />
                                                                        <AvRadio label="No" value="No" />

                                                                    </AvRadioGroup>
                                                                </div>
                                                                
                                                                <div className="col-xs-12 col-sm-12">
                                                                    {/* <label>On all of our tours it is compulsory that you have travel insurance. <span style={{ color: 'red' }}>*</span></label> */}
                                                                    <div className="row">
                                                                        <div className="col-xs-12 col-sm-12 policy_input">
                                                                            <AvField name="insurancePolicyNo" type="text" label="Insurance Policy Issuer and Policy number:" />
                                                                               <span>If the policy is not issued. You can send the details later through email.</span>
                                                                        </div>
                                                                        <div className="col-xs-12 col-sm-12">
                                                                            <AvField name="eContactNo" type="number" label="Emergency Contact no" />

                                                                        </div>

                                                                    </div>
                                                                </div>
                                                                <div className="col-xs-12 col-sm-12 mb-3">
                                                                    <label>For any  information get in touch with us <a href="tel:+91-9871476077">+91-9871476077</a>  &  <a href="mailto:info@aahilyaholidays.com">info@aahilyaholidays.com</a> </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </fieldset>
                                                <fieldset>

                                                    <div className="row" style={{ marginTop: '10px' }}>
                                                        {/* <div className="col-xs-12">
                                                            <table className="table table-bordered table_">
                                                                <thead className="thead-dark">

                                                                    <tr>
                                                                        <th scope="col">For your tour what is your preferred means of correspondence? </th>
                                                                        <th scope="col"> E-mail</th>
                                                                        <th scope="col">Telephone </th>
                                                                        <th scope="col">Post</th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr id="container-input-checkbox">

                                                                        <td>Declaration</td>
                                                                        <td>  <AvField type="checkbox" name="isCorrEmail" label="Email" /></td>
                                                                        <td>  <AvField type="checkbox" name="isCorrTele" label="Telephone" /></td>
                                                                        <td> <AvField type="checkbox" name="isCorrPost" label="Post" /></td>
                                                                    </tr>

                                                                </tbody>
                                                            </table>
                                                        </div> */}
                                                        <div className='col-lg-12'>
                                                            <div className="p-int"><p style={{ fontSize: '14px' }}> (A deposit of £ 700 is required to secure your place on this trip. We will share the payment details on your email id once you submit the booking form.)</p></div>
                                                        </div>
                                                        <div className="col-xs-12 form-check_">
                                                            {/* <FormGroup>
                                                                <AvGroup className="form-check " required>
                                                                    <AvInput type="checkbox" name="termandconditions" value={""}
                                                                        required
                                                                    />
                                                                    <Label check forHtml="checkbox" className='book_now_term'>I have read, understood, and accept the booking conditions provided on the Aahilya Holidays Website.</Label>
                                                                </AvGroup>

                                                            </FormGroup> */}
                                                            <AvCheckboxGroup className="book_now_term" inline name="checkboxCustomInputExample2" label=""  validate={{
                                                                            required: { value: true, errorMessage: "This field is required!" },
                                                                        }}>
                                                                <AvCheckbox   label="I have read, understood, and accept the booking conditions provided on the Aahilya Holidays Website." value="Bulbasaur" />
                                                               
                                                            </AvCheckboxGroup>
                                                        </div>
                                                    </div>
                                                </fieldset>
                                                <fieldset>
                                                    <button className="tg-btn" type="submit" id="book_now">
                                                        <span>Send</span>
                                                        {loading &&
                                                            <div className="spiner_box">
                                                                <img src={require('../../assets2/images/loading-buffering.gif')} />
                                                            </div>
                                                        }
                                                    </button>
                                                </fieldset>
                                            </AvForm>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

            </div>
        </>
    )
}
