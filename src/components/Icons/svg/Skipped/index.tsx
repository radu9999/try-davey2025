import { IconElement } from "../..";

const Skipped: IconElement = ({ fill, ...props }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clip-rule="evenodd"
        d="M13.6 8.8001V5.6001L19.2 11.2001L13.6 16.8001V13.5201C9.6 13.5201 6.8 14.8001 4.8 17.6001C5.6 13.6001 8 9.6001 13.6 8.8001Z"
        fill={fill}
      />
    </svg>
  );
};

export default Skipped;
