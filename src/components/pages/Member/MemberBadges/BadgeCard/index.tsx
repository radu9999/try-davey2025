import { BadgeCard, ChallengeCard } from "@/api/modernCommuneApi";
import ballIcon from "@/assets/images/ballIcon.png";
import Button from "@/components/UI/Button";
import ProgressBar from "@/components/UI/ProgressBar";
import classNames from "classnames";
import { useState } from "react";

type BadgeCardProps = {
  badge: BadgeCard | ChallengeCard;
  type?: "badge" | "challenges";
  setBadge: (badge: BadgeCard) => void;
  setModalOpen: (isOpen: boolean) => void;
};
const BadgeDataCard = ({ badge, setBadge, setModalOpen }: BadgeCardProps) => {
  useState<BadgeCard>();

  function handleModalClick(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    memberLevelCard: BadgeCard
  ) {
    e.stopPropagation();
    setBadge(memberLevelCard);
    setModalOpen(true);
  }

  return (
    <div
      className={classNames(
        "transition-all animate-fade-in-up duration-300 ease-in-out group overflow-hidden   ",
        "bg-neutral-1 flex flex-col gap-3 justify-start items-center  flex-1 rounded-lg  hover:shadow-lg p-6"
      )}
    >
      <div className="flex w-full flex-row justify-between items-center">
        <div className="flex flex-row gap-1 w-full justify-start items-center">
          <div className="w-16 h-16 object-cover flex justify-center items-center">
            <img
              src={badge.imageUri || ""}
              alt={"challenge"}
              onError={(e) => (e.currentTarget.src = ballIcon)}
            />
          </div>
          <div className="overflow-hidden flex-1 ">
            <div className="flex gap-2 items-center justify-between">
              <h4 className="text-xl  text-neutral-4 font-bold text-ellipsis  overflow-hidden">
                {badge?.name?.split("-")[0]}
              </h4>

              <div>
                <Button onClick={(e) => handleModalClick(e, badge)} size="sm">
                  Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="text-neutral-3 font-medium">
        {badge?.name?.split("-").slice(1).join(" ")}
      </p>

      {/* <p className="text-neutral-3 font-medium">{type}</p> */}

      <div className="w-full flex flex-col">
        <p className="text-xs text-neutral-3 whitespace-nowrap">Progress</p>
        <ProgressBar
          value={Number(badge.tasksCompleted)}
          totalValue={Number(badge.taskCount)}
        />
      </div>

      <div className="w-full flex flex-col gap-2 py-2">
        <BadgeCardDescription
          title="Objective"
          value={badge?.objective || ""}
        />
        <BadgeCardDescription title="Reward" value={badge?.reward || ""} />
      </div>
    </div>
  );
};

export default BadgeDataCard;

const BadgeCardDescription = ({
  title,
  value,
}: {
  title: string;
  value: string;
}) => {
  return (
    <div className="flex flex-col ">
      <p className="text-xs text-neutral-4 font-bold">{title}</p>
      <p className="text-xs text-neutral-4 font-normal">{value}</p>
    </div>
  );
};
