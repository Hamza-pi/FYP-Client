import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useScroll = () => {
  const location = useLocation();

  useEffect(() => {
    const scrollToTop = () => {
      const c = document.documentElement.scrollTop || document.body.scrollTop;
      if (c > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, c - c / 8);
      }
    };

    scrollToTop();
  }, [location]);
};

export default useScroll;
