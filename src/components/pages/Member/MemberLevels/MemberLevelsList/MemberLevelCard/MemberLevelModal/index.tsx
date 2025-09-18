import { LevelCard } from "@/api/modernCommuneApi";
import Icon from "@/components/Icons";
import Button from "@/components/UI/Button";
import Modal from "@/components/UI/Modal";
import ProgressBar from "@/components/UI/ProgressBar";
import { SetStateAction } from "react";

interface MemberLevelModalProps {
  isOpen: boolean;
  setModalOpen: (value: SetStateAction<boolean>) => void;
  //   eslint-disable-next-line no-unused-vars
  onOpenChange: (value: SetStateAction<boolean>) => void;
  memberLevelCardDetails?: LevelCard;
}

const MemberLevelModal = ({
  isOpen,
  onOpenChange,
  setModalOpen,
  memberLevelCardDetails,
}: MemberLevelModalProps) => {
  return (
    <Modal open={isOpen} onOpenChange={onOpenChange} title="" description="">
      <div className="w-[400px] bg-neutral-1">
        <div className="bg-primary-3 px-2 py-4 flex gap-2 w-full box-border">
          <Icon icon="assistant" />
          <div className="flex flex-col gap-2">
            <p className="text-neutral-1 text-xl font-bold">
              {memberLevelCardDetails?.name} Level
            </p>
            <p className="text-neutral-1 text-base font-medium">
              {memberLevelCardDetails?.tasksCompleted} of{" "}
              {memberLevelCardDetails?.taskCount} Task Completed
            </p>
          </div>
        </div>
        <div className="p-4 bg-neutral-1 flex flex-col gap-12">
          {memberLevelCardDetails?.tasks?.map((item) => (
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
          <Button
            size="sm"
            onClick={() => {
              setModalOpen(false);
            }}
            className="text-center mb-4 mt-8 w-fit px-6 py-2 bg-primary-2 text-neutral-1 text-sm font-normal rounded-md"
          >
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default MemberLevelModal;
