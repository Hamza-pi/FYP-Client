import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import { addToWishlist } from "../features/products/productSlice";
import {addToCart, addToCompare} from "../features/auth/authSlice"
const ProductCard = ({product}) => {

  const dispatch = useDispatch();
  const wishlist = useSelector((state)=>state.product.wishlist.find((item)=>item._id===product?._id))
  const alreadyAdded = useSelector((state)=>state.auth.cart.find((item)=>item.productId._id===product?._id))

  const navigate = useNavigate()
  
  return (
    <div className="product-container">
        <div className="product">
          <div className="wish-icon" onClick={()=>dispatch(addToWishlist(product?._id))}>
            <img src={wishlist?"/images/wish-black.svg":"/images/wish.svg"} alt="" />
          </div>
          <div className="action-bar">
            <img src="/images/prodcompare.svg" alt="" onClick={()=>dispatch(addToCompare(product))}/>
            <img src="/images/view.svg" alt="" onClick={()=>navigate(`/product-page/${product?._id}`)}/>
            {product.qty<1?null:alreadyAdded?null:<img src="/images/add-cart.svg" alt="" onClick={()=>dispatch(addToCart({productId:product?._id,price:product?.price,qty:1,color:product?.color}))}/>}
          </div>
          <div className="image">
            <img src={product?.images[0]} alt="" />
            <img src={product?.images[1]} alt="" />
          </div>
          <div className="details">
            <h6 className="brand">{product?.brand.title}</h6>
            <Link to={`/product-page/${product?._id}`}>
              <h5>{product?.title}</h5>
            </Link>
            <div className="rating">
              <ReactStars
                count={5}
                size={18}
                edit={false}
                value={product?.totalRating}
                activeColor="#ffc30e"
              />
            </div>
            <p className="price">${product?.price}</p>
          </div>
        </div>
    </div>
  );
};

export default ProductCard;
