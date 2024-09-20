import React, { useEffect, useState } from 'react'
import { get, post } from '../../helper/helper_api';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Loader from '../../Loader';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button, FormGroup } from 'reactstrap';
import {
    FacebookShareButton,
    OKShareButton,
    PinterestShareButton,
    WhatsappShareButton,
    InstapaperShareButton,
    TelegramShareButton,
    LinkedinShareButton
} from "react-share";
import { toast } from 'react-toastify';
export default function BlogDetail() {
    const [blogDetail, setBlogDetail] = useState(undefined);
    const pramas = useParams();
    const location = useLocation();
    // console.log('detination location', location, pramas)
    const [proID, setProID] = useState(null);
    const [type, setType] = useState(null);
    const [loader, setLoader] = useState(false);
    const [isShare, setIsShare] = useState(false);
    const [copyUrl, setCopyUrl] = useState(null);
    const [copyText, setCopyText] = useState('Copy');
    const shareUrl = window.location.href;
    // console.log('shareUrl',window.location.href)

    useEffect(() => {
        // console.log('path on listing', location.pathname);
        setCopyUrl(shareUrl)

        let path = location.pathname.split("/");
        if (path.length > 0)
            setType(path[3].split('-').join(" "));
        if (path.length > 1)
            setProID(path[2]);

    }, [location?.pathname]);


    useEffect(() => {
        // console.log('proID',proID)
        if (proID)
            getData();
    }, [proID])

    const getData = () => {
        setLoader(true);
        get('/blog/detail?blogId=' + proID).then((json) => {
            if (json?.statusCode == 200) {
                // console.log('destination detail', json);
                setLoader(false);
                setBlogDetail(json?.data);
                if (!blogDetail)
                    window.scroll(0, 0);
            }

        }).catch((err) => {
            console.log(err);
            setLoader(false)
        });
    }

    const handleLike = () => {
        setLoader(true);
        post("/blog/like", { blogId: blogDetail?._id })
            .then(res => {
                if (res?.statusCode == 200) {
                    getData();
                } else {
                    toast.error(res?.error);
                }
            })
            .catch(err => {
                console.log('error whiling like on blog', err);
                toast.error("Something Went Wrong!");
            })
    }

    const handleComment = (e, v) => {
        setLoader(true);
        post("/blog/add_comment", { blogId: blogDetail?._id, message: v?.message })
            .then(res => {
                if (res?.statusCode == 200) {
                    getData();
                } else {
                    toast.error(res?.error);
                }
            })
            .catch(err => {
                console.log('error whiling commenting on blog', err);
                toast.error("Something Went Wrong!");
            })
    }

    return (
        <>
            {
                loader && <Loader />
            }
            <div id="tg-wrapper" className="tg-wrapper tg-haslayout" >
                <section className="tg-parallax tg-innerbanner tg_innerbanner">
                    <div className="tg-sectionspace tg-haslayout blog_list_page" style={{ backgroundImage: `url(${blogDetail?.banner})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <h1>{blogDetail?.name}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <main id="tg-main" className="tg-main tg-haslayout container____" style={{ background: '#35b5ac' }}>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item" aria-current="page"><Link to="/blog">Blogs</Link></li>
                            <li className="breadcrumb-item active" style={{ textTransform: 'capitalize' }} aria-current="page">{type}</li>
                        </ol>
                    </nav>
                    <section className="blog_list_section pt-100 pb-100">
                        <div className="container blog_cont">
                            <div className="row blog_section">
                                <div className="col-12">
                                    <div className="tg-sectiontitle tg-sectiontitleleft just_" >
                                        <h2 className='blog_heading'>{blogDetail?.name}</h2>
                                        <img src={require('../../assets2/images/tile-heading-1.png')} />
                                    </div>
                                </div>
                                <div className="blog_container">
                                    <div dangerouslySetInnerHTML={{ __html: blogDetail?.desc }}></div>
                                </div>
                                <div style={{justifyContent:'center', display:'flex'}}>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', width: '50%', justifyContent: 'center', alignItems: 'center' }}>
                                        {blogDetail?.keywords?.map((item) => (
                                            <div style={{ backgroundColor: "#ec048a", marginTop: 10, padding: 10, paddingLeft: 15, paddingRight: 15, borderRadius: 40, marginLeft: 10 }}>
                                                <span style={{ color: '#fff' }}>{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className='like_and_share'>
                                    <ul>
                                        <li>
                                            {blogDetail?.like} Likes
                                        </li>
                                        <li>
                                            <button type='button' onClick={handleLike}><i class="fa fa-thumbs-up" aria-hidden="true"></i></button>
                                        </li>
                                        <li>
                                            <button type='button' onClick={() => setIsShare(true)}><i class="fa fa-share-alt" aria-hidden="true"></i></button>
                                        </li>
                                    </ul>
                                    <div class={isShare == false ? 'popup' : 'popup show'}>
                                        <div className='modal_header'>
                                            <span>Share Modal</span>
                                            <div class="close" onClick={() => setIsShare(false)}><i class="fa fa-times" aria-hidden="true"></i></div>
                                        </div>
                                        <div class="content">
                                            <p>Share this link via</p>
                                            <ul class="icons">
                                                <FacebookShareButton className='icon' url={shareUrl}><i class="fab fa-facebook-f"></i></FacebookShareButton>
                                                {/* <OKShareButton className='icon' url={shareUrl}><i class="fab fa-instagram"></i></OKShareButton> */}
                                                <PinterestShareButton className='icon' media={blogDetail?.image} url={shareUrl} description={blogDetail?.overview} ><i class="fa fa-pinterest" aria-hidden="true"></i></PinterestShareButton>

                                                <WhatsappShareButton className='icon' url={shareUrl}><i class="fab fa-whatsapp"></i></WhatsappShareButton>
                                                <TelegramShareButton className='icon' url={shareUrl}><i class="fab fa-telegram-plane"></i></ TelegramShareButton>

                                            </ul>
                                            <p>Or copy link</p>
                                            <div class="field">
                                                <i class="fa fa-link" aria-hidden="true"></i>
                                                <input type="text" readonly value={copyUrl} />
                                                <button className='coppy' onClick={() => {
                                                    navigator.clipboard.writeText(copyUrl)
                                                    setCopyText('Copied!')
                                                    setTimeout(() => {
                                                        setCopyText('Copy')
                                                    }, 500)
                                                }}>{copyText}</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='row comment_section'>
                                <AvForm onValidSubmit={handleComment}>
                                    <AvField name="message"
                                        type="textarea"
                                        placeholder="Leave a comment here"
                                        required
                                    />
                                    <FormGroup>
                                        <Button type="submit">Comment</Button>
                                    </FormGroup>
                                </AvForm>
                                <div className='comment_box'>
                                    <h2>{blogDetail?.comment?.length} Comments</h2>
                                    <div className='commet-line'>
                                        <ul>
                                            {blogDetail?.comment?.map((item) => (
                                                <li>
                                                    <span>{item?.createdAt}</span>
                                                    <p>{item?.message}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </section>
                </main>


            </div>
        </>
    )
}
