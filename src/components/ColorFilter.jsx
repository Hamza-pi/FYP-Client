import React from "react";
const ColorFilter = ({ colordata,colorId ,setColor }) => {
  return (
    <div className="filter-color">
      <ul>
      <li onClick={()=>setColor(colorId)} style={{ backgroundColor: `${colordata}` }}></li>
      </ul>
    </div>
  );
};

export default ColorFilter;
