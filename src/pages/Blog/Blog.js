import React, { useEffect, useState } from 'react'
import { get } from '../../helper/helper_api';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Loader from '../../Loader';

export default function Blog() {
    const location = useLocation();
    const navigate = useNavigate();
    // console.log('detination location',location)

    const [blog, setBlog] = useState([]);
    const [loader, setLoader] = useState(false);
    useEffect(() => {
        window.scroll(0, 0);
        destinationList();
    }, []);
    
    const destinationList = () => {
        setLoader(true)
        get('/blog/list').then((json) => {
            
            if (json?.statusCode == 200) {
                //   console.log('destination category', json);
                setLoader(false)
                setBlog(json?.data);
            }

        }).catch((err) => {
            console.log(err);
            setLoader(false)
        });
    }

    const openDetail = (item) => {

        const tempId = item?._id.slice(item?._id.length - 4, item?._id.length);
        navigate('/blog/' + tempId + "/" + (item?.name).split(" ").join("-").toLowerCase());
    }
    return (
        <>
        {
            loader  && <Loader />
        }
            <div id="tg-wrapper" className="tg-wrapper tg-haslayout">

                <section className="tg-parallax tg-innerbanner tg_innerbanner">
                    <div className="tg-sectionspace tg-haslayout blog_list_page" style={{ backgroundImage: `url(${blog[0]?.banner})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <h1>Blogs</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <main id="tg-main" className="tg-main tg-haslayout container____">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item" aria-current="page">Blogs</li>
                       
                    </ol>
                </nav>
                    <section className="blog_list_section pt-100 pb-100">
                        <div className="container">
                            <div className="row">

                                {
                                    blog?.map((item, index) => (
                                        <div className="col-lg-4 col-md-6">
                                            <a onClick={()=>openDetail(item)}>
                                                <div className="info-box blog-box-info-box">
                                                    <div className="image-top">
                                                        <img src={item?.banner} />
                                                    </div>
                                                    <div className="flow">
                                                        <h1>{item?.name?.length > 45 ? item?.name?.substring(0, 45) + "..." : item?.name}</h1>
                                                        
                                                         {/* <div dangerouslySetInnerHTML={{__html:item?.desc}}></div> */}
                                                    </div>
                                                </div>
                                            </a>
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
