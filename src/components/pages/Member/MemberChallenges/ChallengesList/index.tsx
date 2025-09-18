import { ChallengeCard } from "@/api/modernCommuneApi";
import { useState } from "react";
import BadgeCard from "../../MemberBadges/BadgeCard";
import MemberBadgeModal from "../../MemberBadges/BadgeCard/BadgeModal";

type ChallengesListProps = {
  challengesCards: ChallengeCard[];
};

const ChallengesList = ({ challengesCards }: ChallengesListProps) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [challenge, setChallenge] = useState<ChallengeCard>();

  return (
    <>
      <MemberBadgeModal
        memberBadgeCard={challenge}
        isOpen={modalOpen}
        setModalOpen={setModalOpen}
        type="challenges"
      />
      <div className=" mx-auto grid grid-cols-3 gap-4 w-full">
        {challengesCards.map((challenges) => {
          return (
            <BadgeCard
              setBadge={setChallenge}
              setModalOpen={setModalOpen}
              type="challenges"
              key={challenges.id}
              badge={challenges}
            />
          );
        })}
      </div>
    </>
  );
};

export default ChallengesList;
