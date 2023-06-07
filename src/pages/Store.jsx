import React,{useEffect, useState} from "react";
import {useDispatch,useSelector} from "react-redux"
import PageTopBanner from "../components/PageTopBanner";
import ProductCard from "../components/ProductCard";
import ColorFilter from "../components/ColorFilter";
import useScroll from "../hooks/useScroll";
import { getAllProducts } from "../features/products/productSlice";
import { getAllCateg } from "../features/category/categorySlice";
import { getAllColor } from "../features/color/colorSlice";
import {Link } from "react-router-dom";
import { PropagateLoader } from "react-spinners";

const Store = () => {
  useScroll();

  const dispatch = useDispatch()
  const {products,isLoading} = useSelector((state)=>state.product)
  const {categories} = useSelector((state)=>state.category)
  const {colors} = useSelector((state)=>state.color)

  const [inStock,setInStock] = useState();
  const [outStock,setOutStock] = useState()
  const [min,setMin] = useState(null);
  const [max,setMax]= useState(null);
  const [categ,setCateg] = useState("");
  const [color,setColor] = useState("");
  const [tags,setTags] = useState("")


  useEffect(()=>{

    dispatch(getAllProducts({inStock,outStock,min,max,categ,color,tags}))

    dispatch(getAllCateg())

    dispatch(getAllColor())

  },[dispatch,inStock,outStock,min,max,categ,color,tags])

  const override = {
    display: "block",
    margin: "50px 650px",
    borderColor: "red",
  };
if(isLoading){

      return <PropagateLoader color="#fdd333" cssOverride={override} />;
    
  }

  return (
    <>
      <PageTopBanner pagename={"OUR STORE"} />
      <section className="main-container store">
        <div className="filters-container">
          <div className="category filter">
            <h5>Shop By Categories</h5>
            <ul className="filter-list">
            {
              categories?.map((categ,key)=>(
                <li key={key} onClick={()=>setCateg(categ._id)}>
                {categ.title}
              </li>
              ))
            }
            </ul>
          </div>
          <div className="filterby filter">
            <h5>Filter By</h5>
            <div className="filterby-filter-list filter-list">
              <h4>Availability</h4>
              <div className="checkboxes">
                <div className="checkbox">
                  <input type="checkbox" name="in-stock" onChange={(e)=>setInStock(e.target.checked)}/>
                  <label htmlFor="in-stock">In Stock</label>
                </div>
                <div className="checkbox">
                  <input type="checkbox" name="out-stock" onChange={(e)=>setOutStock(e.target.checked)}/>
                  <label htmlFor="out-stock">Out of Stock</label>
                </div>
              </div>
            </div>
            <div className="filterby-filter-list filter-price">
              <h4>Price</h4>
              <div className="price-inputs">
                <div className="p-input">
                  Rs.&nbsp;&nbsp;
                  <input type="number" placeholder="from" onChange={(e)=>setMin(e.target.value)}/>
                </div>
                <div className="p-input">
                  Rs.&nbsp;&nbsp;
                  <input type="number" placeholder="to" onChange={(e)=>setMax(e.target.value)}/>
                </div>
              </div>
            </div>
            <div className="filterby-filter-list filter-list">
              <h4>Color</h4>
              <div className="color">
                {
                colors?.map((color,key)=>(
                  <ColorFilter key={key} colordata={color.value} colorId={color._id} setColor={setColor}/>
                ))
               }
              </div>
            </div>
          </div>
          <div className="product-tag filter">
            <h5>Product Tag</h5>
            <div className="pr-tags">
              <span className="pr-tag" onClick={()=>setTags("Featured")}>Featured</span>
              <span className="pr-tag" onClick={()=>setTags("Special")}>Special</span>
              <span className="pr-tag" onClick={()=>setTags("Popular")}>Popular</span>
            </div>
          </div>
        </div>
        <main className="store-container">
         {
          products?.length>0?
          <div className="store-products">
           {products?.map((product,key)=>(
            <ProductCard key={key} product={product}/>
           ))}
          </div>:
          <div style={{textAlign:"center",margin:"20px"}}>
            <p>No Items To Display</p>
            <br/>
              <Link className="slide-btn" to="/">
                Continue Shopping 👉
              </Link>
            </div>
         }
          {/* <div className="pagination">
            <div className="results">Showing 15 of 21 .</div>
            <div className="page-toggler">
              <div className="page active-page">1</div>
              <div className="page">2</div>
              <div className="page">{">"}</div>
            </div>
          </div> */}
        </main>
      </section>
    </>
  );
};

export default Store;
