import { GetMemberBadgesParams, PointCardList } from "@/api/modernCommuneApi";
import TableGridLayout from "@/components/UI/TableGridLayout";
import { Field } from "@/components/UI/TableGridLayout/type";
import {
  useGetMemberParticipationQuery,
  useLazyGetMemberParticipationExportQuery,
} from "@/store/api/member/query";
import { dateFormats, formatDateTime } from "@/utils/dateFormatter";
import debounce from "@/utils/debounce";
import classNames from "classnames";
import { ChangeEvent, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SortedKeyProps } from "../MemberExperience";

const MemberParticipationPage = () => {
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
  const { data: participationList, isLoading: participationLoading } =
    useGetMemberParticipationQuery(
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

  const [getParticipationExport] = useLazyGetMemberParticipationExportQuery();

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

  //handle export click
  const handleExportClick = () => {
    // const response = await getParticipationExport({
    //   memberId: `41801603426033664`,
    // });
    const url = `/member/points/export?type=participation`;
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.style.display = "none";
    a.href = url;
    a.download = "MemberParticipation.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const fields: Field[] = [
    {
      key: "transactionDate",
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
      key: "transactionType",
      label: "Type",
      align: "center",
      render: (value) => (
        <div className="text-sm font-normal text-center">{value}</div>
      ),
    },

    {
      key: "description",
      label: "Description",
    },

    {
      key: "amount",
      label: "Amount",
      align: "center",
      render: (value) => (
        <div className="text-gray-500 text-sm font-normal text-center">
          {value}
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 bg-neutral-2">
      <TableGridLayout
        // loading
        isLoading={participationLoading}
        //header
        // TODO : add currentBalance in typescript
        // headerText={`Current Balance : $ ${
        //   commissionList?.currentBalance || 0
        // }`}
        headerText={`Current Balance :  ${(
          participationList?.currentBalance || 0
        ).toLocaleString("en-US", {
          maximumFractionDigits: 0,
        })}`}
        isExport
        //table
        //table
        tableColumns={participationList?.items as PointCardList[]}
        tableFields={fields}
        // search
        handleSearchChange={debouncedSearch}
        //sort
        handleSortClick={handleSortClick}
        sortedKey={sortedKey}
        //export
        handleExportClick={handleExportClick}
        //pagination
        paginationMeta={{
          currentPage: Number(filterParams?.Page),
          totalPages: Number(participationList?.pageCount),
          pageSize: Number(filterParams.PerPage),
          onPageChange: handlePageChange,
          onPageSizeChange: handlePageSizeChange,
          totalItems: Number(participationList?.resultCount),
        }}
      />
    </div>
  );
};

export default MemberParticipationPage;
