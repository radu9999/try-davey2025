import { GetMemberBadgesParams } from "@/api/modernCommuneApi";
import { Option, SortProps } from "@/components/UI/Select";
import { useGetMemberLevelsQuery } from "@/store/api/member/query";
import debounce from "@/utils/debounce";
import { ChangeEvent, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import CardListingLayout from "../../Components/CardListingLayout";
import MemberLevelList from "./MemberLevelsList";

const sortNameOptions: Option[] = [
  { label: "Name", value: "name" },
  { label: "Date", value: "date" },
];

const sortDirectionOptions: Option[] = [
  { label: "Ascending", value: "asc" },
  { label: "Descending", value: "desc" },
];

const MemberLevelsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams);

  const filterParams: GetMemberBadgesParams = useMemo(() => {
    return {
      Page: Number(searchParams.get("currentPage")) || 1,
      Filter: searchParams.get("filter") || "",
      PerPage: Number(searchParams.get("pageSize")) || 10,
      SortBy: searchParams.get("sortName") || "",
      SortDirection: searchParams.get("sortDirection") || "",
    };
  }, [searchParams]);
  // Get member levels data from API
  const { data: memberLevels, isLoading: memberLevelLoading } =
    useGetMemberLevelsQuery(
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
      isLoading={memberLevelLoading}
      filterInitialValues={{
        sortName: searchParams.get("sortName") || "",
        searchValue: searchParams.get("filter") || "",
        sortDirection: searchParams.get("sortDirection") || "",
      }}
      filterMeta={{
        onSearchChange: debouncedSearch,
        onSortNameChange: handleSortNameChange,
        onSortValueChange: handleSortValueChange,
        sortDirectionOptions: sortDirectionOptions,
        sortNameOptions: sortNameOptions,
      }}
      paginationMeta={{
        currentPage: Number(filterParams?.Page),
        totalPages: Number(memberLevels?.pageCount || 5),
        pageSize: Number(filterParams.PerPage),
        onPageChange: handlePageChange,
        onPageSizeChange: handlePageSizeChange,
        totalItems: Number(memberLevels?.resultCount),
      }}
    >
      <MemberLevelList list={memberLevels?.items || []} />
    </CardListingLayout>
  );
};

export default MemberLevelsPage;
