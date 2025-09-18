import {
  GetMemberBadgesParams,
  MemberNotification,
} from "@/api/modernCommuneApi";
import Icon from "@/components/Icons";
import TableGridLayout from "@/components/UI/TableGridLayout";
import { Field } from "@/components/UI/TableGridLayout/type";
import {
  useDeleteMemberNotificationsByIdMutation,
  usePutMemberNotificationsByIdMutation,
} from "@/store/api/member/mutation";
import {
  useGetMemberNotificationsQuery,
  useLazyGetMemberNotificationByIdQuery,
} from "@/store/api/member/query";
import { dateFormats, formatDateTime } from "@/utils/dateFormatter";
import debounce from "@/utils/debounce";
import classNames from "classnames";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import MemberNotificationModal from "./MemberNotificationModal";

const MemberNotificationsPage = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const naviagte = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams);
  const filterParams: GetMemberBadgesParams = useMemo(() => {
    return {
      Page: Number(searchParams.get("currentPage")) || 1,
      Filter: searchParams.get("filter") || undefined,
      PerPage: Number(searchParams.get("pageSize")) || 10,
      SortBy: searchParams.get("sortBy") || "",
      SortDirection: searchParams.get("sortDirection") || "",
    };
  }, [searchParams]);

  // get member experience data from API
  const {
    data: notificationsList,
    isLoading: notificationsLoading,
    refetch: notificationsListRefetch,
  } = useGetMemberNotificationsQuery(
    {
      Page: filterParams.Page,
      PerPage: filterParams.PerPage,
      Filter: filterParams.Filter,
      // SortBy: filterParams.SortBy,
      // SortDirection: filterParams.SortDirection,
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

  // const { data: memberNotificationData } = useGetMemberNotificationByIdQuery({
  //   notificationId: `49081544523915264`,
  // });

  const [
    getMemberNotificationById,
    { data: memberNotificationData, isLoading: memberNotificationDataLoading },
  ] = useLazyGetMemberNotificationByIdQuery();

  const [memberNotificationDataState, setMemberNotificationDataState] =
    useState<MemberNotification>({});

  useEffect(() => {
    setMemberNotificationDataState(
      memberNotificationData as MemberNotification
    );
  }, [memberNotificationData]);

  const [updateNotificationById, { isLoading: updateNotificationLoading }] =
    usePutMemberNotificationsByIdMutation();
  const [deleteNotificationById, { isLoading: deleteNotificationLoading }] =
    useDeleteMemberNotificationsByIdMutation();

  const handleNotificationRead = async (value: MemberNotification) => {
    try {
      const response = await updateNotificationById({
        id: String(value?.id),
        notification: {
          ...value,
          isRead: true,
        },
      });

      if ("data" in response) {
        await notificationsListRefetch();
        // toast.success("Notification Read successfully");
        naviagte(`?currentPage=1&pageSize=10`);
      } else if ("error" in response) {
        toast.error("Error Reading Notification");
      }
    } catch (error) {
      console.log("Error Updating Notification", error);
    }

    setMemberNotificationDataState({});
    setModalOpen(false);
  };

  const handleDeleteNotification = async (id: string) => {
    try {
      const response = await deleteNotificationById({
        id: String(id),
      });

      if ("data" in response) {
        await notificationsListRefetch();
        toast.success("Notification Deleted successfully");
        naviagte(`?currentPage=1&pageSize=10`);
      } else if ("error" in response) {
        toast.error("Error Deleting Notification");
      }
    } catch (error) {
      console.log("Error Deleting Notification", error);
    }
    setMemberNotificationDataState({});
    setModalOpen(false);
  };

  const handleCurrentNotification = async (value: MemberNotification) => {
    try {
      await getMemberNotificationById({
        notificationId: String(value?.id) || "",
        // notificationId: String(`49081544523915264`) || "",
      });
    } catch (error) {
      console.log("Error fetching Notification data", error);
    }
  };

  const fields: Field[] = [
    {
      key: "",
      label: "Date",
      render: (_, value) => (
        <div className="flex gap-2 items-center">
          <div
            className="cursor-pointer"
            onClick={() => {
              // setCurrNotification(value);
              // setFieldValue("id", value?.id?.toString());
              // setFieldValue("content", value);
              // await getMemberNotificationById(value?.id?.toString());
              handleCurrentNotification(value);
              setModalOpen(true);
            }}
          >
            {value?.isImportant ? (
              <Icon icon="important-bell" className="fill-alerts-error-2" />
            ) : (
              <Icon
                icon="rounded-tick"
                className={`${
                  value?.isRead ? "fill-alerts-success-2" : "fill-primary-2"
                }`}
              />
            )}
          </div>

          <div
            className={classNames(
              " text-sm whitespace-nowrap",
              value?.isRead
                ? "font-normal text-neutral-3"
                : "font-bold text-neutral-4"
            )}
          >
            {formatDateTime(value?.createdAt, dateFormats.mdyt)}
          </div>
        </div>
      ),
    },
    {
      key: "subject",
      label: "Subject",
      render: (_, value) => (
        <p className={classNames(value?.isRead ? "font-normal" : "font-bold")}>
          {value?.subject}
        </p>
      ),
    },
    {
      key: "comment",
      label: "Comment",
      render: (_, value) => (
        <p className={classNames(value?.isRead ? "font-normal" : "font-bold")}>
          {value?.comment}
        </p>
      ),
    },
  ];

  return (
    <>
      <MemberNotificationModal
        isOpen={modalOpen}
        setModalOpen={setModalOpen}
        // memberNotificationCard={currNotification}
        // memberNotificationCard={memberNotificationData}
        memberNotificationCard={
          memberNotificationDataState as MemberNotification
        }
        memberNotificationCardLoading={memberNotificationDataLoading}
        handleNotificationRead={handleNotificationRead}
        handleDeleteNotification={handleDeleteNotification}
        updateNotificationLoading={updateNotificationLoading}
        deleteNotificationLoading={deleteNotificationLoading}
        setMemberNotificationDataState={setMemberNotificationDataState}
      />
      <div className="p-4 bg-neutral-2">
        <TableGridLayout
          // loading
          isLoading={notificationsLoading}
          //header
          // headerText={`Current Balance : $ ${1}`}
          //table
          //table
          // tableColumns={values?.content?.items as MemberNotificationCard[]}
          tableColumns={notificationsList?.items as MemberNotification[]}
          tableFields={fields}
          // search
          handleSearchChange={debouncedSearch}
          //pagination
          paginationMeta={{
            currentPage: Number(filterParams?.Page),
            totalPages: Number(notificationsList?.pageCount),
            pageSize: Number(filterParams.PerPage),
            onPageChange: handlePageChange,
            onPageSizeChange: handlePageSizeChange,
            totalItems: Number(notificationsList?.resultCount),
          }}
        />
      </div>
    </>
  );
};

export default MemberNotificationsPage;
