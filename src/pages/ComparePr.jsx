import CompareItem from "../components/CompareItem";
import PageTopBanner from "../components/PageTopBanner";
import {useSelector} from "react-redux"

const ComparePr = () => {
 
  const {compare} = useSelector(state=>state.auth)

  return (
    <>
      <PageTopBanner pagename="Compare" />
      <div className="main-container">
        <section className="compare-container">
          <CompareItem products={compare} />
        </section>
      </div>
    </>
  );
};

export default ComparePr;
