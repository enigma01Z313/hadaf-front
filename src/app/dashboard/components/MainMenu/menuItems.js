import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import GridViewIcon from "@mui/icons-material/GridView";
import ApartmentIcon from "@mui/icons-material/Apartment";
import FlagCircleIcon from "@mui/icons-material/FlagCircle";
import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";

const menuItems = [
  {
    id: 10,
    title: "کارتابل",
    slug: "cartabl",
    link: "/dashboard/cartable",
    icon: DashboardIcon,
  },
  {
    id: 20,
    title: "داشبورد",
    slug: "dashboard",
    link: "/dashboard/okrsDashboard",
    icon: GridViewIcon,
    subMenu: [
      {
        id: 100,
        title: "اهداف",
        slug: "okrs-dashboard",
        link: "/dashboard/okrsDashboard",
        icon: CrisisAlertIcon,
      },
      {
        id: 150,
        title: "اقدامک ها",
        slug: "tasks-dashboard",
        link: "/dashboard/tasksDashboard",
        icon: PlaylistAddCheckIcon,
      },
    ],
  },
  {
    id: 40,
    title: "فضاهای کاری",
    slug: "workspaces",
    link: "/dashboard/workspaces",
    icon: ApartmentIcon,
  },
  {
    id: 30,
    title: "کاربران",
    slug: "users",
    link: "/dashboard/users",
    icon: PersonIcon,
  },
  {
    id: 50,
    title: "تیم ها",
    slug: "tams",
    link: "/dashboard/teams",
    icon: SupervisedUserCircleIcon,
    disabled: true,
  },
  // {
  //   id: 60,
  //   title: "اقدامک ها",
  //   slug: "tasks",
  //   link: "/dashboard/tasks",
  //   icon: PlaylistAddCheckIcon,
  // },
  // {
  //   id: 70,
  //   title: "اهداف",
  //   slug: "okr",
  //   link: "/dashboard/okr",
  //   icon: CrisisAlertIcon,
  // },
  // {
  //   id: 80,
  //   title: "KPI",
  //   slug: "kpi",
  //   link: "/dashboard/kpi",
  //   icon: FlagCircleIcon,
  // },
  {
    id: 90,
    title: "تحسین",
    slug: "bonus",
    link: "/dashboard/admirations",
    icon: EmojiEventsIcon,
  },
  {
    id: 100,
    title: "تمدید/ارتقا",
    slug: "upgrade",
    link: "/dashboard/upgrade",
    icon: UpgradeIcon,
    // image: 'plan',
    disabled: true,
  },
  {
    id: 110,
    title: "ارتباط با ما",
    slug: "contactus",
    link: "mailto:f.ahmadyf94@gmail.com",
    icon: ContactSupportIcon,
    // image: 'support'
  },
];

export default menuItems;
