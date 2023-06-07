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
import { addToWishlist, getAProduct } from "../features/products/productSlice";
import useScroll from "../hooks/useScroll"
import { addToCart } from "../features/auth/authSlice";
const Product = () => {

  useScroll()
  
  const {id} = useParams()
  const dispatch = useDispatch()
  const navigate =useNavigate()

  useEffect(()=>{
    dispatch(getAProduct(id))
  },[dispatch,id])

  const {aproduct,products} = useSelector((state)=>state.product)

  const wishlist = useSelector((state)=>state.product.wishlist.find((item)=>item._id===aproduct?._id))
  const alreadyAdded = useSelector((state)=>state.auth.cart.find((item)=>item.productId._id===aproduct?._id))
  
  const [ordered, setOrdered] = useState(true);
  const [display, setDisplay] = useState(false);
  const [qty,setQty] = useState(1)

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
                      isFluidWidth: true,
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
                            isFluidWidth: true,
                            src: `${img}`
                          },
                          largeImage: {
                            src: `${img}`,
                            width: 400,
                            height: 400,
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
                  value={aproduct?.totalRating}
                  activeColor="#ffc30e"
                />
                <p>({aproduct?.totalRating} review)</p>
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
              <button className="slide-btn" onClick={()=>alreadyAdded?navigate("/cart"):dispatch(addToCart({productId:aproduct?._id,qty:qty,color:aproduct?.color,price:aproduct?.price}))}>{alreadyAdded?"Go To Cart":"Add To Cart"}</button>
              <span className="wishlist">
                <div onClick={()=>dispatch(addToWishlist(aproduct?._id))}>
                  <img src={wishlist?"/images/wish-black.svg":"/images/wish.svg"} alt="" />
                  <p>Add To Wishlist</p>
                </div>
                <div>
                  <img src="/images/prodcompare.svg" alt="" />
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
                    value={aproduct?.totalRating}
                    activeColor="#ffc30e"
                  />
                  <p>Based on {aproduct?.totalRating} review</p>
                </span>
                <p
                  className="write-review"
                  onClick={() => (ordered ? setDisplay(!display) : null)}
                >
                  Write a review
                </p>
              </div>
              <form
                className="write-review-form"
                style={{ display: `${display ? "block" : "none"}` }}
              >
                <h2>Write A Review</h2>
                <label htmlFor="name">Name</label>
                <input type="text" placeholder="Enter Your Name" name="name" />
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  placeholder="Enter Your Email"
                  name="email"
                />
                <label>Rating</label>
                <ReactStars
                  count={5}
                  size={18}
                  edit={true}
                  value={0}
                  activeColor="#ffc30e"
                />
                <label htmlFor="title">Review Title</label>
                <input
                  type="text"
                  placeholder="Give your review a title"
                  name="title"
                />
                <label htmlFor="body">Body of review(1500)</label>
                <textarea
                  cols={20}
                  rows={10}
                  type="text"
                  placeholder="Write Your Comments Here"
                  name="body"
                />
                <button type="submit" className="slide-btn">
                  Submit Review
                </button>
              </form>
              <div className="customer-reviews">
                <h2>Hamza Mukhtar</h2>
                <ReactStars
                  count={5}
                  edit={false}
                  value={5}
                  activeColor="#ffc30e"
                />
                <p>
                  <span>HM</span> on <span>Jan 10,2023</span>
                </p>
                <p>Very Good Stuff</p>
              </div>
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
