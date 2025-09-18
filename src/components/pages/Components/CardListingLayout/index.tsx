import DataNotFound from "@/components/UI/DataNotFound";
import Pagination, { PaginationMeta } from "@/components/UI/Pagination";
import classNames from "classnames";
import React from "react";
import CardSkeleton from "../CardSkeleton";
import FilterActions, { FilterMeta } from "./FilterActions";

export type FilterInitialValues = {
  sortName: string;
  sortDirection: string;
  searchValue?: string;
};

type CardListingLayoutProps = {
  children: React.ReactNode;
  paginationMeta: PaginationMeta;
  filterMeta: FilterMeta;
  filterInitialValues: FilterInitialValues;
  isLoading?: boolean;
};

const CardListingLayout = ({
  children,
  paginationMeta,
  filterMeta,
  filterInitialValues,
  isLoading = false,
}: CardListingLayoutProps) => {
  return (
    <div className="p-4 bg-neutral-2 min-h-[calc(100vh-100px)]  flex flex-col justify-between">
      <div className="w-full h-full flex flex-col">
        <FilterActions
          filterInitialValues={filterInitialValues}
          filterMeta={filterMeta}
        />

        {isLoading ? (
          <CardSkeleton size="lg" />
        ) : (
          <>
            {paginationMeta?.totalItems && !isLoading ? (
              <>{children}</>
            ) : (
              <div className="w-full">
                <DataNotFound />
              </div>
            )}
          </>
        )}
      </div>

      <div className={classNames(!paginationMeta?.totalItems && "hidden")}>
        <Pagination paginationMeta={paginationMeta} />
      </div>
    </div>
  );
};

export default CardListingLayout;
