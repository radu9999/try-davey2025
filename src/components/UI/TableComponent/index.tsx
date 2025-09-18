import HamburgerFilter from "@/components/Icons/HamburgerFilter";
import { SortedKeyProps } from "@/components/pages/Member/MemberExperience";
import classNames from "classnames";
import React from "react";
import DataNotFound from "../DataNotFound";
import SmallLoader from "../SmallLoader";
import SkeletonLoader from "./component/SkeletonLoader";

type Field<T> = {
  key: string;
  label: string;
  align?: "center" | "left" | "right";
  render?: (value: unknown, item: T) => React.ReactNode;
  sort?: boolean;
};

type TableComponentProps<T> = {
  fields: Field<T>[];
  columns: T[];
  onRowClick?: (item: T) => void;
  handleSortClick?: (sortkey: string) => void;
  sortedKey?: SortedKeyProps;
  isLoading: boolean;
};

const TableComponent = <T extends Record<string, any>>({
  fields,
  columns,
  onRowClick,
  handleSortClick,
  sortedKey,
  isLoading,
}: TableComponentProps<T>) => {
  return (
    <table className="table-auto min-w-full">
      <thead className="bg-primary-1">
        <tr>
          {fields.map((item) => (
            <th
              key={item.key as string}
              className={classNames(
                "p-4 text-left text-sm font-normal text-black",
                item.sort ? "cursor-pointer" : "",
                // item?.align ===  ? `text-${item?.align}` : ""
                {
                  "text-left": item.align === "left",
                  "text-center": item.align === "center",
                  "text-right": item.align === "right",
                }
              )}
              onClick={() =>
                item.sort && handleSortClick && handleSortClick(item.key)
              }
            >
              {/* {item.label} */}
              {item.sort ? (
                <div className="flex gap-2 items-center">
                  {item.label}
                  {isLoading ? (
                    <SmallLoader />
                  ) : (
                    <span
                      className={classNames(
                        "transition-all transform",
                        sortedKey?.key === item.key &&
                          sortedKey?.order === "asc"
                          ? "rotate-180"
                          : ""
                      )}
                    >
                      <HamburgerFilter />
                    </span>
                  )}
                </div>
              ) : (
                <div>{item.label}</div>
              )}
            </th>
          ))}
        </tr>
      </thead>

      {isLoading ? (
        <SkeletonLoader tableFields={fields?.length} />
      ) : (
        <tbody>
          {columns?.length > 0 ? (
            columns.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100"
                onClick={() => onRowClick && onRowClick(item)}
              >
                {fields.map((field) => (
                  <td
                    key={field.key as string}
                    className="px-5 py-5 bg-white text-sm font-normal font-inter"
                  >
                    {field.render
                      ? field.render(item[field.key], item)
                      : item[field.key] || "-"}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr className="row-auto">
              <td colSpan={fields?.length}>
                <DataNotFound />
              </td>
            </tr>
          )}
        </tbody>
      )}
    </table>
  );
};

export default TableComponent;
