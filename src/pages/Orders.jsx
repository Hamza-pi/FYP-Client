import React, { useEffect } from 'react';
import {useSelector,useDispatch} from "react-redux"
import {getOrders} from "../features/auth/authSlice"
import PageTopBanner from "../components/PageTopBanner";
import { Link } from 'react-router-dom';
const Orders = () => {

  const dispatch = useDispatch()
  const {orders} = useSelector(state=>state.auth);
  useEffect(()=>{
    if(orders.length===0){
      dispatch(getOrders())
    }
  },[dispatch,orders.length])

  return (
    <>
      <PageTopBanner pagename={"Your Orders"} />
      {
        orders.length>0?
    <table className='orders-table'>
      <thead>
        <tr>
          <th width="15%" style={{textAlign:"center"}}>Product Image</th>
          <th width="15%">Product Title</th>
          <th width="15%">Product Color</th>
          <th width="15%">Product Price</th>
          <th width="15%">Quantity</th>
          <th width="5%" style={{textAlign:"left"}}>Status</th>
        </tr>
      </thead>
      <tbody className='orders-body'>
        {
          orders.map((order) => (
          <tr className='order-row' key={order._id}>
            <td>
              {order.orderItems.map((item) => (
                <div  className='product-image' key={item._id}>
                  <img src={item.product.images[0]} alt={item.product.title}/>
                </div>
              ))}
            </td>
            <td>
              {order.orderItems.map((item) => (
                <p className='product-title' key={item._id}>{item.product.title}</p>
              ))}
            </td>
            <td>
              {order.orderItems.map((item) => (
                  <p className='product-title product-color' key={item._id} style={{backgroundColor:`${item.color.value}`}}></p>
              ))}
            </td>
            <td>
              {order.orderItems.map((item) => (
                <div className='product-price' key={item._id}>${item.price}</div>
              ))}
            </td>
            <td>
              {order.orderItems.map((item) => (
                <div className='product-price' key={item._id}>{item.quantity}</div>
              ))}
            </td>
            <td>
              {order.orderItems.map((item) => (
                <div className={`product-price status ordered`} key={item._id}>{order.orderStatus}</div>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td style={{textAlign:"center"}}>Total Price:</td>
          <td></td>
          <td></td>
          <td style={{textAlign:"center"}}>
            ${orders.reduce((total, order) => total + order.totalPrice, 0)}
          </td>
        </tr>
      </tfoot>
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

export default Orders;
