import Select from "@/components/UI/Select";
import { Formik } from "formik";
import { useMemo } from "react";
import { categoryOptions } from "./data";

export type PaginationMeta = {
  pageSize: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (selected: number) => void;
  onPageSizeChange: (selected: number) => void;
  totalItems: number;
};

type PaginationProps = {
  paginationMeta: PaginationMeta;
};

export default function Pagination({
  paginationMeta: {
    currentPage,
    totalPages,
    onPageChange,
    onPageSizeChange,
    pageSize,
    totalItems,
  },
}: PaginationProps) {
  const pageOptions = Array.from({ length: totalPages }, (_, index) => ({
    label: (index + 1).toString(),
    value: index + 1,
  }));

  const pageSpan = useMemo(() => {
    const start = (currentPage - 1) * pageSize + 1;
    const end = Math.min(currentPage * pageSize, totalItems);
    return `${start || 0} - ${end || 0}`;
  }, [currentPage, pageSize, totalItems]);

  return (
    <Formik
      initialValues={{
        pageSize: pageSize,
        currentPage: currentPage,
      }}
      enableReinitialize
      onSubmit={() => {}}
    >
      {({ values, setFieldValue }) => (
        <div className="flex justify-between text-sm py-2 mt-2">
          <div className="self-center flex flex-row gap-3">
            <Select
              name="pageSize"
              options={categoryOptions || []}
              value={{
                label: String(values?.pageSize) || "1",
                value: values?.pageSize || 1,
              }}
              size="sm"
              onValueChange={(newValue) => {
                // Update pageSize
                onPageSizeChange(Number(newValue.value));
                setFieldValue("pageSize", Number(newValue.value));

                // Calculate the new total pages
                const newTotalPages = Math.ceil(
                  totalItems / Number(newValue.value)
                );

                // Adjust currentPage to be within the new total pages
                const newCurrentPage = Math.min(
                  values.currentPage,
                  newTotalPages
                );
                setFieldValue("currentPage", newCurrentPage);
                onPageChange(newCurrentPage);
              }}
              listPosition="top"
            />
            <p className="self-center text-sm text-neutral-4 whitespace-nowrap">
              Items per page
            </p>
          </div>
          <p className="self-center text-sm text-neutral-4 whitespace-nowrap">
            {pageSpan} of {totalItems || 0} Items
          </p>
          <div className="flex gap-3 items-center flex-row ">
            <p className="self-center text-sm text-neutral-4 whitespace-nowrap">
              Go to page :
            </p>
            <Select
              name="currentPage"
              options={pageOptions || []}
              value={{
                label: String(values?.currentPage) || "1",
                value: values?.currentPage || 1,
              }}
              size="sm"
              onValueChange={(newValue) => onPageChange(Number(newValue.value))}
              listPosition="top"
            />
          </div>
        </div>
      )}
    </Formik>
  );
}
