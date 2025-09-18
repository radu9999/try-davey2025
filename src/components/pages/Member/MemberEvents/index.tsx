import {
  EventCardListResponse,
  GetMemberBadgesParams,
} from "@/api/modernCommuneApi";
import TableGridLayout from "@/components/UI/TableGridLayout";
import { Field } from "@/components/UI/TableGridLayout/type";
import { useGetMemberEventsQuery } from "@/store/api/member/query";
import { dateFormats, formatDateTime } from "@/utils/dateFormatter";
import debounce from "@/utils/debounce";
import classNames from "classnames";
import { ChangeEvent, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SortedKeyProps } from "../MemberExperience";

const MemberEventsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams);
  const filterParams: GetMemberBadgesParams = useMemo(() => {
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
  const { data: eventsList, isLoading: eventsLoading } =
    useGetMemberEventsQuery(
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
      key: "eventDate",
      label: "Date",
      render: (value) => (
        <div
          className={classNames(
            "text-sm whitespace-nowrap text-neutral-3 font-normal"
          )}
        >
          {formatDateTime(value, dateFormats.mdyt)}
        </div>
      ),
      sort: true,
    },
    {
      key: "eventType",
      label: "Event Type",
    },

    {
      key: "description",
      label: "Description",
    },
  ];

  return (
    <div className="p-4 bg-neutral-2">
      <TableGridLayout
        // loading
        isLoading={eventsLoading}
        //header
        // TODO : add currentBalance in typescript
        // headerText={`Current Balance : $ ${
        //   commissionList?.currentBalance || 0
        // }`}
        // headerText={`Current Balance :  ${(21125.78).toLocaleString("en-US", {
        //   maximumFractionDigits: 0,
        // })}`}
        //table
        //table
        tableColumns={eventsList?.items as EventCardListResponse[]}
        tableFields={fields}
        // search
        handleSearchChange={debouncedSearch}
        //sort
        handleSortClick={handleSortClick}
        sortedKey={sortedKey}
        //pagination
        paginationMeta={{
          currentPage: Number(filterParams?.Page),
          totalPages: Number(eventsList?.pageCount),
          pageSize: Number(filterParams.PerPage),
          onPageChange: handlePageChange,
          onPageSizeChange: handlePageSizeChange,
          totalItems: Number(eventsList?.resultCount),
        }}
      />
    </div>
  );
};

export default MemberEventsPage;
