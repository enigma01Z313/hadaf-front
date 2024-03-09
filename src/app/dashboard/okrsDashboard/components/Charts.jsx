import React, { useEffect, useState, useContext } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { eachYearOfInterval, format } from "date-fns-jalali-3";

import { startOfHistory } from "@/app/configs";

import workspaceContext from "@/app/context/workspaceContext";
import ContainedInfo from "@/app/components/Button/ContainedInfo";
import Gauge from "@/app/components/Gauge";

import getWorkspaceUsersList from "@/app/lib/workspaces/users/list";
import getTeams from "@/app/lib/workspaces/team/list";

ChartJS.register(ArcElement, Tooltip, Legend);

function Header({ year, setYear, targetMember, setTargetMember }) {
  const { theWorkspace } = useContext(workspaceContext);

  const [workspaceUsers, setWorkspaceUsrs] = useState([]);
  const [workspaceTeams, setWorkspaceTeams] = useState([]);
  const years = eachYearOfInterval({
    start: startOfHistory,
    end: new Date(),
  });

  useEffect(() => {
    (async function () {
      if (theWorkspace) {
        const users = await getWorkspaceUsersList(theWorkspace);
        const teams = await getTeams(theWorkspace);

        setWorkspaceUsrs(users.data);
        setWorkspaceTeams(teams.data);
      }
    })();
  }, [theWorkspace]);

  return (
    <div className="d-flex align-end">
      <div className="d-flex-direction-column grow-1 pl-3">
        <div>تیم و اعضا</div>
        <Select
          className="w-100"
          id="okr-dashboard-member"
          value={targetMember}
          variant="standard"
          onChange={(e) => setTargetMember(e.target.value)}
        >
          <MenuItem value={"all"}>همه</MenuItem>
          {workspaceUsers.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.fullName}
            </MenuItem>
          ))}

          {workspaceTeams.map((team) => (
            <MenuItem key={team.id} value={team.id}>
              تیم {team.name}
            </MenuItem>
          ))}
        </Select>
      </div>
      <div className="d-flex-direction-column grow-1 pl-3">
        <div className="mb-0-5">سال</div>
        <Select
          className="w-100"
          id="okr-dashboard-year"
          value={year}
          variant="standard"
          onChange={(e) => setYear(e.target.value)}
        >
          {years.reverse().map((v, i) => (
            <MenuItem key={i} value={format(v, "yyyy")}>
              {format(v, "yyyy")}
            </MenuItem>
          ))}
        </Select>
      </div>
      <ContainedInfo className={"grow-1 justify-center"}>اعمال</ContainedInfo>
    </div>
  );
}

export default function Charts({
  data,
  okrProgress,
  year,
  setYear,
  targetMember,
  setTargetMember,
}) {
  const total = Object.values(data).reduce((acc, cur) => acc + cur.count, 0);
  const chartData = {
    labels: Object.values(data).map((item) => item.data.label),
    datasets: [
      {
        label: "تعداد",
        data: Object.values(data).map((item) => item.count),
        backgroundColor: [
          "rgb(57, 218, 138)",
          "rgb(253, 172, 65)",
          "rgb(255, 91, 92)",
          "rgb(139, 147, 166)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgb(57, 218, 138)",
          "rgb(253, 172, 65)",
          "rgb(255, 91, 92)",
          "rgb(139, 147, 166)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          font: {
            family: "IranSans",
          },
        },
        tooltip: {
          bodyFont: {
            family: "IranSans",
          },
          titleFont: {
            family: "IranSans",
          },
        },
        position: "right",
      },
    },
    cutout: "78%",
  };

  return (
    <section className="mt-3">
      <Header
        year={year}
        setYear={setYear}
        targetMember={targetMember}
        setTargetMember={setTargetMember}
      />

      <div className="mt-2 d-flex" style={{ height: "400px" }}>
        <div
          className="grow-1 d-flex justify-center px-5"
          style={{ width: "49%", float: "right" }}
        >
          {(total === 0 && (
            <div className="d-flex align-center">هدفی وجود ندارد</div>
          )) || (
            <div className="d-flex align-center" style={{ width: "340px" }}>
              <Doughnut data={chartData} options={options} />
            </div>
          )}
        </div>
        <div
          className="grow-1 d-flex justify-center align-center"
          style={{ width: "49%", float: "right" }}
        >
          <Gauge
            value={Math.floor(okrProgress * 100) / 100}
            size={"200px"}
            label="پیشرفت"
            textClass="text-h5"
            borderSize={18}
          />
        </div>
        <div className="clear-both"></div>
      </div>
    </section>
  );
}
