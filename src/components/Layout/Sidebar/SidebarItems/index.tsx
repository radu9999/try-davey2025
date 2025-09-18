import classNames from "classnames";

import { SideBarItemType } from "../type";
import SideBarItem from "./SideBarItem";

interface SidebarItemProps {
  items?: SideBarItemType[];
  isExpanded?: boolean;
}

const SidebarItems = ({ items, isExpanded }: SidebarItemProps) => {
  return (
    <div className={classNames(" flex flex-col gap-2")}>
      {items?.map((item) => (
        <SideBarItem
          key={item.title}
          item={item}
          isExpanded={Boolean(isExpanded)}
        />
      ))}
    </div>
  );
};

export default SidebarItems;
