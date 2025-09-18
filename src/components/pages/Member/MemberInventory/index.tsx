import { InventoryCardListResponse } from "@/api/modernCommuneApi";
import TableGridLayout from "@/components/UI/TableGridLayout";
import { Field } from "@/components/UI/TableGridLayout/type";
import { useGetMemberInventoryQuery } from "@/store/api/member/query";
import { dateFormats, formatDateTime } from "@/utils/dateFormatter";
import debounce from "@/utils/debounce";
import { CircleIcon } from "@radix-ui/react-icons";
import { ChangeEvent, useMemo, useState } from "react";
import { CheckmarkIcon } from "react-hot-toast";
import { useSearchParams } from "react-router-dom";

// TODO : Remove after codeGen

export interface InventoryCard {
  dateReceived?: string;
  name?: string;
  creditType?: string;
  redeemed?: boolean;
  quantity?: number;
}

export interface MemberInventoryListResponse {
  filter?: string | null;
  items?: InventoryCard[] | null;
  page?: number;
  pageCount?: number;
  perPage?: number;
  resultCount?: number;
  sortBy?: string | null;
  sortDirection?: string | null;
}

export type GetMemberInventoryParams = {
  Filter?: string;
  Page?: number;
  PerPage?: number;
  SortBy?: string;
  SortDirection?: string;
};

export interface SortedKeyProps {
  key: string;
  order: string;
}

const inventoryListDummy: MemberInventoryListResponse = {
  resultCount: 9,
  pageCount: 1,
  items: [
    {
      redeemed: true,
      creditType: "merchandise",
      dateReceived: new Date().toISOString(),
      name: "$5 merchandise received",
      quantity: 50,
    },
    {
      redeemed: true,
      creditType: "merchandise",
      dateReceived: new Date().toISOString(),
      name: "$5 merchandise received",
      quantity: 50,
    },
    {
      redeemed: true,
      creditType: "merchandise",
      dateReceived: new Date().toISOString(),
      name: "$5 merchandise received",
      quantity: 50,
    },
    {
      redeemed: false,
      creditType: "merchandise",
      dateReceived: new Date().toISOString(),
      name: "$5 merchandise received",
      quantity: 50,
    },
    {
      redeemed: false,
      creditType: "merchandise",
      dateReceived: new Date().toISOString(),
      name: "$5 merchandise received",
      quantity: 50,
    },
  ],
  filter: null,
  page: 1,
  perPage: 10,
  sortBy: null,
  sortDirection: null,
};

const MemberInventoryPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams);
  const filterParams: GetMemberInventoryParams = useMemo(() => {
    return {
      Page: Number(searchParams.get("currentPage")) || 1,
      Filter: searchParams.get("filter") || "",
      PerPage: Number(searchParams.get("pageSize")) || 10,
      SortBy: searchParams.get("sortBy") || "",
      SortDirection: searchParams.get("sortDirection") || "",
    };
  }, [searchParams]);

  //Sorting table State
  const [sortedKey, setSortedKey] = useState<SortedKeyProps>({
    key: searchParams.get("sortBy") || "",
    order: searchParams.get("sortDirection") || "asc",
  });

  // get member experience data from API

  const { data: inventoryList, isLoading: inventoryLoading } =
    useGetMemberInventoryQuery(
      {
        Page: filterParams.Page,
        PerPage: filterParams.PerPage,
        Filter: filterParams.Filter,
        SortBy: filterParams.SortBy,
        SortDirection: filterParams.SortDirection,
      },
      {
        refetchOnMountOrArgChange: true,
      }
    );

  const handleSetFilterParams = (params: URLSearchParams) => {
    setSearchParams(params);
  };

  const handlePageChange = (page: number) => {
    newSearchParams.set("currentPage", String(page));
    handleSetFilterParams(newSearchParams);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    newSearchParams.set("pageSize", String(newPageSize));
    handleSetFilterParams(newSearchParams);
  };

  const handleSearch = (val: ChangeEvent<HTMLInputElement>) => {
    if (val.target.value === "") {
      newSearchParams.delete("filter");
    } else {
      newSearchParams.set("filter", String(val.target.value));
    }
    handleSetFilterParams(newSearchParams);
  };
  const debouncedSearch = debounce(handleSearch, 300);

  //Sorting table
  const handleSortClick = (key: string) => {
    setSortedKey((prevSortedKey) => {
      const newSortedKey = {
        key: key === prevSortedKey.key ? prevSortedKey.key : key,
        order:
          prevSortedKey.key === key
            ? prevSortedKey.order === "asc"
              ? "desc"
              : "asc"
            : "asc",
      };

      newSearchParams.set("sortBy", newSortedKey.key);
      newSearchParams.set("sortDirection", newSortedKey.order);
      handleSetFilterParams(newSearchParams);

      return newSortedKey;
    });
  };

  const fields: Field[] = [
    {
      key: "dateReceived",
      label: "Date",
      render: (value) => (
        <div className="text-gray-500 text-sm font-normal whitespace-nowrap">
          {formatDateTime(value, dateFormats.mdyt)}
        </div>
      ),
      sort: true,
    },
    {
      key: "name",
      label: "Item",
      render: (value) => (
        <div className="text-sm font-normal text-neutral-5">{value}</div>
      ),
    },
    {
      key: "creditType",
      label: "Type",
      render: (value) => (
        <div className="text-sm font-normal text-neutral-5">{value}</div>
      ),
    },

    {
      key: "quantity",
      label: "Quantity",
      render: (value) => (
        <div className="text-sm font-normal text-neutral-5">
          {/* {value.toFixed(2)} */}
          {`${value?.toLocaleString("en-US", {
            minimumFractionDigits: 2,
          })}`}
        </div>
      ),
    },
    {
      key: "couponCode",
      label: "Coupon Code",
      render: (value) => (
        <div className="text-sm font-normal text-neutral-5">{value}</div>
      ),
    },
    {
      key: "redeemed",
      label: "Redeemed",
      render: (value) => {
        return (
          <div className="w-full flex justify-center items-center">
            {value === true ? (
              <>
                <CheckmarkIcon className="  bg-primary-2 " />
              </>
            ) : (
              <>
                <CircleIcon className="w-5 h-5 text-neutral-3 fill-primary-1" />
              </>
            )}
          </div>
        );
      },
      align: "center",
    },
  ];

  return (
    <div className="p-4 bg-neutral-2">
      <TableGridLayout
        // loading
        isLoading={inventoryLoading}
        //header
        // TODO : add currentBalance in typescript
        // headerText={`Current Balance : $ ${
        //   commissionList?.currentBalance || 0
        // }`}
        // headerText={`Current Balance : $ ${1}`}
        //table
        //table
        tableColumns={inventoryList?.items as InventoryCardListResponse[]}
        tableFields={fields}
        // search
        handleSearchChange={debouncedSearch}
        //sort
        handleSortClick={handleSortClick}
        sortedKey={sortedKey}
        //pagination
        paginationMeta={{
          currentPage: Number(filterParams?.Page),
          totalPages: Number(inventoryList?.pageCount),
          pageSize: Number(filterParams.PerPage),
          onPageChange: handlePageChange,
          onPageSizeChange: handlePageSizeChange,
          totalItems: Number(inventoryList?.resultCount),
        }}
      />
    </div>
  );
};

export default MemberInventoryPage;
