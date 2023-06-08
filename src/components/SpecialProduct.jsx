import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { useDispatch,useSelector } from "react-redux";
import { addToWishlist } from "../features/products/productSlice";
import {addToCart} from "../features/auth/authSlice"


const SpecialProduct = ({product}) => {

  const dispatch = useDispatch();
  const wishlist = useSelector((state)=>state.product.wishlist.find((item)=>item._id===product?._id))
  const alreadyAdded = useSelector((state)=>state.auth.cart.find((item)=>item.productId._id===product?._id))
  const navigate = useNavigate()

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  const [mainImg, setMainImg] = useState(product?.images[0]);
  return (
    <div className="special-product">
      <div className="special-product-image">
        <img src={mainImg} alt="" className="mainImg"/>
        <div className="image-slider">
          <Slider {...settings}>
            {product?.images.map((img, key) => (
              <img
                key={key}
                src={img}
                alt=""
                className="slider-img"
                onClick={() => setMainImg(img)}
              />
            ))}
          </Slider>
        </div>
      </div>
      <div className="wish-icon" onClick={()=>dispatch(addToWishlist(product?._id))}>
        <img src={wishlist?"/images/wish-black.svg":"/images/wish.svg"} alt="" />
      </div>
      <div className="action-bar">
        <img src="images/prodcompare.svg" alt="" />
        <img src="images/view.svg" alt="" onClick={()=>navigate(`/product-page/${product?._id}`)}/>
      </div>
      <div className="special-product-content">
        <h6 className="brand">{product?.brand.title}</h6>
        <h5 className="special-title">
          <Link to={`/product-page/${product?._id}`}>
            {product?.title}
          </Link>
        </h5>
        <div className="rating">
          <ReactStars
            count={5}
            size={16}
            edit={false}
            value={product?.totalRating}
            activeColor="#ffc30e"
          />
        </div>
        <p className="price">${product?.price}</p>
        <div className="progress-container">
          <p className="qty-available">
            products:&nbsp;<span className="qty">{product?.qty}</span>
          </p>
          <div className="progress">
            <div className="progress-bar"></div>
          </div>
        </div>
        {
          product.qty<0?<button className="sp-button">Out of Stock</button>:
          alreadyAdded?
          <button className="sp-button" onClick={()=>navigate("/cart")}>Go To Cart</button>
          :
          <button className="sp-button" onClick={()=>dispatch(addToCart({productId:product?._id,price:product?.price,qty:1,color:product?.color}))}>Add To Cart</button>
        }
      </div>
    </div>
  );
};

export default SpecialProduct;
