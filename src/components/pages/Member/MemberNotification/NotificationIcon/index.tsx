import Icon from "@/components/Icons";
import { ROUTES } from "@/constants/routes";
import { useGetMemberNotificationsIsReadQuery } from "@/store/api/member/query";
import classNames from "classnames";
import { Link } from "react-router-dom";

const NotificationIcon = () => {
  //member notifications Read status
  const { data: memberNotificationReadStatus } =
    useGetMemberNotificationsIsReadQuery(
      {},
      {
        pollingInterval: 10000,
      }
    );

  return (
    <Link to={`${ROUTES.MEMBER_NOTIFICATIONS}`}>
      <div className="relative">
        {memberNotificationReadStatus && (
          <div
            className={classNames(
              "w-[10px] h-[10px] bg-alerts-error-2 rounded-full",
              "absolute top-[5px] right-[3px]"
            )}
          ></div>
        )}
        <Icon icon="notification" />
      </div>
    </Link>
  );
};

export default NotificationIcon;
