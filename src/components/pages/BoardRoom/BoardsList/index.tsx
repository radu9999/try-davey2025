import { BoardCard } from "@/api/modernCommuneApi";
import BoardsCard from "./BoardsCard";

type BoardsListProps = {
  list: BoardCard[];
};

const BoardsList = ({ list }: BoardsListProps) => {
  return (
    <div className="w-full min-h-[calc(100vh-220px)]">
      <div className=" mx-auto grid grid-cols-2 gap-4 ">
        {list.map((board, index) => (
          <BoardsCard key={index} boardCard={board} />
        ))}
      </div>
    </div>
  );
};

export default BoardsList;
