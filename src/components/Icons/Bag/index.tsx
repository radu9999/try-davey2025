import { SVGAttributes } from "react";

export default function BagIcon({
  stroke = "black",
  ...props
}: SVGAttributes<SVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke={stroke}
      {...props}
    >
      <g id="Iconly/Light/Bag">
        <g id="Bag">
          <path
            id="Path_33955"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.5134 21.4998H8.16555C5.09919 21.4998 2.74679 20.3922 3.41498 15.9346L4.19301 9.89339C4.60491 7.66913 6.02367 6.81787 7.26852 6.81787H17.447C18.7102 6.81787 20.0466 7.7332 20.5225 9.89339L21.3006 15.9346C21.8681 19.8888 19.5797 21.4998 16.5134 21.4998Z"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Path_33956"
            d="M16.6502 6.59824C16.6502 4.21216 14.716 2.27787 12.3299 2.27787V2.27787C11.1809 2.273 10.0773 2.72603 9.26308 3.53679C8.44889 4.34754 7.9912 5.44923 7.99121 6.59824H7.99121"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Line_192"
            d="M15.296 11.1017H15.2502"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Line_193"
            d="M9.46492 11.1017H9.41916"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
    </svg>
  );
}
