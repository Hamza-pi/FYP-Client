import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { Link, NavLink,useLocation } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import { getCart, logOut, removeCartItem } from "../features/auth/authSlice";

const Header = () => {

  const dispatch = useDispatch()
  const [active, setActive] = useState(false);
  const [cartBar, setBar] = useState(false);
  const location= useLocation()
  const [empty, setEmpty] = useState(false);
  const {cart,subTotal,user} = useSelector((state)=>state.auth)
  const {categories} = useSelector((state)=>state.category)

  useEffect(()=>{
    setBar(false)
    if(cart.length===0){
      setEmpty(true)
      dispatch(getCart())
    }
    else{
      setEmpty(false)
    }
},[location,cart.length,dispatch])

  return (
    <>
      <header className="header-top">
        <div className="shipping">
          <p>Free Shipping Over $100 & Free Returns</p>
        </div>
        <div className="number">
          Hotline:<a href="tel:923064799034">+92-3064799034</a>
        </div>
      </header>
      <section className="header-bottom">
        <div className="logo">DigiCom.</div>
        <div className="search-bar">
          <input type="text" placeholder="Search Product Here..." />
          <div className="search-icon">
            <BsSearch style={{ color: "black" }} />
          </div>
        </div>
        <div className="links">
          <span className="link">
            <img src="../images/compare.svg" alt="" />
            <Link to="compare">
              Compare <br /> Products
            </Link>
          </span>
          <span className="link">
            <img src="../images/wishlist.svg" alt="" />
            <Link to="wish">
              Favourite <br /> Wishlist
            </Link>
          </span>
          <span className="link">
            <img src="../images/user.svg" alt="" />
            {
              user?.token?
         
              <Link to="profile">
                Welcome <br /> {user?.firstname?.slice(0,5)}
              </Link>
            :
            <Link to="login">
              Log In <br /> My Account
            </Link>
            }
          </span>
        </div>
        <div className="cart" onClick={() => setBar(!cartBar)}>
          <img src="../images/cart.svg" alt="" />
          <p className="cart-amount">
            <span className="cart-count">{cart?.length}</span>${subTotal}
          </p>
        </div>
        <div
          className="cart-side-bar"
          style={{
            transform: `${cartBar ? "translateX(0)" : "translateX(100%)"}`,
          }}
        >
          <p className="close" onClick={() => setBar(false)}>
            x
          </p>
          <div
            className="empty"
            style={{ display: `${empty ? "block" : "none"}` }}
          >
            <p>😫 No Items To Display</p>
            <Link className="slide-btn" to="store" onClick={() => setBar(false)}>
              Continue Shopping 👉
            </Link>
          </div>
          <div className="cart-prdcts">
            {cart?.map((item)=>(
              <div key={item._id} className="prdct-container">
              <img src={item.productId.images[0]} alt="" />
              <div className="prdct-details">
                <h2>
                 {item.productId.title}
                </h2>
                <h5>{item.qty}X ${item.total}</h5>
                <p>
                  Color:<span style={{backgroundColor:`${item.color.value}`}}></span>
                </p>
              </div>
              <img src="/images/del.svg" alt="" className="del-icon" onClick={()=>dispatch(removeCartItem(item.productId._id))}/>
            </div>
            ))}
          </div>
          {empty?"":<div className="cart-summary">
            <span className="summary">
              <div className="no-items">
                <h5>Total Item</h5>
                <p>{cart.length}</p>
              </div>
              <div className="sub-total">
                <h5>Sub Total</h5>
                <p>${subTotal}</p>
              </div>
            </span>
            <div className="cart-btns">
              <Link to="cart" className="slide-btn">
                View Cart
              </Link>
              <Link className="slide-btn-1" to="/checkout">Check Out</Link>
            </div>
          </div>}
        </div>
      </section>
      <nav>
        <div className="categ-dropdown">
          <div className="categ-title" onClick={() => setActive(!active)}>
            <img src="images/menu.svg" alt="" />
            <p>Shop Categories</p>
            <ul className={`menu ${active ? "active" : ""}`}>
            {
              categories?.map((category)=>(
                <li key={category._id} className="menu-link">
                <NavLink to={`/store/${category._id}`}>{category.title}</NavLink>
              </li>
              ))
            }
            </ul>
          </div>
          <div className="dropdown-icon">
            <img src="images/arrow.svg" alt="" />
          </div>
        </div>
        <div className="nav-links" style={{width:`${user?"35%":"20%"}`}}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="store">Our Store</NavLink>
          <NavLink to="contact">Contact</NavLink>
          {
            user?
              <>
              <NavLink to="orders">My Orders</NavLink>
              <NavLink onClick={()=>dispatch(logOut())}>LogOut</NavLink>
              </>
            :null
          }
        </div>
      </nav>
    </>
  );
};

export default Header;
