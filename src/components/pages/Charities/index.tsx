import { CharityCard, GetMemberCharitiesParams } from "@/api/modernCommuneApi";
import { SortProps } from "@/components/UI/Select";
import { useGetMemberCharitiesQuery } from "@/store/api/member/query";
import debounce from "@/utils/debounce";
import { ChangeEvent, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import CardListingLayout from "../Components/CardListingLayout";
import CharitiesList from "./CharitiesList";

const CharitiesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams);
  // params from URL
  const filterParams: GetMemberCharitiesParams = useMemo(() => {
    return {
      Page: Number(searchParams.get("currentPage")) || 1,
      Filter: searchParams.get("filter") || "",
      PerPage: Number(searchParams.get("pageSize")) || 10,
      SortBy: searchParams.get("sortName") || "",
      SortDirection: searchParams.get("sortDirection") || "",
    };
  }, [searchParams]);

  const { data: charities, isLoading: charitiesLoading } =
    useGetMemberCharitiesQuery(
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
      filterInitialValues={{
        sortName: searchParams.get("sortName") || "",
        sortDirection: searchParams.get("sortDirection") || "",
        searchValue: searchParams.get("filter") || "",
      }}
      isLoading={charitiesLoading}
      filterMeta={{
        onSearchChange: debouncedSearch,
        onSortNameChange: handleSortNameChange,
        onSortValueChange: handleSortValueChange,
        sortDirectionOptions: [
          {
            value: "asc",
            label: "Ascending",
          },
          {
            value: "desc",
            label: "Descending",
          },
        ],
        sortNameOptions: [
          {
            value: "",
            label: "none",
          },
          {
            value: "Name",
            label: "name",
          },
        ],
      }}
      paginationMeta={{
        currentPage: Number(filterParams?.Page),
        totalPages: Number(charities?.pageCount),
        pageSize: Number(filterParams.PerPage),
        onPageChange: handlePageChange,
        onPageSizeChange: handlePageSizeChange,
        totalItems: Number(charities?.resultCount),
      }}
    >
      <CharitiesList list={charities?.items as CharityCard[]} />
    </CardListingLayout>
  );
};

export default CharitiesPage;
