import classNames from "classnames";
import { ComponentProps, FC } from "react";

const Label: FC<ComponentProps<"label">> = ({
  children,
  className,
  ...props
}) => {
  return (
    <label
      className={classNames(
        "text-xs text-left text-gray-400 uppercase font-semibold tracking-wider leading-7",
        className
      )}
      {...props}
    >
      {children}
    </label>
  );
};

export default Label;
