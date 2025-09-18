import { ROUTES } from "@/constants/routes";
import { useAppDispatch } from "@/store";
import { logout } from "@/store/slice/memberSlice";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { CaretDownIcon } from "@radix-ui/react-icons";
import classNames from "classnames";
import { Link, useNavigate } from "react-router-dom";

export interface DropdownProps {
  profileImage?: any;
  name?: string;
  designation?: string;
  userActions: {
    title: string;
    url?: string;
  }[];
}

const Dropdown = ({
  profileImage,
  userActions,
  designation,
  name,
}: DropdownProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
    navigate(ROUTES.LOGIN);
  };

  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger>
        <div className="flex items-center px-[10px] py-[4px] gap-2 bg-primary-1 rounded-lg">
          <div className="flex gap-2 items-center">
            <div>
            {profileImage && (
              <img
                src={profileImage}
                alt="User Profile Image"
                className="w-8 h-8"
              />
            )}
            </div>
            <div className="flex items-start flex-col">
              <p className="text-neutral-4 text-sm font-medium">{name}</p>
              <p className="text-[10px] text-neutral-3 font-normal">
                {designation}
              </p>
            </div>
          </div>
          <CaretDownIcon width="24" height="24" />
        </div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="bg-primary-1 w-[143px] p-1 mt-1 rounded-lg overflow-hidden">
        {userActions &&
          userActions?.length > 0 &&
          userActions.map((action) => {
            return (
              <div key={action?.title}>
                {action?.url === "logout" ? (
                  <DropdownMenu.Item
                    onClick={handleLogout}
                    key={action.title}
                    className={classNames(
                      "p-2 transition-all ease-in-out duration-100  rounded-lg  cursor-pointer",
                      action.title === "Logout"
                        ? "hover:bg-alerts-error-2 hover:text-alerts-error-1"
                        : "hover:bg-primary-2 hover:text-neutral-1"
                    )}
                  >
                    {action?.title}
                  </DropdownMenu.Item>
                ) : action?.url !== "logout" ? (
                  <Link to={action?.url || ""}>
                    <DropdownMenu.Item
                      key={action.title}
                      className={classNames(
                        "p-2 transition-all ease-in-out duration-100  rounded-lg  cursor-pointer",
                        action.title === "Logout"
                          ? "hover:bg-alerts-error-2 hover:text-alerts-error-1"
                          : "hover:bg-primary-2 hover:text-neutral-1"
                      )}
                    >
                      {action?.title}
                    </DropdownMenu.Item>
                  </Link>
                ) : (
                  <DropdownMenu.Item
                    key={action.title}
                    className={classNames(
                      "p-2 transition-all ease-in-out duration-100  rounded-lg  cursor-pointer",
                      action.title === "Logout"
                        ? "hover:bg-alerts-error-2 hover:text-alerts-error-1"
                        : "hover:bg-primary-2 hover:text-neutral-1"
                    )}
                  >
                    {action?.title}
                  </DropdownMenu.Item>
                )}
              </div>
            );
          })}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default Dropdown;
