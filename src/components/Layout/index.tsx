import classNames from "classnames";
import { useMemo, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const RootLayout = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const location = useLocation();

  const pathName = location.pathname.replace("/", "");

  const title = useMemo(() => {
    return location.pathname === "/"
      ? "Home"
      : pathName
          .split("-")
          .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
          .join(" ")
          .split("/")
          .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
          .join(" / ");
  }, [location.pathname, pathName]);

  return (
    <div className="w-full h-full bg-neutral-2">
      <Navbar
        title={title}
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
      />
      {/* <div className=""> */}
      <Sidebar isExpanded={isExpanded} />
      <div
        className={classNames(
          " bg-neutral-2 flex-1 transition-all duration-300 ease-in-out pt-[80px] relative z-[80]",
          isExpanded ? "ml-60" : "ml-[88px]"
        )}
      >
        <Outlet />
      </div>
      {/* </div> */}
    </div>
  );
};

export default RootLayout;
