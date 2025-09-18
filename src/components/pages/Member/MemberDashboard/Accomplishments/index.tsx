import ImageTextList from "../../MemberProfile/ImageTextList";
import { AwardCard } from "@/api/modernCommuneApi";

type AccomplishmentsProps = {
  list: AwardCard[];
  title: string;
};

const AccomplishmentsWidget = ({list, title}: AccomplishmentsProps) => {
  return (
    <>
      <div className="p-6 rounded-md bg-white flex flex-col hover:shadow-lg gap-6 transition-all animate-fade-in-up duration-300 ease-in-out">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <ImageTextList
              list={list}
              title={title}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AccomplishmentsWidget;
