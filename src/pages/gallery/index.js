import React, { useEffect, useState } from 'react'
import { get } from '../../helper/helper_api';
import Loader from '../../Loader';
import { Link } from 'react-router-dom';
import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/dist/photoswipe.css';
import { LightBox } from 'react-lightbox-pack';
import "react-lightbox-pack/dist/index.css";
const data = [
	{
		"id":  1,
		"banner":  "https://picsum.photos/200/800",
		"title":  "Lorem Ipsum",
		"description":
		"Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos assumenda, velit explicabo non at consequuntur accusamus hic optio alias error nisi sunt sint veniam aperiam similique dolor fugit itaque minima!"
	},
	{
		"id":  2,
		"banner":  "https://picsum.photos/300/200",
		"title":  "Lorem Ipsum",
		"description":
		"Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos assumenda, velit explicabo non at consequuntur accusamus hic optio alias error nisi sunt sint veniam aperiam similique dolor fugit itaque minima!"
	},
	{
		"id":  3,
		"banner":  "https://picsum.photos/800/200",
		"title":  "Lorem Ipsum",
		"description":
		"Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos assumenda, velit explicabo non at consequuntur accusamus hic optio alias error nisi sunt sint veniam aperiam similique dolor fugit itaque minima!"
	},
	{
		"id":  4,
		"banner":  "https://picsum.photos/500/800",
		"title":  "Lorem Ipsum",
		"description":
		"Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos assumenda, velit explicabo non at consequuntur accusamus hic optio alias error nisi sunt sint veniam aperiam similique dolor fugit itaque minima!"
	},
	{
		"id":  4,
		"banner":  "https://picsum.photos/500",
		"title":  "Lorem Ipsum",
		"description":
		"Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos assumenda, velit explicabo non at consequuntur accusamus hic optio alias error nisi sunt sint veniam aperiam similique dolor fugit itaque minima!"
	}
]
function Gallary() {
  const [gallery, setGallery] = useState([]);
  const [loader, setLoader] = useState(false);

  const [toggle, setToggle] = React.useState(false);
  const [sIndex, setSIndex] = React.useState(0);
  useEffect(() => {
    window.scroll(0, 0);
    destinationList();
  }, [])
  const destinationList = () => {
    setLoader(true)
    get('/gallery/list').then((json) => {

      if (json?.statusCode == 200) {
        //   console.log('destination category', json);
        setLoader(false)
        json?.data?.map((item)=>{
          item.image=item.banner
        })
        setGallery(json?.data);
      }

    }).catch((err) => {
      setLoader(false)
      console.log(err);
    });
  }


  // Handler
  const lightBoxHandler = (state, sIndex) => {
    setToggle(state);
    setSIndex(sIndex);
  };

  console.log('gallery',gallery,data)

  return (
    <>
      {
        loader && <Loader />
      }
      <div id="tg-wrapper" className="tg-wrapper tg-haslayout">

        <section className="tg-parallax tg-innerbanner tg_innerbanner">
          <div className="tg-sectionspace tg-haslayout galllery_t_new" >
            <div className="container">
              <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <h1>Gallery</h1>
                </div>
              </div>
            </div>
          </div>
        </section>

        <main id="tg-main" className="tg-main tg-haslayout container____">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">Home</Link></li>
              <li className="breadcrumb-item" aria-current="page">Gallery</li>

            </ol>
          </nav>
          <section id="portfolio-masonry" className="portfolio portfolio-masonry masonry-spaced
                portfolio-4 col portfolio-animation pb-80 pt-100">
            <div className="container portfolio-filter">
              {/* <Gallery>
                <div id="portfolio-all" className="row">

                  {
                    gallery?.map((item, index) => (
                      <div className="col-lg-3 col-md-4 col-sm-6 portfolio-item filter-Mobile" key={index}>
                        <Item
                          original={item?.banner}
                          thumbnail={item?.banner}
                          className="img_view"
                          width="1300"
                          height="750"
                        >
                          {({ ref, open }) => (
                            <div className="portfolio-img gallery_img_thumb">
                              <img ref={ref} onClick={open} src={item?.banner} />
                            </div>
                          )}
                        </Item>

                      </div>
                    ))
                  }

                </div>
              </Gallery> */}

              <div>
                {gallery.map((item, index) => (
                 <div className="col-lg-3 col-md-4 col-sm-6 portfolio-item filter-Mobile" key={index}>
                   <div className="portfolio-img gallery_img_thumb">
                    <img
                      // key={item.id}
                      src={item.image}
                      // alt={item.title}
                      onClick={() => {
                        lightBoxHandler(true, index);
                      }}
                    />
                    </div>
                  </div>
                ))}
                <LightBox
                  state={toggle}
                  event={lightBoxHandler}
                  data={gallery}
                  imageWidth="60vw"
                  imageHeight="70vh"
                  thumbnail={false}
                  thumbnailHeight={0}
                  thumbnailWidth={0}
                  setImageIndex={setSIndex}
                  imageIndex={sIndex}
                />
              </div>
            </div>
          </section>


          <div className="form_second footer_form_contact">

          </div>
        </main>


      </div>
    </>
  )
}

export default  Gallary;
