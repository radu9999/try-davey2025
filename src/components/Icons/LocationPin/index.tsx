import { SVGAttributes } from "react";

export default function LocationPin({ ...props }: SVGAttributes<SVGElement>) {
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
        d="M12.6667 4C9.57065 4 7.06665 6.504 7.06665 9.6C7.06665 12.936 10.6027 17.536 12.0587 19.288C12.3787 19.672 12.9627 19.672 13.2827 19.288C14.7307 17.536 18.2667 12.936 18.2667 9.6C18.2667 6.504 15.7627 4 12.6667 4ZM12.6667 11.6C11.5627 11.6 10.6667 10.704 10.6667 9.6C10.6667 8.496 11.5627 7.6 12.6667 7.6C13.7707 7.6 14.6667 8.496 14.6667 9.6C14.6667 10.704 13.7707 11.6 12.6667 11.6Z"
        fill="#2E3262"
      />
    </svg>
  );
}
