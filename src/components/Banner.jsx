import React from "react";

const Banner = ({ data }) => {
  return (
    <div className="banner">
      <img src={data.img} alt="" />
      <div className="content">
        <p className="tag">{data.p1}</p>
        <h2 className="heading">{data.h2}</h2>
        <p className="para">
          {data.p2} <br /> {data.p3}
        </p>
      </div>
    </div>
  );
};

export default Banner;
