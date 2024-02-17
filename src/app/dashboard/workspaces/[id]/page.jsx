"use client";

import React, { useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";

import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";

import Info from "./Info";
import Timeframe from "./Timeframe";
import Tags from "./Tags";
import Merits from "./Merit";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
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

export default function User({ params }) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example">
          <Tab label="تنظیمات فضای کاری" {...a11yProps(0)} />
          <Tab label="بازه های زمانی" {...a11yProps(1)} />
          <Tab label="برچسب ها" {...a11yProps(2)} />
          <Tab label="ارزش ها" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Info params={params} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Timeframe />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Tags />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <Merits />
      </CustomTabPanel>
    </>
  );
}
