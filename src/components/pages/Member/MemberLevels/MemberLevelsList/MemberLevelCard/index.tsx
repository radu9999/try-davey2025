import { LevelCard } from "@/api/modernCommuneApi";
import Button from "@/components/UI/Button";
import ProgressBar from "@/components/UI/ProgressBar";
import React, { useState } from "react";
import MemberLevelModal from "./MemberLevelModal";

type MemberLevelCardProps = {
  memberLevelCard: LevelCard;
  cardTitle?: string;
};

const MemberLevelsCard = ({ memberLevelCard, cardTitle }: MemberLevelCardProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [memberLevelCardDetails, setMemberLevelCardDetails] =
    useState<LevelCard>();

  function handleModalClick(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    memberLevelCard: LevelCard
  ) {
    e.stopPropagation();
    setMemberLevelCardDetails(memberLevelCard);
    setModalOpen(true);
  }

  return (
    <>
      <MemberLevelModal
        isOpen={modalOpen}
        onOpenChange={setModalOpen}
        setModalOpen={setModalOpen}
        memberLevelCardDetails={memberLevelCardDetails}
      />

      <div className="p-6 rounded-md bg-white flex flex-col hover:shadow-lg gap-3 transition-all animate-fade-in-up duration-300 ease-in-out">
        {cardTitle && (
        <div className="flex justify-between items-center">
          <p className="uppercase text-md text-neutral-3">
            {cardTitle}
          </p>
        </div>
        )}
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <div className="w-16 h-16 object-cover flex justify-center items-center">
              {/* TODO : add placeholder image */}
              <img src={memberLevelCard.imageUri || ""} alt={"levels"} />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-neutral-4 text-xl font-bold">
                {memberLevelCard.name}
              </p>
              <p className="text-neutral-3 text-base font-medium">Level</p>
            </div>
          </div>

          <Button
            size="sm"
            className="px-2 py-[2px] text-white font-normal text-sm bg-primary-2 rounded-md"
            onClick={(e) => handleModalClick(e, memberLevelCard)}
          >
            Details
          </Button>
        </div>

        <div className="flex justify-between">
          <div className="flex flex-col">
            <p className="text-neutral-4 text-xl font-bold">
              {memberLevelCard.xpRange}
            </p>
            <p className="text-sm font-medium text-neutral-3">XP Range</p>
          </div>

          <div className="flex flex-col">
            <p className="text-neutral-4 text-xl font-bold">
              {memberLevelCard.commissionRate}
            </p>
            <p className="text-sm font-medium text-neutral-3">Commission</p>
          </div>
        </div>

        <div className="bg-neutral-3 h-[1px]"></div>

        <div>
          <p className="text-neutral-3 text-xs font-normal">Progress</p>
          <ProgressBar
            value={Number(memberLevelCard.tasksCompleted)}
            totalValue={Number(memberLevelCard.taskCount)}
          />
        </div>
      </div>
    </>
  );
};

export default MemberLevelsCard;
