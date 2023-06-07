import PageTopBanner from "../components/PageTopBanner";
import WishItem from "../components/WishItems";
import {useSelector} from "react-redux"
const WishList = () => {

  const {wishlist} = useSelector((state)=>state.product)


  return (
    wishlist.length!==0?<>
    <PageTopBanner pagename="Wishlist" />
    <div className="main-container">
      <section className="wish-container">
        <WishItem products={wishlist} />
      </section>
    </div>
  </>: <>
  <PageTopBanner pagename="Wishlist" />
    <div className="main-container">
       <p style={{textAlign:"center",fontWeight:"bold",fontSize:"25px",paddingTop:"20px"}}>Oops😫! No Items In Wishlist</p>
    </div>
  </>
  );
};

export default WishList;
