import { useState } from 'react';
import { LeaderBoardParams } from "@/api/modernCommuneApi";
import { Field } from "@/components/UI/TableGridLayout/type";
import { RadioType } from "@/components/UI/RadioGroup/type";
import TableComponent from "@/components/UI//TableComponent";
import RadioComponent from "@/components/UI//RadioGroup";
import Select, { Option } from "@/components/UI/Select";
import { Form, Formik } from "formik";
import { useGetMemberLeaderBoardQuery } from "@/store/api/member/query";

const timeOptions: RadioType[] = [
  { label: "All Time", value: "1" },
  { label: "Last 30 Days", value: "2" }
];

const categoryOptions: Option[] = [
  { label: "Top Number of Sales", value: 1 },
  { label: "Top Number of Answered Questions", value: 2 },
  { label: "Top Number of Member Referrals", value: 3 },
  { label: "Top Dollar Value in Donations", value: 4 },
  { label: "Highest Level Ranking", value: 5 },
];

const getFields = (cateNum: number): Field[] => [
  { 
    key: "rank", 
    label: "Rank" 
  },
  { 
    key: "member", 
    label: "Member"
  },
  { 
    key: "totalAmount", 
    label: cateNum > 4 ? "Level" : "Total",
    render: (value) => {
      return (
        <div className="text-green-500 text-md font-bold">
          {cateNum > 4 ? value : "$" + value}
        </div>
      );
    }
  }
];

const initialValues: LeaderBoardParams = {
  timeOption: "1",
  cateNum: 1
};

const LeaderBoardWidget = () => {  
  const [queryParams, setQueryParams] = useState<LeaderBoardParams>(initialValues);

  const { data: leaderBoardList, isLoading: leaderBoardLoading } =
    useGetMemberLeaderBoardQuery(
      queryParams,
      {
        refetchOnMountOrArgChange: true,
      }
  );

  const setTimeOption = (value: string) => {
    setQueryParams({...queryParams, timeOption: value});
  };

  const handleFilter = async (values: LeaderBoardParams) => {
    setQueryParams({...queryParams, cateNum: values.cateNum});
  }

  return (
    <Formik<LeaderBoardParams>
      initialValues={initialValues}
      onSubmit={handleFilter}
    >
      {({ submitForm, values }) => (
      <Form>
        <div className="p-6 rounded-md bg-white flex flex-col hover:shadow-lg gap-6 transition-all animate-fade-in-up duration-300 ease-in-out">
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2">
              <p className="text-neutral-4 text-md font-bold uppercase">
                LeaderBoard
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <RadioComponent 
                defaultValue={initialValues.timeOption} 
                options={timeOptions} 
                onValueChange={setTimeOption}
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <Select
              size="lg"
              name="cateNum"
              onValueChange={submitForm}
              options={categoryOptions}
              classNameProps="!p-2 text-neutral-3 text-xs font-medium !rounded-[4px] w-full"
            />
          </div>
          <div className="flex justify-between items-center">
            <TableComponent
              columns={leaderBoardList ?? []}
              fields={getFields(values.cateNum)}
              isLoading={leaderBoardLoading}
            />
          </div>
        </div>
      </Form>
      )}
    </Formik>
  );
};

export default LeaderBoardWidget;
