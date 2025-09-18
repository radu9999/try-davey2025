import { IconsList } from "@/components/Icons";

export type SideBarItemType = {
  title: string;
  path?: string;
  icon: IconsList;
  children?: SideBarItemType[];
  isDropdown?: boolean;
};
