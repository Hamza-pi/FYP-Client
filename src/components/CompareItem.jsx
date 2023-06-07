import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeFromCompare } from "../features/auth/authSlice";

const CompareItem = ({ products }) => {

  const dispatch = useDispatch()

  return (
    <>
      {" "}
      {
       
        products?.length>0?
        products?.map((product, key) => (
        <div className="compare-item" key={key}>
          <div className="image-container">
            <img src="images/cross.svg" id="del-icon" alt="" onClick={()=>dispatch(removeFromCompare(product))}/>
            <img src={product?.images[0]} id="pr-img" alt="" />
          </div>
          <div className="item-details">
            <Link to={`/product-page/${product?._id}`}>
              <h5 className="item-title">{product?.title}</h5>
            </Link>
            <p className="price">${product?.price}</p>
          </div>
          <ul className="compare-labels">
            <li>
              <h5>Brand&nbsp;:</h5>
              <p>{product?.brand.title}</p>
            </li>
            <li>
              <h5>Category&nbsp;:</h5>
              <p>{product?.category.title}</p>
            </li>
            <li>
              <h5>Availability&nbsp;:</h5>
              <p>{product?.qty>0?"In Stock":"Out Of Stock"}</p>
            </li>
            <li>
              <h5>Color&nbsp;:</h5>
              <span className="color-container">
              <p  key={key} className="color" style={{ backgroundColor: `${product?.color.value}` }}></p>
              </span>
            </li>
          </ul>
        </div>
      )):
      <div style={{width:"100%",textAlign:"center",margin:"20px auto"}}>
        <p>😫 No Items To Compare</p>
      </div>
      }
    </>
  );
};
 
export default CompareItem;
