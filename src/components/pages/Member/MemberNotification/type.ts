import { MemberNotification } from "@/api/modernCommuneApi";

export interface MemberNotificationCard {
  isImportant?: boolean;
  isRead?: boolean;
  date?: string | null;
  subject?: string | null;
  comment?: string | null;
  id?: number;
}

export interface MemberNotificationsTypes {
  filter?: string | null;
  items?: MemberNotificationCard[] | null;
  page?: number;
  pageCount?: number;
  perPage?: number;
  resultCount?: number;
}

export interface MemberNotificationModifiedTypes
  extends Omit<MemberNotification, "id" | "memberId"> {
  id?: string;
  memberId?: string;
}
