import { SVGAttributes } from "react";

export default function MobileIcon({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.6586 3.19995H8.65865C7.77865 3.19995 7.06665 3.91995 7.06665 4.79995V19.2C7.06665 20.08 7.77865 20.7999 8.65865 20.7999H16.6586C17.5386 20.7999 18.2586 20.08 18.2586 19.2V4.79995C18.2586 3.91995 17.5386 3.19995 16.6586 3.19995ZM16.6586 17.6H8.65865V6.39995H16.6586V17.6ZM13.2987 12.976V14.376L15.5466 12.28C15.7147 12.12 15.7147 11.856 15.5466 11.696L13.2987 9.59995V10.96C10.8107 11.304 9.81865 13.008 9.45865 14.72C10.3467 13.52 11.5227 12.976 13.2987 12.976Z"
        fill="#2E3262"
      />
    </svg>
  );
}
