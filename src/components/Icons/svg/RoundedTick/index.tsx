import { IconElement } from "../..";

const RoundedTick: IconElement = ({ fill, ...props }) => {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        opacity="1"
        fillRule="evenodd"
        clip-rule="evenodd"
        d="M10.5 0.75C4.98 0.75 0.5 5.23 0.5 10.75C0.5 16.27 4.98 20.75 10.5 20.75C16.02 20.75 20.5 16.27 20.5 10.75C20.5 5.23 16.02 0.75 10.5 0.75ZM7.79 15.04L4.2 11.45C4.01275 11.2632 3.90751 11.0095 3.90751 10.745C3.90751 10.4805 4.01275 10.2268 4.2 10.04C4.59 9.65 5.22 9.65 5.61 10.04L8.5 12.92L15.38 6.04C15.77 5.65 16.4 5.65 16.79 6.04C17.18 6.43 17.18 7.06 16.79 7.45L9.2 15.04C8.82 15.43 8.18 15.43 7.79 15.04Z"
        fill={fill}
      />
    </svg>
  );
};

export default RoundedTick;
