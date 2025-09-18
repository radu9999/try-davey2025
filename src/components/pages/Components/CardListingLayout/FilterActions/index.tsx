import Search from "@/components/UI/Search";
import Select, { Option } from "@/components/UI/Select";
import { Formik } from "formik";
import { ChangeEvent } from "react";
import { FilterInitialValues } from "..";

export type FilterMeta = {
  onSearchChange: (searchValue: ChangeEvent<HTMLInputElement>) => void;
  onSortNameChange: (sortName: any) => void;
  onSortValueChange: (sortValue: any) => void;
  sortDirectionOptions?: Option[];
  sortNameOptions?: Option[];
};

type FilterActionsProps = {
  filterMeta: FilterMeta;
  filterInitialValues: FilterInitialValues;
};

const FilterActions = ({
  filterMeta: {
    onSearchChange,
    onSortNameChange,
    onSortValueChange,
    sortDirectionOptions,
    sortNameOptions,
  },
  filterInitialValues,
}: FilterActionsProps) => {
  return (
    <Formik
      initialValues={{
        ...filterInitialValues,
      }}
      onSubmit={() => {}}
    >
      {({ values }) => (
        <div className="w-full flex justify-between items-center py-2">
          <div className="w-[252px]">
            <Search value={values?.searchValue} onChange={onSearchChange} />
          </div>
          {(sortNameOptions || sortDirectionOptions) && (
          <div className="flex flex-row items-center gap-2">
            <p className="whitespace-nowrap text-xs text-neutral-3 font-bold">
              Sort By:
            </p>
            {sortNameOptions && (
            <Select
              size="md"
              name="sortName"
              onValueChange={onSortNameChange}
              options={sortNameOptions}
              classNameProps="!p-2 text-neutral-3 text-xs font-medium !rounded-[4px]"
            />
            )}
            {sortDirectionOptions && (
            <Select
              size="md"
              name="sortDirection"
              onValueChange={onSortValueChange}
              options={sortDirectionOptions}
              classNameProps="!p-2 text-neutral-3 text-xs font-medium !rounded-[4px]"
            />
            )}
          </div>
          )}
        </div>
      )}
    </Formik>
  );
};

export default FilterActions;
