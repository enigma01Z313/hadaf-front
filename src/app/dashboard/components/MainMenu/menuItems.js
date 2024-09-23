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
import GroupsIcon from "@mui/icons-material/Groups";

const menuItems = (isSuperAdmin, isAdmin, hasTrainee) => {
  const adminLvl = isAdmin || isSuperAdmin;

  const menus = [
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
      id: 40,
      title: "کاراموزها",
      slug: "trainees",
      link: "/dashboard/trainees",
      icon: GroupsIcon,
      condition: () => hasTrainee ?? false,
    },
    {
      id: 50,
      title: "تیم ها",
      slug: "tams",
      link: "/dashboard/teams",
      icon: SupervisedUserCircleIcon,
    },
    {
      id: 90,
      title: "تحسین",
      slug: "bonus",
      link: "/dashboard/admirations",
      icon: EmojiEventsIcon,
    },
    {
      id: 100,
      title: "پلن ها",
      slug: "plans",
      link: "/dashboard/plans",
      icon: UpgradeIcon,
      // condition: () => adminLvl,
      condition: () => false,
    },
    {
      id: 100,
      title: "تمدید/ارتقا",
      slug: "upgrade",
      link: "/dashboard/upgradePlan",
      icon: UpgradeIcon,
      // condition: () => !adminLvl,
      condition: () => false,
    },
    {
      id: 110,
      title: "ارتباط با ما",
      slug: "contactus",
      link: "mailto:f.ahmadyf94@gmail.com",
      icon: ContactSupportIcon,
      condition: () => false,
      // image: 'support'
    },
  ];

  return menus;
};

export default menuItems;
