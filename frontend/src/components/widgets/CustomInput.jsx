import React from "react";

const CustomInput = ({ id, className, inputProps }) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <input id={id} className={className} {...inputProps} />;
};

export default CustomInput;
