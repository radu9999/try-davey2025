import { Sparklines, SparklinesBars } from 'react-sparklines';
import { CommissionBalance } from "@/api/modernCommuneApi";

type CommissionBalanceProps = {
  commissionBalance: CommissionBalance;
};

const CommissionBalanceWidget = ({commissionBalance}: CommissionBalanceProps) => {
  return (
    <>
      <div className="p-6 rounded-md bg-white flex flex-col hover:shadow-lg gap-3 transition-all animate-fade-in-up duration-300 ease-in-out">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <p className="text-neutral-4 text-md font-bold uppercase">
              Commission Balance
            </p>
            <p className="text-neutral-3 text-base font-medium">${commissionBalance.totalBalance}</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-neutral-4 text-md font-bold uppercase">
              Current Rate
            </p>
            <p className="text-neutral-3 text-base font-medium">{commissionBalance.currentRate}%</p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <Sparklines
            data={commissionBalance.prevSixMonthBalanceList?.map((item) => item.balance)}
            height={50}
            width={160}
          >
            <SparklinesBars style={{ fill: '#727cf5' }} barWidth={7} />
          </Sparklines>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <p className="text-neutral-4 text-md font-bold">
              Last Month
            </p>
            <p className="text-neutral-3 text-base font-medium">${commissionBalance.lastMonthBalance}</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-neutral-4 text-md font-bold">
              Current Month
            </p>
            <p className="text-neutral-3 text-base font-medium">${commissionBalance.currentMonthBalance}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommissionBalanceWidget;
