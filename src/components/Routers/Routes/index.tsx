import { PATHS } from "@/constants/routes";
import ForgetPassword from "@/pages/auth/forget-password";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import Verify from "@/pages/auth/verify";
import BoardRoom from "@/pages/board-room";
import Brands from "@/pages/brands";
import Charities from "@/pages/charities";
import Courses from "@/pages/courses";
import Curriculum from "@/pages/curriculum";
import MemberBadges from "@/pages/member/badges";
import MemberChallenges from "@/pages/member/challenges";
import MemberCommission from "@/pages/member/commission";
import MemberDashboard from "@/pages/member/dashboard";
import MemberEvents from "@/pages/member/events";
import MemberExperience from "@/pages/member/experience";
import MemberInventory from "@/pages/member/inventory";
import MemberLevels from "@/pages/member/levels";
import MemberNotifications from "@/pages/member/notifications";
import MemberParticipation from "@/pages/member/participation";
import MemberProfile from "@/pages/member/profile";
import MemberQuestions from "@/pages/member/questions";
import Setting from "@/pages/setting";
import Store from "@/pages/store";
import { RouteObject } from "react-router-dom";
import PrivateOutlet from "../PrivateOutlet";

export const routes: RouteObject[] = [
  {
    path: "*",
    element: <PrivateOutlet />,
    children: [
      // private routes
      {
        index: true,
        element: <Store />,
      },
      {
        path: PATHS.BOARD_ROOM,
        element: <BoardRoom />,
      },
      {
        path: PATHS.CHARITIES,
        element: <Charities />,
      },
      {
        path: PATHS.COURSES,
        element: <Courses />,
      },
      {
        path: PATHS.CURRICULUM,
        element: <Curriculum />,
      },
      {
        path: PATHS.BRANDS,
        element: <Brands />,
      },
      {
        path: PATHS.SETTINGS,
        element: <Setting />,
      },
      {
        path: PATHS.MEMBER,
        children: [
          {
            index: true,
            element: <MemberProfile />,
          },
          {
            path: PATHS.MEMBER_PROFILE,
            element: <MemberProfile />,
          },
          {
            path: PATHS.MEMBER_DASHBOARD,
            element: <MemberDashboard />,
          },
          {
            path: PATHS.MEMBER_NOTIFICATIONS,
            element: <MemberNotifications />,
          },
          {
            path: PATHS.MEMBER_INVENTORY,
            element: <MemberInventory />,
          },
          {
            path: PATHS.MEMBER_COMMISSION,
            element: <MemberCommission />,
          },

          {
            path: PATHS.MEMBER_EXPERIENCE,
            element: <MemberExperience />,
          },

          {
            path: PATHS.MEMBER_PARTICIPATION,
            element: <MemberParticipation />,
          },

          {
            path: PATHS.MEMBER_QUESTIONS,
            element: <MemberQuestions />,
          },

          {
            path: PATHS.MEMBER_EVENTS,
            element: <MemberEvents />,
          },

          {
            path: PATHS.MEMBER_LEVELS,
            element: <MemberLevels />,
          },
          {
            path: PATHS.MEMBER_BADGES,
            element: <MemberBadges />,
          },
          {
            path: PATHS.MEMBER_CHALLENGES,
            element: <MemberChallenges />,
          },
        ],
      },
    ],
  },
  //   public routes (eg. login, register, etc.)
  {
    path: PATHS.LOGIN,
    element: <Login />,
  },
  {
    path: PATHS.FORGET_PASS,
    element: <ForgetPassword />,
  },
  {
    path: PATHS.REGISTER,
    element: <Register />,
  },
  {
    path: PATHS.VERIFY,
    element: <Verify />,
  },
];
