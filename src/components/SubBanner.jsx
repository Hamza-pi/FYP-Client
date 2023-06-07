import React from "react";
const SubBanner = ({ data }) => {
  return (
    <div className="sub-banner-wrapper">
      <div className="sub-banner">
        <img src={data.image} alt="" />
        <div className="sub-banner-description">
          <h6>{data.h6}</h6>
          <h5>{data.h5}</h5>
          <p>{data.p}</p>
        </div>
      </div>
    </div>
  );
};

export default SubBanner;
