import { PendingCommission } from "@/api/modernCommuneApi";
import PendingCommissionDetail from "./PendingCommissionDetail";

type PendingCommissionProps = {
  pendingCommission: PendingCommission;
};

const PendingCommissionWidget = ({pendingCommission}: PendingCommissionProps) => {
  return (
    <>
      <div className="p-6 rounded-md bg-white flex flex-col hover:shadow-lg gap-6 transition-all animate-fade-in-up duration-300 ease-in-out">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <p className="text-neutral-4 text-md font-bold uppercase">
              Pending Commissions
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-neutral-4 text-md font-bold uppercase">
              ${pendingCommission.pendingCommissions}
            </p>
          </div>
        </div>
        {pendingCommission?.pendingCommissionInfoList?.map((pendingCommissionInfo, index) => (
          <PendingCommissionDetail key={index} detail={pendingCommissionInfo} />
        ))}
      </div>
    </>
  );
};

export default PendingCommissionWidget;
