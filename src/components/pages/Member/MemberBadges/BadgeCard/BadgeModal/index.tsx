import { BadgeCard } from "@/api/modernCommuneApi";
import checkListIcon from "@/assets/images/checkListIcon.png";
import Modal from "@/components/UI/Modal";
import ProgressBar from "@/components/UI/ProgressBar";
import { SetStateAction } from "react";

interface MemberBadgeModalProps {
  isOpen: boolean;
  setModalOpen: (value: SetStateAction<boolean>) => void;
  memberBadgeCard?: BadgeCard;
  type?: "badge" | "challenges";
}

const MemberBadgeModal = ({
  isOpen,
  setModalOpen,
  memberBadgeCard,
  type = "badge",
}: MemberBadgeModalProps) => {
  return (
    <Modal open={isOpen} onOpenChange={setModalOpen}>
      <div className="w-[400px] bg-neutral-1">
        <div className="bg-primary-3 flex items-center gap-4 px-2 py-4 w-full">
          <div className="w-16 h-16 object-cover flex justify-center items-center">
            <div className="w-12 h-16">
              <img
                src={memberBadgeCard?.imageUri || ""}
                alt={memberBadgeCard?.name || ""}
                onError={(e) => (e.currentTarget.src = checkListIcon)}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-neutral-1 text-xl font-bold">
              {memberBadgeCard?.name?.split("-")[0]}
            </p>
            <p className="text-neutral-1 text-lg font-medium leading-5">
              {memberBadgeCard?.name?.split("-").slice(1).join(" ") +
                " " +
                type}
            </p>
            <p className="text-neutral-1 text-base font-medium">
              {memberBadgeCard?.tasksCompleted} of {memberBadgeCard?.taskCount}{" "}
              Task Completed
            </p>
          </div>
        </div>
        <div className="p-4 bg-neutral-1 flex flex-col gap-12">
          {memberBadgeCard?.tasks &&
            memberBadgeCard?.tasks.map((item) => (
              <div className="flex flex-col gap-2">
                <p className="text-neutral-4 text-base font-bold">
                  {item.description}
                </p>
                <ProgressBar
                  value={Number(item.itemsCompleted)}
                  totalValue={Number(item.itemCount)}
                />
              </div>
            ))}
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => {
              setModalOpen(false);
            }}
            className="text-center mb-4 mt-8 w-fit px-6 py-2 bg-primary-2 text-neutral-1 text-sm font-normal rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default MemberBadgeModal;
