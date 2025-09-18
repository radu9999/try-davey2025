import { Cross1Icon } from "@radix-ui/react-icons";
import { TextField } from "@radix-ui/themes";
import classNames from "classnames";
import { ChangeEventHandler, FC, useEffect, useRef } from "react";
import { FiSearch } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";

interface Props {
  onChange: ChangeEventHandler<HTMLInputElement> | any;
  value?: string | number;
  size?: "sm" | "md" | "lg";
}

const Search: FC<Props> = ({ onChange, value, size = "md" }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("filter");

  useEffect(() => {
    if (inputRef.current && filterValue === null) {
      inputRef.current.value = "";
    }
  }, [filterValue]);

  const resetInputField = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    onChange({ target: { value: "" } });
  };

  return (
    <TextField.Root
      className={classNames(
        "flex items-center relative gap-2 border border-neutral-6 bg-neutral-1",
        size === "sm" && "px-2 py-1",
        size === "md" && "px-3 py-2",
        size === "lg" && "px-4 py-3",
        "rounded"
      )}
    >
      <TextField.Slot>
        <FiSearch className="w-5 h-5" />
      </TextField.Slot>
      <TextField.Input
        defaultValue={value}
        ref={inputRef}
        className="outline-none font-semibold text-xs w-full"
        placeholder="Search"
        onChange={onChange}
      />

      <Cross1Icon
        onClick={resetInputField}
        className={classNames(
          "absolute left-auto right-3 hover:text-red-500 hover:scale-110",
          (inputRef.current?.value === "" ||
            inputRef.current?.value === undefined) &&
            "hidden"
        )}
      />
    </TextField.Root>
  );
};

export default Search;
