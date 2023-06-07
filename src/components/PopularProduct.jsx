import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import Slider from "react-slick";
import { SampleNextArrow, SamplePrevArrow } from "../components/SampleArrow";
const PopularProduct = ({products}) => {
  const [tab, setTab] = useState(1);
  const pp_settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <section className="populars-container">
      <div className="collections-header">
        <ul className="tabs">
          <li onClick={() => setTab(1)}>
            <div className="tab">
              <img src="images/cat-icon-01.webp" alt="" />
            </div>
            <a href="#tab-1">Speakers</a>
          </li>
          <li onClick={() => setTab(2)}>
            <div className="tab">
              <img src="images/acc-2.png" alt="" />
            </div>
            <a href="#tab-2">Air Pords</a>
          </li>
          <li onClick={() => setTab(3)}>
            <div className="tab">
              <img src="images/headphone-2.png" alt="" />
            </div>
            <a href="#tab-3">Headphone</a>
          </li>
        </ul>
      </div>
      <div className={`${tab === 1 ? "active-tab" : "tabs-container"}`}>
        <div className="tab-inner">
          <img src="images/cat-product-banner.jpg" alt="" />
        </div>
        <div className="tab-products">
          <Slider {...pp_settings} className="tab-slider">
            {products?.map((item)=>(
              item.category.title==="Speakers"?
              <ProductCard key={item?._id} product={item}/>:null
            ))}
          </Slider>
        </div>
      </div>
      <div className={`${tab === 2 ? "active-tab" : "tabs-container"}`}>
        <div className="tab-inner">
          <img src="images/cat-product-banner-02.webp" alt="" />
        </div>
        <div className="tab-products">
        <Slider {...pp_settings} className="tab-slider">
            {products.map((item)=>(
              item.category.title==="Air Pords"?
              <ProductCard key={item?._id} product={item}/>:null
            ))}
          </Slider>
        </div>
      </div>
      <div className={`${tab === 3 ? "active-tab" : "tabs-container"}`}>
        <div className="tab-inner">
          <img src="images/cat-product-banner-03.webp" alt="" />
        </div>
        <div className="tab-products">
        <Slider {...pp_settings} className="tab-slider">
            {products.map((item)=>(
              item.category.title==="Headphone"?
              <ProductCard key={item?._id} product={item}/>:null
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default PopularProduct;
