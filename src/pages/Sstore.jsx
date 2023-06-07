import React,{useEffect} from "react";
import {useDispatch,useSelector} from "react-redux"
import PageTopBanner from "../components/PageTopBanner";
import ProductCard from "../components/ProductCard";
import useScroll from "../hooks/useScroll";
import { getAllProducts } from "../features/products/productSlice";
import { getAllCateg } from "../features/category/categorySlice";
import { getAllColor } from "../features/color/colorSlice";
import {Link,useParams } from "react-router-dom";

const Sstore = () => {
  useScroll();

  const {id} = useParams()
  const dispatch = useDispatch()

  useEffect(()=>{

    dispatch(getAllProducts({categ:id}))

    dispatch(getAllCateg())

    dispatch(getAllColor())

  },[dispatch,id])

  const {products} = useSelector((state)=>state.product)


  return (
    <>
      <PageTopBanner pagename={"OUR STORE"} />
      {
        products?.length>0?
        <section className="main-container">
        <main className="store-container" style={{padding:"20px 50px"}}>
          <div className="store-products">
           {products?.map((product,key)=>(
            <ProductCard key={key} product={product}/>
           ))}
          </div>
        </main>
      </section>:
      <div style={{width:"15%",margin:"30px auto",textAlign:"center"}}>
            <p>No Items To Display</p>
            <br/>
              <Link className="slide-btn" to="/store">
                Continue Shopping 👉
              </Link>
            </div>
      }
    </>
  );
};

export default Sstore;
