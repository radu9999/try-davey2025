import { ErrorMessage, Field, useFormikContext } from "formik";
import {
  ComponentProps,
  FC,
  HTMLAttributes,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  useState,
} from "react";

import classNames from "classnames";
import { EYEOFF_PASSWORD, EYE_PASSWORD } from "../../Password";
import Label from "../Label";

export interface InputProps<T> extends InputHTMLAttributes<HTMLInputElement> {
  name: Extract<keyof T, string>;
  containerProps?: HTMLAttributes<HTMLDivElement>;
  placeholder?: string;
  autoFocus?: boolean;
  type?: HTMLInputTypeAttribute;
  Icon?: FC<ComponentProps<"svg">>;
  as?: "input" | "select" | "textarea";
  label?: string;
  login?: boolean;
}

const Input = <T,>({
  className,
  name,
  Icon,
  as = "input",
  label,
  containerProps,
  type,
  login,

  ...props
}: InputProps<T>) => {
  const { errors, touched } = useFormikContext<T>();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordType = () => {
    setShowPassword(!showPassword);
  };

  return name ? (
    <>
      <div
        className={classNames(
          "relative items-center",
          type === "radio"
          ? "w-fit"
          : "w-full",
          containerProps?.className
        )}
      >
        {type !== "checkbox" && type !== "radio" && label && <Label htmlFor={name}>{label}</Label>}
        <div
          className={classNames(
            "transition-all ease-in-out duration-150 ",
            type === "checkbox" || type === "radio" 
              ? ""
              : "border focus-within:border-neutral-3 focus-within:shadow-lg focus-within:ring-1 focus-within:ring-primary-1 focus-within:ring-opacity-50",
            " flex px-1  bg-neutral-1 items-center gap-4 rounded-lg  w-full box-border",
            props?.disabled
              ? ""
              : touched[name] && errors[name]
              ? "!border-alerts-error-2"
              : "border-primary-1",
            login && "bg-primary-1 px-3"
          )}
        >
          {Icon && (
            <Icon
              className={classNames("h-6 w-6", login && "fill-neutral-4")}
            />
          )}
          <Field
            className={classNames(
              "outline-none py-4 bg-neutral-1 px-4",
              className,
              type === "checkbox"
                ? ""
                : "w-full",
              as === "textarea",
              // login &&
              //   "!bg-primary-1 [&::-webkit-autofill]:!bg-primary-1 [&::-webkit-autofill]:hover:!bg-primary-1 [&::-webkit-autofill]:focus:!bg-primary-1 [&::-webkit-autofill]:active:!bg-primary-1 [&::data-autocompleted]:!bg-primary-1 [&::-internal-light-dark]:!bg-primary-1 [&::-webkit-background-clip]:text [&::-webkit-text-fill-color]:!bg-primary-1"
              login && "!bg-primary-1"
            )}
            as={as}
            name={name}
            rows={5}
            type={
              type === "password" ? (showPassword ? "text" : "password") : type
            }
            {...props}
          />
          {type === "password" && (
            <button
              type="button"
              className="show_pswd"
              onClick={togglePasswordType}
            >
              {showPassword ? <EYE_PASSWORD /> : <EYEOFF_PASSWORD />}
            </button>
          )}
          {(type === "checkbox" || type === "radio") && (
            <Label className="normal-case max-w-[35rem]">
              {label}
            </Label>
          )}
        </div>
        <div className="w-full h-0 relative">
          <ErrorMessage
            name={name}
            render={(message) => (
              <div className="text-alerts-error-2 w-0 min-w-full text-xs absolute">
                {message}
              </div>
            )}
          />
        </div>
      </div>
    </>
  ) : null;
};

export default Input;
