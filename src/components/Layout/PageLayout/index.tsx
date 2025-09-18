import React from "react";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full min-h-screen bg-neutral-2 mt-0 pl-[260px]">
      {children}
    </div>
  );
};

export default PageLayout;
