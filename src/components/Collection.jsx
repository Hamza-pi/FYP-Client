import React from "react";
import { Link } from "react-router-dom";
const Collection = ({ data, index }) => {
  return (
    <div className={`collection ${index <= 3 ? "border-br" : "border-r"}`}>
      <div className="content">
        <Link to="/">
          <h3>{data.h3}</h3>
        </Link>
        <p>{data.p}</p>
      </div>
      <img src={data.img} alt="" />
    </div>
  );
};

export default Collection;
