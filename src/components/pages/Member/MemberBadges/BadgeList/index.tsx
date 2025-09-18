import { BadgeCard } from "@/api/modernCommuneApi";
import { useState } from "react";
import BadgeDataCard from "../BadgeCard";
import MemberBadgeModal from "../BadgeCard/BadgeModal";

type BadgeListProps = {
  badgeCards: BadgeCard[];
};

const BadgeList = ({ badgeCards }: BadgeListProps) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [badge, setBadge] = useState<BadgeCard>();

  return (
    <>
      <MemberBadgeModal
        memberBadgeCard={badge}
        isOpen={modalOpen}
        setModalOpen={setModalOpen}
        type="challenges"
      />
      <div className=" mx-auto grid grid-cols-3 gap-4 w-full">
        {badgeCards.map((badge) => {
          return (
            <BadgeDataCard
              type="badge"
              key={badge.id}
              badge={badge}
              setBadge={setBadge}
              setModalOpen={setModalOpen}
            />
          );
        })}
      </div>
    </>
  );
};

export default BadgeList;
