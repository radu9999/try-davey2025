import Dropdown from "@/components/UI/Dropdown";
import ModernCommLogo from "@/components/Icons/ModernCommLogo";
import NotificationIcon from "@/components/pages/Member/MemberNotification/NotificationIcon";
import { useMemberSelect } from "@/store/slice/memberSlice/selector";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import classNames from "classnames";

export interface NavbarProps {
  title: string;
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Navbar({
  title,
  isExpanded,
  setIsExpanded,
}: NavbarProps) {
  const member = useMemberSelect();
  return (
    <div
      className={classNames(
        " bg-primary-2 flex items-center h-[80px] box-border fixed top-0 z-[150] w-full"
      )}
    >
      <div
        className={classNames(
          " bg-primary-2 gap-4   flex items-center justify-between"
        )}
      >
        <div
          className={classNames(
            "p-4 flex  items-center transition-all duration-300 ease-in-out",
            isExpanded ? "w-40 justify-start" : "w-[88px] justify-center"
          )}
        >
          <ModernCommLogo
            className="animate-fade-in-right"
            width={122}
            height={40}
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex flex-row justify-between w-full items-center p-4">
        <div className="cursor-pointer">
          <HamburgerMenuIcon
            onClick={() => setIsExpanded((prev) => !prev)}
            className="w-8 h-8 stroke-neutral-1"
          />
        </div>
        <div className="flex justify-between w-full">
          <div className="px-6 text-white text-[32px] font-bold font-poppins">
            {title}
          </div>
          <div className="flex gap-5 items-center">
            <div>
              {/* <NotificationIcon isRead={false} /> */}
              <NotificationIcon />
            </div>

            {member && (
              <Dropdown
                userActions={[
                  { title: "Profile", url: "/member/profile" },
                  { title: "Settings", url: "/settings" },
                  { title: "Logout", url: "logout" },
                ]}
                name={member.memberName! || ""}
                designation={member.level! || ""}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export const languageOptions = [
  { label: "English", value: "english", flag: "american-flag" },
  { label: "German", value: "german", flag: "german-flag" },
  { label: "French", value: "french", flag: "french-flag" },
];
