//=================== Imports ===================
import React, { useEffect } from "react";
import SliderData from "../components/SliderData";
import data from "../components/BannerData";
import subBannerData from "../components/SubBannerData";
import coll_data from "../components/CollectionData";
import services_data from "../components/ServiceData";
import SubBanner from "../components/SubBanner";
import CustomSlider from "../components/Slider";
import Banner from "../components/Banner";
import Collection from "../components/Collection";
import Service from "../components/Service";
import Marquee from "react-fast-marquee";
import ProductCard from "../components/ProductCard";
import Slider from "react-slick";
import { ToastContainer,toast } from "react-toastify";
//========================== Slider Arrows ========================
import { SampleNextArrow, SamplePrevArrow } from "../components/SampleArrow";
import SpecialProduct from "../components/SpecialProduct";
import PopularProduct from "../components/PopularProduct";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../features/products/productSlice";
import {getAllCateg} from "../features/category/categorySlice"
import {getAllColor} from "../features/color/colorSlice"
import { getCart } from "../features/auth/authSlice";
const Home = () => {

  const dispatch = useDispatch()
  const {products,isError}=useSelector((state)=>state.product)
  const {categories} = useSelector((state)=>state.category)
  const {colors} = useSelector((state)=>state.color)
  const {cart} = useSelector((state)=>state.auth)

  useEffect(()=>{
    if(products===null){
      dispatch(getAllProducts())
    }
    else if(categories===null){
      dispatch(getAllCateg())
    }
    else if(colors===null){
      dispatch(getAllColor())
    }
  },[dispatch,products,categories,colors])

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  const sp_settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
 
  if(isError){
    toast.error("😫 Something Went Wrong")
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>DigiCom.</title>
      </Helmet>

      {/* Slider and Banners Section */}
      <section className="banners-container">
        <div className="slider-container">
          <CustomSlider SliderData={SliderData} />
        </div>
        <div className="banner-container">
          {data.map((d, key) => (
            <Banner key={key} data={d} />
          ))}
        </div>
      </section>
      {/* Main Container */}
      <section className="main-container">
        {/* Services Container */}
        <section className="services-container">
          {services_data.map((data, key) => (
            <Service key={key} data={data} />
          ))}
        </section>
        {/* Collections Container */}
        <section className="collections-container">
          {coll_data.map((data, index) => (
            <Collection data={data} key={index} />
          ))}
        </section>
        {/* Featured Products Container */}
        <section className="featured-container">
          <h2 className="title">Featured Collection</h2>
          <div className="featured-products">
            <Slider {...settings}>
             {
              products?.map((item)=>(
                item.tags==="Featured"?
                <ProductCard key={item._id} product={item}/>:null
              ))
             }
            </Slider>
          </div>
        </section>
        {/* Sub Banner Container */}
        <section className="sub-banners-container">
          {subBannerData.map((data, key) => (
            <SubBanner data={data} key={key} />
          ))}
        </section>
        {/* Special Product Container */}
        <section className="special-products-container">
          <h2 className="title">Special Products</h2>
          <Slider {...sp_settings}>
          {
            products?.map((item)=>(
              item.tags==="Special"?
              <div className="slide" key={item?._id}>
              <SpecialProduct key={item?._id} product={item}/>
            </div>
            :null
            ))
          }
          </Slider>
        </section>
        {/* Popular products Container */}
        <h2 className="title" style={{ padding: "0 12px" }}>
          Our Popular Products
        </h2>
        {products===null?"":<PopularProduct products={products}/>}
        {/* Companies Marquee Container */}
        <section className="marquee-container-1">
          <Marquee className="marquee">
            <div className="marq-brand">
              <img src="images/brand-01.png" alt="" />
            </div>
            <div className="marq-brand">
              <img src="images/brand-02.png" alt="" />
            </div>
            <div className="marq-brand">
              <img src="images/brand-03.png" alt="" />
            </div>
            <div className="marq-brand">
              <img src="images/brand-04.png" alt="" />
            </div>
            <div className="marq-brand">
              <img src="images/brand-05.png" alt="" />
            </div>
            <div className="marq-brand">
              <img src="images/brand-06.png" alt="" />
            </div>
            <div className="marq-brand">
              <img src="images/brand-07.png" alt="" />
            </div>
            <div className="marq-brand">
              <img src="images/brand-08.png" alt="" />
            </div>
          </Marquee>
        </section>
      </section>
      <ToastContainer />
    </>
  );
};

export default Home;
