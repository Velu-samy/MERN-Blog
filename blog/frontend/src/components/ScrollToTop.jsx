import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    console.log("Navigated to:", pathname); // Debugging log
    setTimeout(() => {
      window.scrollTo({ top:0, behavior: "smooth" });
    }, 100); // Small delay to ensure scroll fires
  }, [pathname]);
  console.log(document.body.style.overflow);
  console.log(document.documentElement.clientHeight, document.body.clientHeight);
  return null;
  
};

export default ScrollToTop;