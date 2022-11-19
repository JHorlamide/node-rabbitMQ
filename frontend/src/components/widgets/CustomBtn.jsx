import React from "react";

const CustomBtn = ({
  className,
  isloading,
  iserror,
  leftIcon,
  rightIcon,
  children,
  ...rest
}) => {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <button className={className} {...rest}>
      {!!leftIcon && leftIcon}
      {children}
      {!!rightIcon && rightIcon}
    </button>
  );
};

export default CustomBtn;
