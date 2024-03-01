"use client";

import React, { useState } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import PropTypes from "prop-types";

function CustomTabPanel(props) {
  const { children, value, index, render, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box className="pt-2">{render}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

import Filter from "./Filter";
import Task from "../tasks/page";
import Okr from "../okr/page";
import KPI from "../kpi/page";
import Devider from "@/app/components/Devider";

export default function Cartable() {
  const [value, setValue] = useState(0);
  const [filteredUser, setFilteredUser] = useState("all");
  const [filteredMeMode, setFilteredMeMode] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Filter
        filteredUser={filteredUser}
        setFilteredUser={setFilteredUser}
        filteredMeMode={filteredMeMode}
        setFilteredMeMode={setFilteredMeMode}
      />

      <Devider line={true} spacing={2} />
      
      <section>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="اهداف" {...a11yProps(0)} />
            <Tab label="اقدامک ها" {...a11yProps(1)} />
            <Tab label="KPI" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel
          value={value}
          index={0}
          render={
            <Okr filteredUser={filteredUser} filteredMeMode={filteredMeMode} />
          }
        />
        <CustomTabPanel
          value={value}
          index={1}
          render={
            <Task filteredUser={filteredUser} filteredMeMode={filteredMeMode} />
          }
        />
        <CustomTabPanel
          value={value}
          index={2}
          render={
            <KPI filteredUser={filteredUser} filteredMeMode={filteredMeMode} />
          }
        />
      </section>
    </>
  );
}
