import React, { useEffect, useState, useRef } from 'react'
import { AvForm, AvField, AvGroup, AvInput, AvFeedback, AvRadioGroup, AvRadio, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { Button, Label, FormGroup, CustomInput } from 'reactstrap';
import { toast } from 'react-toastify';
import { get, post } from '../../helper/helper_api';
import SelectSearch from 'react-select-search';
import 'react-select-search/style.css'
export default function Form1() {
    const [loading, setLoading] = useState(false);
    const [tour, setTour] = useState([]);
    const form = useRef();
    const [proID, setProID] = useState(null);
    // console.log('user on login', user);

    useEffect(() => {
        getData();
    }, [])

    const handleValidSubmit = (e, v) => {
        if (!loading) {
            if(!proID){
                toast.error('Please select a tour !')
                return
            }
            setLoading(true);
           
            const body = {
                ...v,
                tourId:proID
            }
            //   console.log(body)
            // return
            post('/contact', body)
                .then((res => {
                    setLoading(true);
                    if (res?.statusCode == 200) {
                        // console.log('request on login', res);
                        setLoading(false);
                        toast.success(res?.message);
                        form.current.reset();
                    } else {
                        toast.error(res?.error);
                        setLoading(false)
                    }
                }))
                .catch(error => {
                    setLoading(false);
                    console.log('error while login', error);
                    toast.error('Something went wrong');
                })
        }
    }

    const getData = () => {
        get('/tour/list/all').then((json) => {
            if (json?.statusCode == 200) {
                //   console.log('destination category', json);
                let temp = [];
                json?.data.map((item)=>(
                    temp.push({name:item?.name,value:item?._id})
                ))
                setTour(temp);
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <section className="footer_form">
            <div className="form_main">
                <div className="form_logo_section" id="Enquire_Now">
                    <div className="logo_f">
                        <img src={require('../../assets2/images/logo.png')} />
                    </div>
                    <h4 className="enquiry_now">Enquire Now</h4>
                </div>
                <AvForm ref={form} onValidSubmit={handleValidSubmit}>
                    <div className="col-lg-6">
                        <AvField name="name" 
                         validate={{
                            required: {value: true, errorMessage: "This field is required!"},
                        }}
                        label="Name *" />
                    </div>
                    <div className="col-lg-6">
                        <AvField name="email" label="Email *"  validate={{
                            required: {value: true, errorMessage: "This field is required!"},
                        }} />
                    </div>
                    <div className='col-lg-12'>
                        <AvField name="phone" type="number" 
                        validate={{
                            required: {value: true, errorMessage: "This field is required!"},
                        }}
                        label="Phone *" />
                    </div>
                    <div className='col-lg-12 search_option' style={{marginBottom:10}}>
                    <Label>Which holiday would you like to book? <span style={{ color: 'red' }}>*</span></Label>
                        {/* <AvField type="select" name="tourId" style={{ width: '100%' }} label="Which holiday would you like to book? *"  validate={{
                            required: {value: true, errorMessage: "This field is required!"},
                        }}>
                            <option value={""}>Which holiday would you like to book?</option>
                            {
                                tour?.map((item, index) => (
                                    <option value={item?._id}>{item?.name}</option>
                                ))
                            }
                        </AvField> */}
                         <SelectSearch search options={tour} value={proID} onChange={(e)=> setProID(e)} name="tourId" placeholder="Which holiday would you like to book?" />
                    </div>
                    <div className='col-lg-12'>
                        <AvField name="msg" label="Short Description *" type="textarea"  validate={{
                            required: {value: true, errorMessage: "This field is required!"},
                        }} />
                    </div>
                    <div className='col-lg-12'>
                        <button type="submit" className="btn form_btn_box send_btn">
                            <span>Send</span>
                            {loading &&
                                <div className="spiner_box_c spiner_box_d">
                                    <img src={require('../../assets2/images/loading-buffering.gif')} />
                                </div>
                            }
                        </button>
                    </div>
                </AvForm>
            </div>
        </section>
    )
}
