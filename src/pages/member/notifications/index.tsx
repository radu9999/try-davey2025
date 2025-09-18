import { MemberNotification } from "@/api/modernCommuneApi";
import MemberNotificationsPage from "@/components/pages/Member/MemberNotification";
import { Formik } from "formik";

export interface MemberNotificationPageProps {
  id: string | null;
  content: MemberNotification;
}

const MemberNotifications = () => {
  return (
    // <TempPage title="Member Notifications" />

    <Formik<MemberNotificationPageProps>
      initialValues={{
        id: "",
        content: {} as MemberNotification,
      }}
      onSubmit={() => {}}
      enableReinitialize
    >
      <MemberNotificationsPage />
    </Formik>
  );
};

export default MemberNotifications;
