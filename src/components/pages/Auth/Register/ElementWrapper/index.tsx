import React from "react";

type ElementWrapperProps = {
  title: string;
  children: React.ReactNode;
};

const ElementWrapper = ({
  children,
  title,
}: ElementWrapperProps) => {
  return (
    <div className="flex flex-row gap-4 h-fit justify-start items-center min-w-[500px]">
      <div className="text-base gap-4 h-fit min-w-[150px] flex flex-row justify-between items-center text-neutral-3 ">
        <p className="whitespace-nowrap">{title}:</p>
      </div>
      {children}
    </div>
  );
};

export default ElementWrapper;
