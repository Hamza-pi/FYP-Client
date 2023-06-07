import React from "react";

const Service = ({ data }) => {
  return (
    <div className="service">
      <img src={data.img} alt="" />
      <div className="service-content">
        <h3>{data.h3}</h3>
        <p>{data.p}</p>
      </div>
    </div>
  );
};

export default Service;
