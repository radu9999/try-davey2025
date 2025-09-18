import { ROUTES } from "@/constants/routes";
import { SideBarItemType } from "./type";

export const sidebarData: SideBarItemType[] = [
  {
    title: "Store",
    path: ROUTES.HOME,
    icon: "store",
  },

  {
    title: "Board Room",
    path: ROUTES.BOARD_ROOM,
    icon: "board-room",
  },

  {
    title: "Charities",
    path: ROUTES.CHARITIES,
    icon: "charity",
  },

  /*{
    title: "Courses",
    icon: "courses",
    path: ROUTES.COURSES,
  },*/

  {
    title: "Curriculum",
    icon: "curriculum",
    path: ROUTES.CURRICULUM,
  },

  {
    title: "Brands",
    icon: "brands",
    path: ROUTES.BRANDS,
  },
  {
    title: "Member",
    isDropdown: true,
    icon: "members",
    path: "member",
    children: [
      {
        title: "Profile",
        icon: "profile",
        path: ROUTES.MEMBER_PROFILE,
      },
      {
        title: "Dashboard",
        icon: "dashboard",
        path: ROUTES.MEMBER_DASHBOARD,
      },
      {
        title: "Notifications",
        icon: "notifications-sidebar",
        path: ROUTES.MEMBER_NOTIFICATIONS,
      },
      {
        title: "Inventory",
        icon: "inventory",
        path: ROUTES.MEMBER_INVENTORY,
      },
      {
        title: "Commission",
        icon: "commission",
        path: ROUTES.MEMBER_COMMISSION,
      },
      {
        title: "Experience",
        icon: "experience",
        path: ROUTES.MEMBER_EXPERIENCE,
      },
      {
        title: "Participation",
        icon: "participation",
        path: ROUTES.MEMBER_PARTICIPATION,
      },
      {
        title: "Questions",
        icon: "questions",
        path: ROUTES.MEMBER_QUESTIONS,
      },
      {
        title: "Events",
        icon: "events",
        path: ROUTES.MEMBER_EVENTS,
      },

      {
        title: "Levels",
        icon: "levels",
        path: ROUTES.MEMBER_LEVELS,
      },
      {
        title: "Badges",
        icon: "badges",
        path: ROUTES.MEMBER_BADGES,
      },
      {
        title: "Challenges",
        icon: "challenges",
        path: ROUTES.MEMBER_CHALLENGES,
      },
    ],
  },
  {
    title: "Settings",
    icon: "settings",
    path: ROUTES.SETTINGS,
  },
];
