import React, { SVGAttributes } from "react";

const ArrowRight = ({ ...props }: SVGAttributes<SVGElement>) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clip-rule="evenodd"
        d="M12 4.64648C7.584 4.64648 4 8.23048 4 12.6465C4 17.0625 7.584 20.6465 12 20.6465C16.416 20.6465 20 17.0625 20 12.6465C20 8.23048 16.416 4.64648 12 4.64648ZM9.832 16.0785L6.96 13.2065C6.8102 13.057 6.72601 12.8541 6.72601 12.6425C6.72601 12.4309 6.8102 12.2279 6.96 12.0785C7.272 11.7665 7.776 11.7665 8.088 12.0785L10.4 14.3825L15.904 8.87848C16.216 8.56648 16.72 8.56648 17.032 8.87848C17.344 9.19048 17.344 9.69448 17.032 10.0065L10.96 16.0785C10.656 16.3905 10.144 16.3905 9.832 16.0785Z"
        fill="white"
      />
    </svg>
  );
};

export default ArrowRight;
