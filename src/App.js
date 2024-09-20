import React, { useState } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import './assets/font/all.css'
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";
import Router from './router/Router';
import { HelmetProvider } from 'react-helmet-async';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { CookiesProvider } from 'react-cookie';
export default function App() {

  AOS.init();
  return (
    <div>
      {/* <HelmetProvider> */}
      <CookiesProvider>
        <Router />
        </CookiesProvider>
      {/* </HelmetProvider> */}
    </div>
  )
}
