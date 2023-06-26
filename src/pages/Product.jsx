import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import PageTopBanner from "../components/PageTopBanner";
import ReactStars from "react-rating-stars-component";
import ReactImageMagnify from "react-image-magnify";
import ColorFilter from "../components/ColorFilter";
import { useDispatch, useSelector } from "react-redux";
import { SampleNextArrow, SamplePrevArrow } from "../components/SampleArrow";
import Slider from "react-slick";
import ProductCard from "../components/ProductCard";
import { addRatings, addToWishlist, getAProduct } from "../features/products/productSlice";
import useScroll from "../hooks/useScroll"
import { addToCart, addToCompare, getOrders } from "../features/auth/authSlice";
import {useFormik} from "formik"

const Product = () => {

  useScroll()
  
  const {id} = useParams()
  const dispatch = useDispatch()
  const navigate =useNavigate()

  const [ordered, setOrdered] = useState(false);
  const [display, setDisplay] = useState(false);
  const [qty,setQty] = useState(1);
  const [rating,setRating] = useState(0);

  const {aproduct,products} = useSelector((state)=>state.product)

  const {orders} = useSelector((state)=>state.auth)
  let isOrdered=orders.find((order)=>order.orderItems.find((item)=>item.product._id===aproduct?._id))

  const wishlist = useSelector((state)=>state.product.wishlist.find((item)=>item._id===aproduct?._id))
  const alreadyAdded = useSelector((state)=>state.auth.cart.find((item)=>item.productId._id===aproduct?._id))
  
  useEffect(()=>{
    dispatch(getAProduct(id))
    if(orders.length===0){
      dispatch(getOrders())
    }
    if(isOrdered!==undefined){
      setOrdered(true)
    }
    else{
      setOrdered(false)
    }
  },[dispatch,isOrdered,orders.length,id,rating])


  const formik = useFormik({
    initialValues:{
      star:rating,
      comment:""
    },
    onSubmit:(values)=>{
      dispatch(addRatings({...values,prodId:aproduct._id}))
    }
  })

  const newRatings =(rating)=>{
    setRating(rating)
    formik.setValues({star:rating})
  }


  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };


  return (
    <>
      <PageTopBanner pagename="Product Name" />
      <div className="main-container">
        <div className="prdct-details-contnainer">
          <div className="policy-container">
            <div className="product-images">
              <div className="main-img">
                <ReactImageMagnify
                  {...{
                    smallImage: {
                      alt: `${aproduct?.title}`,
                      isFluidWidth:false,
                      width:500,
                      height:550,
                      src: `${aproduct?.images[0]}`,
                    },
                    largeImage: {
                      src: `${aproduct?.images[0]}`,
                      width: 1000,
                      height: 1000,
                    },
                    enlargedImagePosition: "over",
                  }}
                />
              </div>
              <div className="sub-images">
                {
                  aproduct?.images.map((img,index)=>(
                    <div className="img-container" key={index}>
                      <ReactImageMagnify
                        {...{
                          smallImage: {
                            alt: `${aproduct?.title}`,
                            isFluidWidth: false,
                            width:250,
                            height:200,
                            src: `${img}`
                          },
                          largeImage: {
                            src: `${img}`,
                            width: 300,
                            height: 500,
                          },
                          enlargedImagePosition: "over",
                        }}
                      />
                </div>
                  ))
                }
              </div>
            </div>
            <div className="product-details">
              <h2>{aproduct?.title}</h2>
              <span className="price">
                <h3>${aproduct?.price}</h3>
              </span>
              <span className="reviews">
                <ReactStars
                  count={5}
                  edit={false}
                  activeColor="#ffc30e"
                  value={aproduct?.totalRatings}

                />
                <p>({aproduct?.ratings.length} review)</p>
              </span>
              <span className="brand">
                <h5>
                  Brand:<span>{aproduct?.brand.title}</span>
                </h5>
              </span>
              <span className="brand">
                <h5>
                  Tags:<span>{aproduct?.tags}</span>
                </h5>
              </span>
              
              <span className="color">
                <ColorFilter colordata={aproduct?.color.value} />
              </span>
              <span className="qty">
                {
                  alreadyAdded?<br/>:
                  <>
                  <h5>Quantity:</h5>
                <input type="number" className="styled-input" min={1} value={qty} onChange={(e)=>setQty(Number(e.target.value))} />
                  </>
                }
              </span>
             {
              aproduct?.qty>qty?
              <button className="slide-btn" onClick={()=>alreadyAdded?navigate("/cart"):dispatch(addToCart({productId:aproduct?._id,qty:qty,color:aproduct?.color,price:aproduct?.price}))}>{alreadyAdded?"Go To Cart":"Add To Cart"}</button>
              :
              <button className="slide-btn">Out of Stock</button>
             }
              <span className="wishlist">
                <div onClick={()=>dispatch(addToWishlist(aproduct?._id))}>
                  <img src={wishlist?"/images/wish-black.svg":"/images/wish.svg"} alt="" />
                  <p>Add To Wishlist</p>
                </div>
                <div  onClick={()=>dispatch(addToCompare(aproduct))}>
                  <img src="/images/prodcompare.svg" alt=""/>
                  <p>Compare Product</p>
                </div>
              </span>
            </div>
          </div>
        </div>
        <div className="product-description">
          <h1>Description</h1>
          <div className="policy-container" dangerouslySetInnerHTML={{__html:aproduct?.description}}>
          </div>
        </div>
        <div className="product-description">
          <h1>Reviews</h1>
          <div className="policy-container">
            <div className="reviews-container">
              <h2>Customer Reviews</h2>
              <div className="reviews">
                <span className="avg-reviews">
                  <ReactStars
                    count={5}
                    size={18}
                    edit={false}
                    value={aproduct?.totalRatings}
                    activeColor="#ffc30e"
                  />
                  <p>Based on {aproduct?.ratings.length} review</p>
                </span>
                {
                  ordered?
                  <p
                  className="write-review"
                  onClick={() => (setDisplay(!display))}
                >
                  Write a review
                </p>:null
                }
              </div>
              <form
                onSubmit={formik.handleSubmit}
                className="write-review-form"
                style={{ display: `${display ? "block" : "none"}` }}
              >
                <h2>Write A Review</h2>
                
                <label>Rating</label>
                <ReactStars
                  count={5}
                  onChange={newRatings}
                  size={18}
                  edit={true}
                  activeColor="#ffc30e"
                  value={formik.values.star}
                />

                <label htmlFor="body">Body of review</label>
                <textarea
                  cols={20}
                  rows={10}
                  type="text"
                  placeholder="Write Your Comments Here"
                  name="body"
                  onChange={formik.handleChange("comment")}
                  value={formik.values.comment}
                />
                <button type="submit" className="slide-btn">
                  Submit Review
                </button>
              </form>
              {
                aproduct?.ratings.map((rating)=>(
                  <div key={rating?._id} className="customer-reviews">
                    <ReactStars
                      count={5}
                      edit={false}
                      value={rating.star}
                      activeColor="#ffc30e"
                    />
                    <p>{rating.comment}</p>
              </div>
                ))
              }
            </div>
          </div>
        </div>
        <section className="featured-container">
          <h2 className="title">You May Also Like</h2>
          <div className="featured-products">
            <Slider {...settings}>
              {
                products?.map((item)=>(
                 item?.category.title===aproduct?.category.title?<ProductCard key={item._id} product={item}/>:null
                ))
              }
            </Slider>
          </div>
        </section>
      </div>
    </>
  );
};

export default Product;
