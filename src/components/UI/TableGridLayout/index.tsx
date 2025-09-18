import RightArrow from "@/components/Icons/RightArrow";
import { SortedKeyProps } from "@/components/pages/Member/MemberExperience";
import React, { ChangeEvent } from "react";
import Button from "../Button";
import Pagination, { PaginationMeta } from "../Pagination";
import Search from "../Search";
import TableComponent from "../TableComponent";
import { Field } from "./type";

interface TableGridLayoutProps {
  headerText?: string;
  tableColumns?: unknown[]; // Replace 'any' with the actual type for your columns
  tableFields: Field[]; // Replace 'any' with the actual type for your fields
  handleSearchChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSortClick?: (sortkey: string) => void;
  handleExportClick?: () => void;
  sortedKey?: SortedKeyProps;
  paginationMeta: PaginationMeta;
  isLoading?: boolean;
  isExport?: boolean;
  newAction?: string | null;
  handleNewActionClick?: () => void;
}

const TableGridLayout: React.FC<TableGridLayoutProps> = ({
  headerText,
  tableColumns,
  tableFields,
  paginationMeta,
  handleSearchChange,
  handleSortClick,
  sortedKey,
  isLoading,
  isExport,
  handleExportClick,
  newAction,
  handleNewActionClick
}) => {
  return (
    <div className="bg-neutral-2 min-h-[calc(100vh-100px)] flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center mb-4">
          {headerText && (
            <p className="text-sm font-medium text-neutral-8">{headerText}</p>
          )}
          <div className="flex gap-2">
            <Search onChange={handleSearchChange} />
            {isExport && (
              <Button
                onClick={() => handleExportClick && handleExportClick()}
                className="flex bg-primary-2 items-center p-2 rounded-md"
              >
                <span className="text-white text-sm font-normal">Export</span>
                <RightArrow />
              </Button>
            )}
            {newAction && (
              <Button
                onClick={() => handleNewActionClick && handleNewActionClick()}
                className="flex bg-primary-2 items-center p-2 rounded-md"
              >
                <span className="text-white text-sm font-normal">{newAction}</span>
              </Button>
            )}
          </div>
        </div>

        <TableComponent
          columns={tableColumns || []}
          fields={tableFields}
          isLoading={Boolean(isLoading)}
          handleSortClick={handleSortClick}
          sortedKey={sortedKey}
        />
      </div>

      <div>
        {tableColumns && tableColumns.length > 0 && (
          <Pagination paginationMeta={paginationMeta} />
        )}
      </div>
    </div>
  );
};

export default TableGridLayout;
