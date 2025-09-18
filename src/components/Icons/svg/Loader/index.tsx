import { IconElement } from "../..";

const Loader: IconElement = ({ ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="ionicon"
      viewBox="0 0 512 512"
      {...props}
    >
      <path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z" />
      <circle cx="256" cy="256" r="144" />
    </svg>
  );
};

export default Loader;
