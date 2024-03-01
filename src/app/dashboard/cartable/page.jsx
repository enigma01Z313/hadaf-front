"use client";

import React, { useState } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import PropTypes from "prop-types";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box className="pt-2">
          <Typography>{children}</Typography>
        </Box>
      )}
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

import Task from "../tasks/page";
import Okr from "../okr/page";
import KPI from "../kpi/page";

export default function Cartable() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
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
      <CustomTabPanel value={value} index={0}>
        <Okr />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Task />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <KPI />
      </CustomTabPanel>
    </section>
  );
}
