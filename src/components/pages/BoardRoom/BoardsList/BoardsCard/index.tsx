import { BoardCard } from "@/api/modernCommuneApi";

type BoardsCardProps = {
  boardCard: BoardCard;
};

const BoardsCard = ({ boardCard }: BoardsCardProps) => {
  return (
    <div className="p-6 hover:shadow-lg bg-neutral-1 justify-between rounded-lg flex flex-col gap-2 animate-fade-in-up transition-all duration-300 ease-in-out">
      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          <h4 className="text-lg text-black font-bold">{boardCard.name}</h4>
          <p className="text-sm text-gray-500">{boardCard.description}</p>
        </div>
        <div className="flex">
          <div className="px-2 py-[2px] text-primary-2 text-sm font-normal">
            {boardCard.tags}
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <iframe className="w-full aspect-video" src={boardCard.videoUri || ""}></iframe>
      </div>
    </div>
  );
};

export default BoardsCard;
