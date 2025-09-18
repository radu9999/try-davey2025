import { GetMemberBadgesParams, QuestionCard } from "@/api/modernCommuneApi";
import TableGridLayout from "@/components/UI/TableGridLayout";
import { Field } from "@/components/UI/TableGridLayout/type";
import { useGetMemberQuestionsQuery } from "@/store/api/member/query";
import { dateFormats, formatDateTime } from "@/utils/dateFormatter";
import debounce from "@/utils/debounce";
import classNames from "classnames";
import { ChangeEvent, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SortedKeyProps } from "../MemberExperience";
import MemberQuestionsModal from "./MemberQuestionsModal";
import MemberQuestionsStatus from "./MemberQuestionsStatusText";

const MemberQuestionsPage = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [currQuestions, setCurrQuestions] = useState<QuestionCard>();
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
  const { data: questionsList, isLoading: questionsLoading } =
    useGetMemberQuestionsQuery(
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

      newSearchParams.set(
        "sortBy",
        newSortedKey.key === "dateAnswered" ? "date" : newSortedKey.key
      );
      newSearchParams.set("sortDirection", newSortedKey.order);
      handleSetFilterParams(newSearchParams);

      return newSortedKey;
    });
  };

  const fields: Field[] = [
    {
      key: "",
      label: (
        <div className="w-5 h-5 border border-neutral-3 rounded-full"></div>
      ),
      render: (_, value) => (
        <div
          className="cursor-pointer"
          onClick={() => {
            setCurrQuestions(value);

            setModalOpen(true);
          }}
        >
          <MemberQuestionsStatus text={false} status={value?.status} />
        </div>
      ),
    },

    {
      key: "dateAnswered",
      label: "Date",
      render: (_, value) => (
        <div className="flex gap-2 items-center">
          <div
            className={classNames(
              "text-sm whitespace-nowrap text-neutral-3 font-normal"
            )}
          >
            {formatDateTime(value?.dateAnswered, dateFormats.mdyt)}
          </div>
        </div>
      ),
      sort: true,
    },

    {
      key: "questionId",
      label: "Question ID",
    },

    {
      key: "questionText",
      label: "Question",
    },

    {
      key: "status",
      label: "Status",
      render: (_, value) => (
        <div className="cursor-pointer">
          <MemberQuestionsStatus text={true} status={value?.status} />
        </div>
      ),
      align: "center",
    },
  ];

  return (
    <>
      <MemberQuestionsModal
        isOpen={modalOpen}
        setModalOpen={setModalOpen}
        memberQuestionsCard={currQuestions}
      />
      <div className="p-4 bg-neutral-2">
        <TableGridLayout
          // loading
          isLoading={questionsLoading}
          //header
          //headerText={`Current Balance : $ ${1}`}
          //table
          //table
          tableColumns={questionsList?.items as QuestionCard[]}
          tableFields={fields}
          // search
          handleSearchChange={debouncedSearch}
          //sort
          handleSortClick={handleSortClick}
          sortedKey={sortedKey}
          //pagination
          paginationMeta={{
            currentPage: Number(filterParams?.Page),
            totalPages: Number(questionsList?.pageCount),
            pageSize: Number(filterParams.PerPage),
            onPageChange: handlePageChange,
            onPageSizeChange: handlePageSizeChange,
            totalItems: Number(questionsList?.resultCount),
          }}
        />
      </div>
    </>
  );
};

export default MemberQuestionsPage;
