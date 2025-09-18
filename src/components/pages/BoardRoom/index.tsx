import { ChangeEvent, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import { BoardCard, GetMemberBoardRoomsParams } from "@/api/modernCommuneApi";
import { SortProps } from "@/components/UI/Select";
import debounce from "@/utils/debounce";
import CardListingLayout from "../Components/CardListingLayout";
import BoardsList from "./BoardsList";
import { useGetMemberBoardRoomsQuery } from "@/store/api/member/query";

const BoardRoomPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams);

  const filterParams: GetMemberBoardRoomsParams = useMemo(() => {
    return {
      Page: Number(searchParams.get("currentPage")) || 1,
      Filter: searchParams.get("filter") || "",
      PerPage: Number(searchParams.get("pageSize")) || 10,
      SortBy: searchParams.get("sortName") || "",
      SortDirection: searchParams.get("sortDirection") || "",
    };
  }, [searchParams]);

  const { data: boards, isLoading: boardsLoading } = useGetMemberBoardRoomsQuery(
    {
      SortBy: filterParams.SortBy,
      SortDirection: filterParams.SortDirection,
      Page: filterParams.Page,
      PerPage: filterParams.PerPage,
      Filter: filterParams.Filter,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const handleSetFilterParams = (params: URLSearchParams) => {
    setSearchParams(params);
  };

  const handleSortNameChange = (sortName: SortProps) => {
    newSearchParams.set("sortName", sortName.value);
    handleSetFilterParams(newSearchParams);
  };

  const handleSortValueChange = (sortValue: SortProps) => {
    newSearchParams.set("sortDirection", sortValue.value);
    handleSetFilterParams(newSearchParams);
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

  return (
    <CardListingLayout
      isLoading={boardsLoading}
      filterInitialValues={{
        sortName: searchParams.get("sortName") || "",
        searchValue: searchParams.get("filter") || "",
        sortDirection: searchParams.get("sortDirection") || "",
      }}
      filterMeta={{
        onSearchChange: debouncedSearch,
        onSortNameChange: handleSortNameChange,
        onSortValueChange: handleSortValueChange,
      }}
      paginationMeta={{
        currentPage: Number(filterParams?.Page),
        totalPages: Number(boards?.pageCount),
        pageSize: Number(filterParams.PerPage),
        onPageChange: handlePageChange,
        onPageSizeChange: handlePageSizeChange,
        totalItems: Number(boards?.resultCount),
      }}
    >
      <BoardsList list={(boards?.items as BoardCard[]) || []} />
    </CardListingLayout>
  );
};

export default BoardRoomPage;
