type CurriculumDetailProps = {
  title: string;
  value?: number;
};

const CurriculumDetail = ({title, value}: CurriculumDetailProps) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col gap-2 w-full max-w-xs">
        <p className="text-neutral-3 text-base truncate">
          {title}
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-orange-500 text-md font-bold">
          {value ?? 0}
        </p>
      </div>
    </div>
  );
};

export default CurriculumDetail;
