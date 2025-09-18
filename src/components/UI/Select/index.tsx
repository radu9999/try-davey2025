/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Icon, { IconsList, icons } from "@/components/Icons";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import classNames from "classnames";
import { useSelect } from "downshift";
import { ErrorMessage, useFormikContext } from "formik";
import { HTMLAttributes, useMemo } from "react";
import Label from "../Form/Label";

// import Label from "../Label";

export interface SelectProps<T> {
  name: Extract<keyof T, string>;
  containerProps?: HTMLAttributes<HTMLDivElement>;
  value?: Option;
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  options?: Option[] | undefined;
  label?: string;
  pcStyle?: any;
  onValueChange?: (selectedValue: any) => void;
  listPosition?: "bottom" | "top";
  isLoading?: boolean;
  classNameProps?: string;
  classNameOptionsProps?: string;
  tabIndex?: number;
}

export interface Option {
  label?: string | number | undefined;
  value?: string | number | undefined;
  flag?: string | undefined;
}

export interface SortProps {
  label: string;
  value: string;
}

const Select = <T,>({
  name,
  size = "md",
  value,
  label,
  options = [],
  onValueChange,
  listPosition,
  isLoading,
  classNameProps,
  classNameOptionsProps,
  tabIndex,
  ...props
}: SelectProps<T>) => {
  const { errors, touched, setFieldValue, values } = useFormikContext<T>();

  const selectedItem = useMemo<Option | undefined>(() => {
    return (
      options.find((option) => String(option.value) === String(values[name])) ||
      value
    );
  }, [name, options, value, values]);

  const {
    isOpen,
    getToggleButtonProps,
    getMenuProps,
    getItemProps,
    highlightedIndex,
  } = useSelect<Option>({
    items: options,
    onSelectedItemChange({ selectedItem: selected }) {
      setFieldValue(name, selected?.value);
      // setFieldTouched(name, true);

      {
        onValueChange && onValueChange(selected);
      }
    },
    itemToString(item) {
      return item?.value?.toString() || "";
    },
  });

  // const selectedFlagIconName = selectedItem?.flag;
  // const SelectedFlag = icons[selectedFlagIconName];

  return (
    <>
      <div
        className={classNames("relative items-center text-sm h-full w-full")}
      >
        {label && <Label htmlFor={name}>{label}</Label>}
        <div
          className={classNames(
            "flex  bg-neutral-1 h-full",
            "rounded-lg border-[0.5px] border-neutral-3 shadow-sm focus-within:border-primary-2 focus-within:shadow focus-within:shadow-primary-2 ",
            touched[name] &&
              (errors[name] ? "border-lightGrey" : "border-lightGrey"),
            // Size
            {
              "py-2 px-3 w-fit": size === "sm",
              "py-3 px-3 w-40": size === "md",
              "py-3 px-3 w-full": size === "lg",
            },
            classNameProps
          )}
        >
          <button
            className="outline-none relative flex-1 flex items-center justify-between w-full  overflow-hidden"
            {...getToggleButtonProps({ type: "button" })}
            tabIndex={tabIndex}
          >
            <div className="text-text font-medium whitespace-nowrap mr-5 flex items-center gap-1">
              {selectedItem ? (
                <div className="flex items-center gap-1">
                  {selectedItem?.flag &&
                    icons[selectedItem.flag as keyof typeof icons] && (
                      <Icon icon={selectedItem.flag as IconsList} />
                    )}
                  {selectedItem.label}
                </div>
              ) : props.placeholder ? (
                props.placeholder
              ) : (
                "Select an option"
              )}
            </div>

            <div className="flex justify-center items-center absolute right-0 bg-white">
              {isOpen ? (
                <ChevronDownIcon className="w-4 h-4 stroke-secondary" />
              ) : (
                <ChevronDownIcon className="w-4 h-4 stroke-secondary" />
              )}
            </div>
          </button>
        </div>

        <ul
          {...getMenuProps()}
          className={classNames(
            "absolute z-10  rounded-lg bg-neutral-1 shadow-lg mt-2 max-h-48 scrollbar-hide overflow-y-auto overflow-x-hidden",
            listPosition === "top" && "bottom-10 ",
            isOpen ? "border border-grey" : "",
            // Size
            {
              "min-w-full w-fit": size === "sm",
              "w-40 min-w-fit ": size === "md",
              "w-full min-w-fit": size === "lg",
            },
            classNameOptionsProps
          )}
        >
          {isOpen && (
            <>
              {isLoading ? (
                <>
                  <li className="flex justify-center items-center py-2">
                    loading...
                  </li>
                </>
              ) : (
                <>
                  {options && options.length > 0 ? (
                    <>
                      {options.map((item, index) => (
                        <li
                          key={item.value}
                          className={classNames(
                            "hover:cursor-pointer",
                            highlightedIndex === index && "bg-primary-1",

                            selectedItem === options[index] &&
                              "font-bold bg-primary-2 text-neutral-1 ",
                            "flex gap-3 items-center hover:opacity-80",
                            // Size
                            {
                              "px-2 py-1 w-full": size === "sm",
                              "px-5 py-2 w-40": size === "md",
                              "px-5 py-2 w-full": size === "lg",
                            },
                            classNameOptionsProps
                          )}
                          {...getItemProps({
                            index,
                            item,
                          })}
                        >
                          <span className="flex gap-1 items-center">
                            {item?.flag &&
                              icons[item.flag as keyof typeof icons] && (
                                <Icon icon={item.flag as IconsList} />
                              )}
                            {item.label}
                          </span>
                        </li>
                      ))}
                    </>
                  ) : (
                    <li className="flex justify-center items-center py-2">
                      No options
                    </li>
                  )}
                </>
              )}
            </>
          )}
        </ul>

        <ErrorMessage
          name={name}
          render={(message) => (
            <div className="text-alerts-error-2 absolute w-0 min-w-full text-xs mt-1 text-error">
              {message}
            </div>
          )}
        />
      </div>
    </>
  );
};

export default Select;
