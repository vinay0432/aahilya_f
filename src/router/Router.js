
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Blog from "../pages/Blog/Blog";
import Home from "../Home";

// import TourList from '../Tours';
// import TourDetailPage from '../Tours/DetailPage';
import About from '../pages/about';
import Contact from '../pages/contact';
import Gallery from '../pages/gallery';
import Video from '../pages/video';
// import Signup from '../pages/auth/Signup'
import TopDetination from '../pages/Destinations';
import TopDetinationDetail from '../pages/Destinations/Detail';
import GroupTours from '../pages/Tours';
import GroupToursDetails from '../pages/Tours/Details';
import ExperienceList from '../pages/Experience';
import ExperienceDetails from '../pages/Experience/Details';
import Testimonial from '../pages/Testimonials/Testimonial';
import Header from "../Header";
import Footer from "../Footer";
import { useEffect, useState } from "react";
// import Login from "../pages/auth/Login";
// import ForgotPassword from "../pages/auth/ForgotPassword";
import BlogDetail from "../pages/Blog/BlogDetail";
// import Review from "../pages/review/Review";
// import PropertyList from '../pages/Continent';
// import Destination from '../pages/Continent/List';
// import Search from '../pages/search';
// import Sitemap from "../pages/sitemap";
// import Dashboard from "../pages/Dashboard";
// import Profile from "../pages/auth/Profile";
import MobileHeader from "../MobileHeader";
import BookingForm from "../pages/Enquire/BookingForm";
import SearchList from "../pages/search/SearchList";


export default function Router() {

  const [headerData, setHeaderData] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isHeader, setIsHeader] = useState(true);

  return (
    <>
      <BrowserRouter>
        <Header setHeaderData={setHeaderData} setIsHeader={setIsHeader} setMobileMenu={setMobileMenu} mobileMenu={mobileMenu}/>
        {/* <MobileHeader setHeaderData={setHeaderData} setMobileMenu={setMobileMenu}/> */}
        <Routes>
          <Route path="/" element={<Home headerData={headerData} />} />
          <Route path="/blog/:id/:name" element={<BlogDetail headerData={headerData}/>} />
          <Route path="/experience/:id/:name" element={<ExperienceDetails headerData={headerData}/>} />
          <Route path="/tour/:id/:name" element={<GroupToursDetails headerData={headerData} isHeader={isHeader}/>} />
          <Route path="/destinations/:id/:name" element={<TopDetinationDetail headerData={headerData} isHeader={isHeader}/>} />
          <Route path="/destinations/:id/:name/:class" element={<TopDetinationDetail headerData={headerData} isHeader={isHeader}/>} />
          <Route path="/top-destinations" element={<TopDetination headerData={headerData}/>} />
          <Route path="/group-tours" element={<GroupTours headerData={headerData}/>} />
          <Route path="/experience" element={<ExperienceList headerData={headerData}/>} />
          <Route path="/blog" element={<Blog headerData={headerData}/>} />
          <Route path="/about" element={<About />} />
          <Route path="/testimonial" element={<Testimonial />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/booknow" element={<BookingForm />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/search" element={<SearchList />} />
          <Route path="/testimonial/hear_from_our_guests" element={<Video />} />
          {/* <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} /> */}
          {/* <Route path="/profile" element={<Profile />} /> */}
          {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
          {/* <Route path="/review/:id" element={<Review />} /> */}
          {/* <Route path="/search" element={<Search headerData={headerData} />} /> */}
          {/* <Route path="/sitemap" element={Sitemap} /> */}
          {/* <Route path="/continent" element={<Destination headerData={headerData} />} /> */}
          {/* <Route path="/hotels/:id/:name" element={<HotelsDetails />} /> */}
          {/* <Route path="*" element={<NoPage />} /> */}
        </Routes>
        <Footer headerData={headerData} />
      </BrowserRouter>
    </>
  );
}