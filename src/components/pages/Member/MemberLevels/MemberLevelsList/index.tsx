import { LevelCard } from "@/api/modernCommuneApi";
import MemberLevelsCard from "./MemberLevelCard";

type MemberLevelListProps = {
  list: LevelCard[];
};

const MemberLevelList = ({ list }: MemberLevelListProps) => {
  return (
    <div>
      <div className=" mx-auto grid grid-cols-3 gap-4 ">
        {list.map((memberLevel, index) => (
          <MemberLevelsCard key={index} memberLevelCard={memberLevel} />
        ))}
      </div>
    </div>
  );
};

export default MemberLevelList;
