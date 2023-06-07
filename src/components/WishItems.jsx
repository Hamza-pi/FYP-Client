import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {addToWishlist} from "../features/products/productSlice"
const WishItem = ({ products }) => {

  const dispatch = useDispatch()

  return (
    <>
      {" "}
      {products.map((product, key) => (
        <div className="wish-item" key={key}>
          <div className="image-container">
            <img src="images/cross.svg" id="del-icon" alt="" onClick={()=>dispatch(addToWishlist(product?._id))}/>
            <img src={product.images[0]} id="pr-img" alt="" />
          </div>
          <div className="item-details">
            <Link to={`/product-page/${product?._id}`}>
              <h5 className="item-title">{product.title}</h5>
            </Link>
            <p className="price">${product.price}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default WishItem;
