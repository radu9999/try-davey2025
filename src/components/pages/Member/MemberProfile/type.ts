import { MemberProfile } from "@/api/modernCommuneApi";

export interface EditMemberProfile extends Omit<MemberProfile, "address"> {
  address: string;
  city: string;
  country: string;
  postalCode: string;
  state: string;
}
