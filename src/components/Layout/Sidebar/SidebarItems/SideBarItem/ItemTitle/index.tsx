import Icon, { IconsList } from "@/components/Icons";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import classNames from "classnames";

type ItemTitleProps = {
  isExpanded?: boolean;
  icon: IconsList;
  title: string;
  isDrop?: boolean;
  isActive?: boolean;
  isDropChild?: boolean;
};

const ItemTitle = ({
  isExpanded,
  title,
  isDrop,
  isActive,
  icon,
  isDropChild,
}: ItemTitleProps) => {
  return (
    <div
      className={classNames(
        "relative transition-all group ease-in-out duration-300 block  rounded-lg hover:shadow-sm    cursor-pointer ",
        isExpanded ? "w-52 overflow-hidden" : "w-12 h-12",
        isActive && isDropChild
          ? "text-primary-2 fill-primary-2"
          : isActive
          ? "bg-primary-2 text-neutral-1 hover:opacity-80"
          : "bg-neutral-1 hover:bg-primary-1 text-neutral-4",
        isDropChild && "pl-8",
        isDrop && isActive ? "rounded-b-none" : "rounded-lg"
      )}
    >
      <div
        className={classNames(
          "flex gap-3 p-3  relative items-center ",
          !isExpanded ? "flex justify-start items-center w-full h-full" : ""
        )}
      >
        <div
          className={classNames(
            "flex justify-center items-center",
            "transition-all duration-100 ease-in-out"
          )}
        >
          <Icon
            icon={icon}
            className={classNames(
              "transition-all ease-in-out duration-100",
              isExpanded ? "w-6 h-6" : "w-6 h-6",
              isActive && isDropChild
                ? "text-primary-2 fill-primary-2"
                : isActive
                ? "fill-neutral-1"
                : isDropChild
                ? "group-hover:fill-primary-2"
                : "fill-neutral-4"
            )}
          />
        </div>
        {
          <p
            className={classNames(
              "text-sm font-normal  absolute left-0 ml-12 whitespace-nowrap",
              isExpanded ? "block" : "hidden ",
              "transition-all duration-100 ease-in-out",
              isActive && isDropChild
                ? "text-primary-2"
                : isActive
                ? "text-neutral-1"
                : isDropChild
                ? "group-hover:text-primary-2"
                : "text-neutral-4"
            )}
          >
            {title}
          </p>
        }

        {isDrop && (
          <ChevronDownIcon
            className=" text-3xl absolute right-3 ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-100 group-data-[state=open]:rotate-180"
            aria-hidden
          />
        )}
      </div>
    </div>
  );
};

export default ItemTitle;
