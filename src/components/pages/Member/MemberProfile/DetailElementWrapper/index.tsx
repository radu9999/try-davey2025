import React from "react";

type DetailElementWrapperProps = {
  title: string;
  children: React.ReactNode;
};

const DetailElementWrapper = ({
  children,
  title,
}: DetailElementWrapperProps) => {
  return (
    <div className="flex flex-row gap-4 h-fit justify-start items-center">
      <div className="text-base gap-4 h-fit min-w-[100px] flex flex-row justify-between items-center text-neutral-3 ">
        <p className="whitespace-nowrap">{title}</p>
        <p>:</p>
      </div>
      {children}
    </div>
  );
};

export default DetailElementWrapper;
