import { PendingCommissionInfo } from "@/api/modernCommuneApi";

type PendingCommissionInfoProps = {
  detail: PendingCommissionInfo;
};

const PendingCommissionDetail = ({detail}: PendingCommissionInfoProps) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col gap-2 w-full max-w-xs">
        <p className="text-neutral-3 text-base truncate">
          {detail.description}
        </p>
        <p className="text-neutral-3 text-sm font-medium">Due {detail.availableDate}</p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-green-500 text-md font-bold">
          +${detail.amount}
        </p>
      </div>
    </div>
  );
};

export default PendingCommissionDetail;
