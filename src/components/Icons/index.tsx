import { FC, SVGAttributes } from "react";
import ArrowRight from "./ArrowRight";
import CancelIcon from "./Cancel";
import CorrectAlert from "./Correct";
import CrossIcon from "./Cross";
import InProgress from "./InProgress";
import Incorrect from "./Incorrect";
import None from "./None";
import Notification from "./Notification";
import Reanswered from "./Reanswered";
import SaveIcon from "./Save";
import Skip from "./Skip";
import TimeUp from "./TimeUP";
import TimeUps from "./TimeUps";
import AmericanFlag from "./svg/AmericanFlag";
import Assistant from "./svg/Assistant";
import Badges from "./svg/Badges";
import BoardRoom from "./svg/BoardRoom";
import Brands from "./svg/Brands";
import Challenges from "./svg/Challenges";
import Charity from "./svg/Charity";
import Commission from "./svg/Commission";
import Courses from "./svg/Courses";
import Curriculum from "./svg/Curriculum";
import Dashboard from "./svg/Dashboard";
import DataNotFoundImage from "./svg/DataNotFoundImage";
import Disputed from "./svg/Disputed";
import Edit from "./svg/Edit";
import Events from "./svg/Events";
import Experience from "./svg/Experience";
import ExperienceNew from "./svg/ExperienceNew";
import FrenchFlag from "./svg/FrenchFlag";
import GermanFlag from "./svg/GermanFlag";
import ImportantBell from "./svg/ImportantBell";
import Inventory from "./svg/Inventory";
import Levels from "./svg/Levels";
import Loader from "./svg/Loader";
import Logout from "./svg/Logout";
import Members from "./svg/Members";
import NotificationsSidebar from "./svg/NotificationsSidebar";
import Participation from "./svg/Participation";
import Profile from "./svg/Profile";
import Questions from "./svg/Questions";
import Resolved from "./svg/Resolved";
import RoundedCross from "./svg/RoundedCross";
import RoundedTick from "./svg/RoundedTick";
import Settings from "./svg/Settings";
import Skipped from "./svg/Skipped";
import Store from "./svg/Store";
import TrashIcon from "./svg/Trash";

// const Store = lazy(() => import("./svg/Store"));
// const BoardRoom = lazy(() => import("./svg/BoardRoom"));
// const Charity = lazy(() => import("./svg/Charity"));
// const Courses = lazy(() => import("./svg/Courses"));
// const Curriculum = lazy(() => import("./svg/Curriculum"));
// const Brands = lazy(() => import("./svg/Brands"));
// const Members = lazy(() => import("./svg/Members"));
// const Settings = lazy(() => import("./svg/Settings"));
// const Logout = lazy(() => import("./svg/Logout"));
// const Profile = lazy(() => import("./svg/Profile"));
// const Dashboard = lazy(() => import("./svg/Dashboard"));
// const Commission = lazy(() => import("./svg/Commission"));
// const Experience = lazy(() => import("./svg/Experience"));
// const Edit = lazy(() => import("./svg/Edit"));

export type IconsList = keyof typeof icons;

export interface IconProps {
  icon: IconsList;
  size?: number;
  fill2?: string;
  stroke?: string;
}

export type IconElement = FC<IconProps & SVGAttributes<SVGElement>>;

const Icon: IconElement = ({ icon: name, ...props }) => {
  const I = icons[name];

  return <I icon={name} {...props} />;
};

export const icons = {
  store: Store,
  "board-room": BoardRoom,
  charity: Charity,
  courses: Courses,
  curriculum: Curriculum,
  brands: Brands,
  members: Members,
  settings: Settings,
  logout: Logout,
  profile: Profile,
  dashboard: Dashboard,
  commission: Commission,
  experience: Experience,
  "data-not-found": DataNotFoundImage,
  "experience-new": ExperienceNew,
  edit: Edit,
  levels: Levels,
  assistant: Assistant,
  badges: Badges,
  challenges: Challenges,
  notification: Notification,
  "american-flag": AmericanFlag,
  "german-flag": GermanFlag,
  "french-flag": FrenchFlag,
  "cancel-icon": CancelIcon,
  "save-icon": SaveIcon,
  loader: Loader,
  events: Events,
  inventory: Inventory,
  "notifications-sidebar": NotificationsSidebar,
  participation: Participation,
  questions: Questions,
  "important-bell": ImportantBell,
  "rounded-tick": RoundedTick,
  "cross-icon": CrossIcon,
  "rounded-cross": RoundedCross,
  resolved: Resolved,
  disputed: Disputed,
  skipped: Skipped,
  timeout: TimeUp,
  "trash-icon": TrashIcon,
  "arrow-right": ArrowRight,
  correct: CorrectAlert,
  incorrect: Incorrect,
  skip: Skip,
  timeUps: TimeUps,
  inprogress: InProgress,
  none: None,
  reanswered: Reanswered,
};

export default Icon;
