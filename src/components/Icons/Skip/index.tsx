import React, { SVGAttributes } from "react";

const Skip = ({ ...props }: SVGAttributes<SVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="129"
      height="129"
      viewBox="0 0 129 129"
      fill="none"
      {...props}
    >
      <path
        fillRule="evenodd"
        clip-rule="evenodd"
        d="M72.7115 47.3362V30.2695L102.578 60.1362L72.7115 90.0029V72.5095C51.3781 72.5095 36.4448 79.3362 25.7781 94.2695C30.0448 72.9362 42.8448 51.6029 72.7115 47.3362Z"
        fill="#727CF5"
      />
    </svg>
  );
};

export default Skip;
