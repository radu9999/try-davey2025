import { QuestionCard } from "@/api/modernCommuneApi";
import Icon from "@/components/Icons";
import Modal from "@/components/UI/Modal";
import { dateFormats, formatDateTime } from "@/utils/dateFormatter";
import { SetStateAction } from "react";
import MemberQuestionsStatus from "../MemberQuestionsStatusText";

interface MemberQuestionsModalProps {
  isOpen: boolean;
  setModalOpen: (value: SetStateAction<boolean>) => void;
  memberQuestionsCard?: QuestionCard;
}

const MemberQuestionsModal = ({
  isOpen,
  setModalOpen,
  memberQuestionsCard,
}: MemberQuestionsModalProps) => {
  return (
    <Modal open={isOpen} onOpenChange={setModalOpen}>
      <div className="w-[450px] bg-neutral-1 font-inter">
        <div className="bg-primary-2 flex items-center gap-4 p-4 w-full">
          <div className="flex justify-between w-full">
            <p className="text-xl font-bold text-white">Question Details</p>
            <div
              className="h-7 w-7 flex items-center justify-center cursor-pointer"
              onClick={() => setModalOpen(false)}
            >
              <Icon icon="cross-icon" className="fill-neutral-1" />
            </div>
          </div>
        </div>
        {/* <div className="p-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 object-cover flex justify-center items-center">
              <div className="w-12 h-16 flex items-center justify-center">
                {memberNotificationCard?.isImportant ? (
                  <Icon
                    icon="important-bell"
                    className={`${
                      memberNotificationCard?.isRead
                        ? "fill-alerts-success-2"
                        : "fill-alerts-error-2"
                    }`}
                  />
                ) : (
                  <Icon
                    icon="rounded-tick"
                    className={`${
                      memberNotificationCard?.isRead
                        ? "fill-alerts-success-2"
                        : "fill-neutral-3"
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
                  memberNotificationCard?.date as string,
                  dateFormats.ymd
                )}
              </p>
            </div>
          </div>

          <p className="py-4 text-neutral-4 text-sm font-normal text-center">
            {memberNotificationCard?.comment}
          </p>
        </div> */}

        <div className="p-4 flex flex-col gap-3">
          {/* <p>
            {memberQuestionsCard?.questionText} {memberQuestionsCard?.id}
          </p> */}
          <div className="flex justify-between items-center gap-2">
            <p>
              <span className="font-bold text-sm text-neutral-4">
                Answered At :{" "}
              </span>
              <span className="font-normal text-sm text-neutral-4">
                {formatDateTime(
                  memberQuestionsCard?.dateAnswered as string,
                  dateFormats.mdyt
                )}
              </span>
            </p>

            <MemberQuestionsStatus
              status={memberQuestionsCard?.status || ""}
              modalText={true}
            />
          </div>

          <div>
            <p className="font-bold text-sm text-neutral-4 pb-1">Question:</p>
            <p className="font-normal text-sm text-neutral-4">
              {memberQuestionsCard?.questionText}
            </p>
          </div>

          {memberQuestionsCard?.status === "Correct" ||
          memberQuestionsCard?.status === "Resolved" ||
          memberQuestionsCard?.status === "Disputed" ? (
            <div>
              <p>
                <span className="font-bold text-sm text-neutral-4">
                  Your Answer :{" "}
                </span>
                <span className="font-normal text-sm text-neutral-4">
                  {memberQuestionsCard?.memberAnswer}
                </span>
              </p>
              <p>
                <span className="font-bold text-sm text-neutral-4">
                  Correct Answer :{" "}
                </span>
                <span className="font-normal text-sm text-neutral-4">
                  {memberQuestionsCard?.correctAnswer}
                </span>
              </p>
            </div>
          ) : null}

          {memberQuestionsCard?.status === "Correct" ||
          memberQuestionsCard?.status === "Incorrect" ||
          memberQuestionsCard?.status === "Skipped" ||
          memberQuestionsCard?.status === "Timeout" ||
          memberQuestionsCard?.status === "None" ||
          memberQuestionsCard?.status === "In Progress" ||
          memberQuestionsCard?.status === "Reanswered" ? (
            <div>
              <p>
                <span className="font-bold text-sm text-neutral-4">
                  Reward :{" "}
                </span>
                <span className="font-normal text-sm text-neutral-4">
                  {memberQuestionsCard?.rewardDescription}
                </span>
              </p>
            </div>
          ) : null}

          {memberQuestionsCard?.status === "Resolved" ||
          memberQuestionsCard?.status === "Disputed" ? (
            <div className="py-2 border-t-[1px] border-neutral-3">
              <p className="pb-1">
                <span className="font-bold text-sm text-neutral-4">
                  Disputed At :{" "}
                </span>
                <span className="font-normal text-sm text-neutral-4">
                  {formatDateTime(
                    memberQuestionsCard?.dateDisputed as string,
                    dateFormats.mdyt
                  )}
                </span>
              </p>
              <p className="font-bold text-sm text-neutral-4">
                Dispute Comments :{" "}
              </p>
              <p className="font-normal text-sm text-neutral-4">
                {memberQuestionsCard?.disputedComment}
              </p>
            </div>
          ) : null}

          {memberQuestionsCard?.status === "Resolved" ? (
            <div className="pt-2 border-t-[1px] border-neutral-3">
              <p className="pb-1">
                <span className="font-bold text-sm text-neutral-4">
                  Resolved At :{" "}
                </span>
                <span className="font-normal text-sm text-neutral-4">
                  {formatDateTime(
                    memberQuestionsCard?.dateResolved as string,
                    dateFormats.mdyt
                  )}
                </span>
              </p>
              <p className="font-bold text-sm text-neutral-4">
                Dispute Comments :{" "}
              </p>
              <p className="font-normal text-sm text-neutral-4">
                {memberQuestionsCard?.resolvedComment}
              </p>
            </div>
          ) : null}
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => {
              setModalOpen(false);
            }}
            className="text-center mb-4 mt-2 w-fit px-6 py-2 bg-primary-2 text-sm font-normal rounded-md flex gap-2"
          >
            <Icon icon="rounded-tick" className="fill-neutral-1" />
            <p className="text-neutral-1">Close</p>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default MemberQuestionsModal;
