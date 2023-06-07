import React from "react";

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style }} onClick={onClick} />;
};

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style }} onClick={onClick} />;
}
export { SampleNextArrow, SamplePrevArrow };
