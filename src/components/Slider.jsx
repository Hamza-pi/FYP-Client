import React, { useEffect, useState } from "react";
const CustomSlider = ({ SliderData }) => {
  const [current, setCurrent] = useState(0);
  const [activeToggle, setActiveToggle] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setCurrent(current === 1 ? 0 : 1);
    }, 8000);
  });
  return (
    <>
      {SliderData.map((d, index) => (
        <div key={index}>
          <div className={`slide ${current === index ? "active-slide" : null}`}>
            <img src={d.image} alt="Slide" />
            <div className="content">
              <p className="tag">{d.p1}</p>
              <h2 className="heading">{d.h2}</h2>
              <p className="para">
                {d.p2} <br />
                {d.p3}
              </p>
              <button className="slide-btn">Buy Now</button>
            </div>
          </div>
          <div className="slide-toggler">
            <span
              className={`prev ${activeToggle ? "active-toggler" : null}`}
              onClick={() => {
                setCurrent(current === 0 ? 1 : 0);
                setActiveToggle(!activeToggle);
              }}
            ></span>
            <span
              className={`next ${activeToggle ? null : "active-toggler"}`}
              onClick={() => {
                setCurrent(current === 1 ? 0 : 1);
                setActiveToggle(!activeToggle);
              }}
            ></span>
          </div>
        </div>
      ))}
    </>
  );
};

export default CustomSlider;
