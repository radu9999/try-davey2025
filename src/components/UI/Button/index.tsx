import { ButtonHTMLAttributes, FC, ReactNode } from "react";

import classNames from "classnames";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  color?: "primary" | "danger" | "warn" | "success";
  size?: "sm" | "md" | "lg";
  label?: string;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

const Button: FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  label,
  loading = false,
  disabled = false,
  className,
  color = "primary",
  children,
  icon,
  iconPosition = "left",
  ...props
}) => {
  return (
    <button
      className={classNames(
        className,
        "flex items-center justify-center rounded-lg enabled:hover:opacity-80 transition-opacity",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variant === "primary" &&
          (color === "primary"
            ? "bg-primary-2"
            : color === "success"
            ? "bg-alerts-success-2"
            : color === "warn"
            ? "bg-alerts-warning-2"
            : "bg-alerts-error-2"),
        variant === "outline" &&
          (color === "primary"
            ? "text-primary-1 border-primary-2"
            : color === "success"
            ? "text-alerts-success-2 border-alerts-success-2"
            : color === "warn"
            ? "text-alerts-warning-2 border-alerts-warning-2"
            : "text-primary-2 border-primary-2"),
        variant === "ghost" &&
          (color === "primary"
            ? "text-primary-1 bg-secondary"
            : color === "success"
            ? "text-primary-2 bg-secondary-2"
            : color === "warn"
            ? "text-primary-3 bg-secondary-3"
            : "text-primary-4 bg-secondary-4"),
        {
          // Variant
          "text-white": variant === "primary",
          "bg-light-bg-3 text-light-text-3": variant === "secondary",
          "border border-primary-2 text-primary-2": variant === "outline",
          // Size
          "rounded-full h-8 px-3 text-xs gap-1": size === "sm",
          "h-10 px-4 text-sm gap-2": size === "md",
          "h-12 px-5 gap-3": size === "lg",
        }
      )}
      disabled={loading || disabled}
      {...props}
    >
      {iconPosition == "left" && icon && <span className="ml-2">{icon}</span>}
      {loading ? (
        <div className="bg-neutral-1 w-4 h-4 rounded-full animate-ping relative flex justify-center items-center">
          <div className="bg-primary-2 w-2 h-2 rounded-full opacity-50 animate-ping  absolute "></div>
        </div>
      ) : (
        label || children
      )}
      {iconPosition == "right" && icon && <span className="mr-2">{icon}</span>}
    </button>
  );
};

export default Button;
