import React from "react";
import {useSelector,useDispatch} from "react-redux"
import PageTopBanner from "../components/PageTopBanner";
import { Link } from "react-router-dom";
import { removeCartItem, updateCartItem } from "../features/auth/authSlice";
const Cart = () => {

  const dispatch = useDispatch()
  const {cart,subTotal} = useSelector(state=>state.auth)

  return (
    <>
      <PageTopBanner pagename={"Your Shopping Cart"} />
      {
        cart.length>0?
        <table cellSpacing={0}>
        <thead>
          <tr>
            <th width="40%">Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {
            cart?.map((cartItem)=>(
          <tr key={cartItem?._id}>
            <td className="prdct">
              <Link to="">
                <img src={cartItem?.productId.images[0]} alt="" />
                <div className="details">
                  <h3>
                    {cartItem?.productId.title}
                  </h3>
                  <p>
                    Color:<span style={{backgroundColor:`${cartItem?.color.value}`}}></span>
                  </p>
                </div>
              </Link>
            </td>
            <td className="price">${cartItem?.productId.price}</td>
            <td className="tr-input">
              <div>
                <input
                  type="number"
                  className="styled-input"
                  defaultValue={cartItem?.qty}
                  min={1}
                  onMouseLeave={(e)=>dispatch(updateCartItem({id:cartItem?.productId._id,qty:e.target.value}))}
                />
                <span className="input-img" onClick={()=>dispatch(removeCartItem(cartItem?.productId._id))}>
                  <img src="/images/del.svg" alt=""/>
                </span>
              </div>
            </td>
            <td className="price">${cartItem?.total}</td>
          </tr>
            ))
          }
          <tr>
            <td className="cont-btn">
              <Link to="/store" className="slide-btn">
                Continue Shopping
              </Link>
            </td>
            <td></td>
            <td></td>
            <td className="cont-btn">
              <span>
                <h5>Subtotal ${subTotal}</h5>
              </span>
              <p>Taxes and shipping calculated at checkout</p>
              <Link className="slide-btn" to="/checkout">Check Out</Link>
            </td>
          </tr>
        </tbody>
      </table>:
      <div style={{textAlign:"center",margin:"20px"}}>
        <p>Your cart is currently empty</p>
        <br/>
        <Link className="slide-btn" to="/store">
          Continue Shopping 👉
        </Link>
      </div>
      }
    </>
  );
};

export default Cart;
