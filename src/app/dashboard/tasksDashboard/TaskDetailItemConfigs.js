import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';

const TaskDetailItemConfigs = [
  {
    icon: "user-x",
    title: "کل وظایف",
    value: "AllTasks",
    color: { bg: "#e2ecff", text: "#5a8dee" },
  },
  {
    icon: "user-detail",
    iconRender: (color) => <AssignmentLateIcon style={{color}}/>,
    title: "وظایف بدون تخصیص",
    value: "taskWithOutAssignee",
    color: { bg: "#ccf5f8", text: "#00cfdd" },
  },
  {
    icon: "task-x",
    title: "وظایف موخر",
    value: "deferredTasks",
    color: { bg: "#ffeed9", text: "#fdac41" },
  },
  {
    icon: "list-check",
    title: "وظایف امروز",
    value: "todayTasks",
    color: { bg: "#d2ffe8", text: "#39da8a" },
  },
];

export default TaskDetailItemConfigs;
