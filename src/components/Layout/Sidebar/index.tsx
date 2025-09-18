import Icon from "@/components/Icons";
import { ROUTES } from "@/constants/routes";
import { useAppDispatch } from "@/store";
import { logout } from "@/store/slice/memberSlice";
import classNames from "classnames";
import { useNavigate } from "react-router";
import SidebarItems from "./SidebarItems";
import { sidebarData } from "./data";

export interface SidebarProps {
  isExpanded?: boolean;
}

export default function Sidebar({ isExpanded }: SidebarProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
    navigate(ROUTES.LOGIN);
  };
  return (
    <div
      className={classNames(
        "bg-neutral-2",
        "transition-all duration-300 ease-in-out z-[100]",
        " top-20 left-0",
        "h-[calc(100%-80px)]",
        isExpanded ? "fixed w-60" : "absolute w-[88px]"
      )}
    >
      <div className="flex flex-col  gap-2 justify-between h-full">
        <div
          className={classNames(
            isExpanded ? "overflow-y-auto overflow-x-hidden" : "self-center",
            " sidebarScroll p-4 "
          )}
        >
          <SidebarItems items={sidebarData} isExpanded={isExpanded} />
        </div>

        {/* Logout button */}
        <div className="p-4 self-center group relative" onClick={handleLogout}>
          <div
            className={classNames(
              "relative transition-all ease-in-out duration-300 block bg-alerts-error-1 rounded-lg group-hover:shadow-sm group-hover:bg-alerts-error-2  cursor-pointer ",
              isExpanded ? "w-52" : "w-12 h-12"
            )}
          >
            <div
              className={classNames(
                "flex gap-3 p-3  relative items-center ",
                !isExpanded
                  ? "flex justify-start items-center w-full h-full"
                  : ""
              )}
            >
              <div
                className={classNames(
                  "flex justify-center items-center relative",
                  "transition-all duration-300 ease-in-out"
                )}
              >
                <Icon
                  icon="logout"
                  className={classNames(
                    "transition-all ease-in-out duration-300 group-hover:fill-neutral-1",
                    isExpanded ? "w-6 h-6" : "w-6 h-6"
                  )}
                />
                {!isExpanded && (
                  <div
                    className={classNames(
                      "absolute bg-primary-2 left-12 px-2 text-neutral-1 h-fit text-sm p-1 rounded-lg whitespace-nowrap hidden group-hover:block animate-slide-right-and-fade-in bottom-0 "
                    )}
                  >
                    Logout
                  </div>
                )}
              </div>
              {
                <p
                  className={classNames(
                    "text-sm font-normal text-alerts-error-2 group-hover:text-neutral-1  absolute left-0 ml-12 whitespace-nowrap",
                    isExpanded ? "block" : "hidden ",
                    "transition-all duration-300 ease-in-out"
                  )}
                >
                  Logout
                </p>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
