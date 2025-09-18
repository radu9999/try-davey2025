import Icon from "../../Icons/index";
const DataNotFound = () => {
  return (
    <div className="w-full min-h-[calc(100vh-220px)] flex  justify-center items-center ">
      <div className="flex flex-col gap-5">
        <Icon icon="data-not-found" className="h-32 aspect-square" />
        <p className="text-3xl font-medium text-gray-500 whitespace-nowrap">
          Data Not Found
        </p>
      </div>
    </div>
  );
};

export default DataNotFound;
