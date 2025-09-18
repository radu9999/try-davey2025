import { SalesInfo } from "@/api/modernCommuneApi";
import { Field } from "@/components/UI/TableGridLayout/type";
import TableComponent from "@/components/UI//TableComponent";

type SalesInfoProps = {
  salesInfo: SalesInfo;
};

const SalesRankWidget = ({salesInfo}: SalesInfoProps) => {
  const salesList = [
      {
        metric: "My Total Sales",
        items: salesInfo.salesQuantity,
        value: salesInfo.salesValue
      },
      {
        metric: "Total Sales (All Members)",
        items: salesInfo.totalSalesQuantity,
        value: salesInfo.totalSalesValue
      },
  ];

  const fields: Field[] = [
    {
      key: "metric",
      label: "Metric"
    },
    {
      key: "items",
      label: "Items"
    },
    {
      key: "value",
      label: "Value"
    }
  ];

  return (
    <>
      <div className="p-6 rounded-md bg-white flex flex-col hover:shadow-lg gap-6 transition-all animate-fade-in-up duration-300 ease-in-out">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <p className="text-neutral-4 text-md font-bold uppercase">
            Sales Ranking
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-neutral-4 text-xl font-bold">
              #{salesInfo.ranking} <label className="text-neutral-3">of {salesInfo.count}</label>
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <TableComponent
            columns={salesList}
            fields={fields}
            isLoading={false}
          />
        </div>
      </div>
    </>
  );
};

export default SalesRankWidget;
