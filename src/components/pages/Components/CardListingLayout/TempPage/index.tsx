type TempPageProps = {
  title: string;
};

const TempPage = ({ title }: TempPageProps) => {
  return (
    <div className="p-4">
      <div className="bg-neutral-1 flex justify-center min-h-screen p-4 rounded-lg w-full h-full">
        <h2 className="text-base font-bold text-neutral-4 py-2 px-3 rounded border border-neutral-4 h-fit w-fit">
          {title}
        </h2>
      </div>
    </div>
  );
};

export default TempPage;
