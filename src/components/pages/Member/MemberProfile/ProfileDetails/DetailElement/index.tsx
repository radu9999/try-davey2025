import DetailElementWrapper from "../../DetailElementWrapper";

const DetailElement = ({ title, value }: { title: string; value: string }) => {
  return (
    <DetailElementWrapper title={title}>
      <div className="text-base h-fit  font-semibold w-full text-neutral-4 rounded-lg border border-neutral-7 px-4 py-3">
        {value}
      </div>
    </DetailElementWrapper>
  );
};

export default DetailElement;
