import { Curriculum } from "@/api/modernCommuneApi";
import CurriculumDetail from "./CurriculumDetail";

type CurriculumProps = {
  curriculum?: Curriculum;
};

const CurriculumWidget = ({curriculum}: CurriculumProps) => {
  return (
    <>
      <div className="p-6 rounded-md bg-white flex flex-col hover:shadow-lg gap-6 transition-all animate-fade-in-up duration-300 ease-in-out">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <p className="text-neutral-4 text-md font-bold uppercase">
              Curriculum
            </p>
          </div>
        </div>
        <CurriculumDetail title="Number of Inventory Items Earned" value={curriculum?.questionCount} />
        <CurriculumDetail title="Number of Correctly Answered Questions" value={curriculum?.totalXP} />
        <CurriculumDetail title="Number of Inventory Items Earned" value={curriculum?.itemCount} />
      </div>
    </>
  );
};

export default CurriculumWidget;
