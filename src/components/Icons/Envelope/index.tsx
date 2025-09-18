import { SVGAttributes } from "react";

export default function EnvelopeIcon({
  fill,
  ...props
}: SVGAttributes<SVGElement>) {
  return (
    <svg
      width="17"
      height="14"
      viewBox="0 0 17 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clip-rule="evenodd"
        d="M14.9 0.605103H2.1C1.22 0.605103 0.508 1.3251 0.508 2.2051L0.5 11.8051C0.5 12.6851 1.22 13.4051 2.1 13.4051H14.9C15.78 13.4051 16.5 12.6851 16.5 11.8051V2.2051C16.5 1.3251 15.78 0.605103 14.9 0.605103ZM14.58 4.0051L8.924 7.5411C8.668 7.7011 8.332 7.7011 8.076 7.5411L2.42 4.0051C2.22 3.8771 2.1 3.6611 2.1 3.4291C2.1 2.8931 2.684 2.5731 3.14 2.8531L8.5 6.2051L13.86 2.8531C14.316 2.5731 14.9 2.8931 14.9 3.4291C14.9 3.6611 14.78 3.8771 14.58 4.0051Z"
        fill={fill}
      />
    </svg>
  );
}
