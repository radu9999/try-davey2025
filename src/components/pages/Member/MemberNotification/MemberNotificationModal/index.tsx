import { MemberNotification } from "@/api/modernCommuneApi";
import Icon from "@/components/Icons";
import Button from "@/components/UI/Button";
import Modal from "@/components/UI/Modal";
import SmallLoader from "@/components/UI/SmallLoader";
import { dateFormats, formatDateTime } from "@/utils/dateFormatter";
import { SetStateAction } from "react";

interface MemberNotificationModalProps {
  isOpen: boolean;
  setModalOpen: (value: SetStateAction<boolean>) => void;
  memberNotificationCard?: MemberNotification;
  memberNotificationCardLoading?: boolean;
  handleNotificationRead: (value: MemberNotification) => void;
  handleDeleteNotification: (id: string) => void;
  updateNotificationLoading?: boolean;
  deleteNotificationLoading?: boolean;
  setMemberNotificationDataState: (value: MemberNotification) => void;
}

const MemberNotificationModal = ({
  isOpen,
  setModalOpen,
  memberNotificationCard,
  memberNotificationCardLoading,
  handleNotificationRead,
  handleDeleteNotification,
  updateNotificationLoading,
  deleteNotificationLoading,
  setMemberNotificationDataState,
}: MemberNotificationModalProps) => {
  // const handleNotificationRead = () => {
  //   const filteredValue = values?.content?.items?.map((item) => {
  //     if (item?.id?.toString() === values?.id) {
  //       return {
  //         ...item,
  //         isRead: true,
  //       };
  //     } else {
  //       return item;
  //     }
  //   });

  //   setValues({
  //     id: "",
  //     content: {
  //       ...values?.content,
  //       items: filteredValue,
  //     },
  //   });

  //   setModalOpen(false);
  // };

  return (
    <Modal open={isOpen} onOpenChange={setModalOpen}>
      {memberNotificationCardLoading ||
      (memberNotificationCard &&
        Object.keys(memberNotificationCard as MemberNotification).length ===
          0) ? (
        <MemberNotificationModalSkeleton />
      ) : (
        <div className="w-[495px] bg-primary-1 font-inter">
          <div className="bg-primary-3 flex items-center gap-4 p-4 w-full">
            <div className="flex justify-between w-full">
              <p className="text-xl font-bold text-white">
                Notification Details
              </p>
              <div
                className="bg-white h-7 w-7 flex items-center justify-center cursor-pointer"
                onClick={() => {
                  setMemberNotificationDataState({});
                  setModalOpen(false);
                }}
              >
                <Icon icon="cross-icon" className="fill-primary-3" />
              </div>
            </div>
          </div>
          <div className="p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 object-cover flex justify-center items-center">
                  <div className="w-12 h-16 flex items-center justify-center">
                    {memberNotificationCard?.isImportant ? (
                      <Icon
                        icon="important-bell"
                        className="fill-alerts-error-2"
                      />
                    ) : (
                      <Icon
                        icon="rounded-tick"
                        className={`${
                          memberNotificationCard?.isRead
                            ? "fill-alerts-success-2"
                            : "fill-primary-2"
                        }`}
                      />
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-neutral-4 font-bold text-xl">
                    {memberNotificationCard?.subject}
                  </p>
                  <p className="text-neutral-3 font-medium text-base pt-2">
                    {formatDateTime(
                      memberNotificationCard?.createdAt as string,
                      dateFormats.mdyt
                    )}
                  </p>
                </div>
              </div>

              <button
                className="cursor-pointer"
                onClick={() => {
                  // setModalOpen(false)

                  handleDeleteNotification(String(memberNotificationCard?.id));
                }}
              >
                {deleteNotificationLoading ? (
                  <SmallLoader />
                ) : (
                  <Icon icon="trash-icon" className="fill-neutral-4" />
                )}
              </button>
            </div>

            <p className="py-4 text-neutral-4 text-sm font-normal text-center">
              {memberNotificationCard?.comment}
            </p>
          </div>

          <div className="flex justify-center">
            {/* <button
              onClick={() => {
                // handleNotificationRead();
                handleNotificationRead(
                  memberNotificationCard as MemberNotification
                );

                // setModalOpen(false);
              }}
              className="text-center mb-4 mt-2 w-fit px-6 py-4 bg-primary-2 text-sm font-normal rounded-md flex gap-2"
            >
              <Icon icon="rounded-tick" className="fill-neutral-1" />
              <p className="text-neutral-1">Close</p>
            </button> */}
            <Button
              onClick={() => {
                handleNotificationRead(
                  memberNotificationCard as MemberNotification
                );
              }}
              icon={<Icon icon="rounded-tick" className="fill-neutral-1" />}
              className="mb-4 mt-2 px-5 py-7 bg-primary-2 text-sm font-normal"
              loading={updateNotificationLoading}
            >
              {" "}
              Close
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default MemberNotificationModal;

const MemberNotificationModalSkeleton = () => {
  return (
    <div className="w-[495px] bg-primary-1 font-inter">
      <div className="bg-primary-3 flex items-center gap-4 p-4 w-full">
        <div className="flex justify-between w-full">
          <p className="text-xl font-bold text-white">Notification Details</p>
          <div className="bg-white h-7 w-7 flex items-center justify-center cursor-pointer">
            <Icon icon="cross-icon" className="fill-primary-3" />
          </div>
        </div>
      </div>
      <div className="p-4 flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 object-cover flex justify-center items-center">
              <div className="bg-gray-300 animate-pulse rounded-lg w-12 h-16 flex items-center justify-center"></div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="bg-gray-300 animate-pulse rounded-lg w-52 h-[28px]"></p>
              <p className="bg-gray-300 animate-pulse rounded-lg w-52 h-[28px] pt-2"></p>
            </div>
          </div>

          <div className="cursor-auto w-10 h-10 bg-gray-300 animate-pulse rounded-lg"></div>
        </div>

        <p className="py-4 bg-gray-300 animate-pulse rounded-lg w-full h-[52px]"></p>
      </div>

      <div className="flex justify-center">
        <div className="mb-4 mt-2 py-4 bg-gray-300 animate-pulse rounded-lg w-[115px] h-[53x]"></div>
      </div>
    </div>
  );
};
