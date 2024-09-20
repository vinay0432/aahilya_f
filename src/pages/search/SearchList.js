import { AvField, AvForm } from 'availity-reactstrap-validation';
import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { get } from '../../helper/helper_api';

export default function SearchList() {
    const navigate = useNavigate();
    const [data, setData] = useState(undefined)
    const [trimInput, setTrimInput] = useState(false)
    const [stringValue, setStringValue] = useState('')

    useEffect(() => {
        getData()
    }, [])


    const getData = () => {
        get('/tour/search')
            .then((res) => {
                console.log('search res', res);
                setData(res?.data)
            }).catch((err) => {
                console.log(err)
            }
            )
    }

    const form = useRef();
    const handleValidSubmit = (e, v) => {
        get(`/tour/search?string=${v?.title}`)
            .then((res) => {
                console.log('search res', res);
                setData(res?.data)
            }).catch((err) => {
                console.log(err)
            }
            )
    }


    const openDetail = (item) => {

        const tempId = item?._id.slice(item?._id.length - 4, item?._id.length);
        navigate('/tour/' + tempId + "/" + (item?.name).split(" ").join("-").toLowerCase());
    }
    const onChangeMethod = (e) => {
        setTrimInput(true)
        setStringValue(e.target.value)
    }


    return (
        <>
            {/* <section className="tg-parallax tg-innerbanner tg_innerbanner">
                <div className="tg-sectionspace tg-haslayout search_list_page" style={{ backgroundImage: `url('https://aahilya.s3.ap-south-1.amazonaws.com/image/Experience/1687499203218.webp')`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <h1>Search</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
            <main id="tg-main" className="tg-main tg-haslayout container____">
                {/* <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item" aria-current="page">Search</li>

                    </ol>
                </nav> */}
                <section className='clothe_section search_box'>
                    <AvForm ref={form} onValidSubmit={handleValidSubmit}>
                        <div className='container'>
                            {
                                trimInput == false ? <i class="fa fa-search" aria-hidden="true"></i> : <i onClick={() => { setTrimInput(false); setStringValue('') }} class="fa fa-times" aria-hidden="true"></i>
                            }
                            <AvField type="text" value={stringValue} onChange={onChangeMethod} name="title" class="search-control" id="exampleFormControlInput1" placeholder="...search" />
                            <button type="submit" class="bar search_btn">Search</button>
                        </div>
                    </AvForm>
                </section>
                <section className="clothe_section pb-100  pt-30px">
                    <div className="container">
                        {/* <div className="sec_title">
                            <h2>Discover Holidays:</h2>
                        </div> */}
                        {
                            data?.map((item, index) => (
                                <>
                                    {console.log('item', item)}
                                    {index % 2 ?
                                        <div className="row pt-50">
                                            <div className="col-md-8">
                                                <div className="bg-txt">
                                                    <h2 className="et_main" onClick={() => openDetail(item)} style={{ cursor: 'pointer' }}>{item?.name}</h2>
                                                    <p>{item?.overview}</p>
                                                    <div className="known_more_box">
                                                        <button className="learn-more">
                                                            <span className="circle" aria-hidden="true">
                                                                <span className="icon arrow"></span>
                                                            </span>
                                                            <a className="button-text" onClick={() => openDetail(item)}>Know More</a>
                                                        </button>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="bg-one bg_one_exp ">
                                                    <img src={item?.banner} onClick={() => openDetail(item)} style={{ cursor: 'pointer' }} />
                                                </div>
                                            </div>

                                        </div>
                                        :
                                        <div className="row pt-50 pt-5">
                                            <div className="col-md-4 order_1">
                                                <div className="bg-one bg_one_exp ">
                                                    <img src={item?.banner} onClick={() => openDetail(item)} style={{ cursor: 'pointer' }} />
                                                </div>
                                            </div>
                                            <div className="col-md-8 order_2p">
                                                <div className="bg-txt">
                                                    <h2 className="et_main" onClick={() => openDetail(item)} style={{ cursor: 'pointer' }}>{item?.name}</h2>
                                                    <p>{item?.overview}</p>
                                                    <div className="known_more_box">
                                                        <button className="learn-more">
                                                            <span className="circle" aria-hidden="true">
                                                                <span className="icon arrow"></span>
                                                            </span>
                                                            <a className="button-text" onClick={() => openDetail(item)}>Know More</a>
                                                        </button>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                    }
                                </>
                            ))
                        }


                    </div>

                </section>
            </main>

        </>
    )
}
