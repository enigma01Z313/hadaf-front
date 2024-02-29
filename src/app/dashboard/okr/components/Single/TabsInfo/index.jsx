import React, { useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";

import Tasks from "./Tasks";
import Logs from "./Logs";
import Details from "./Details";
import Comments from "./Comments";
import Point from "./Point";

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

export default function TabsInfo({
  okrId,
  keyResults,
  description,
  workspaceUsers,
  changeHandlred,
  timeFrame,
  targetParent,
  access,
  colleagues,
}) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <section className="mt-4">
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="اقدامک ها" {...a11yProps(0)} />
          <Tab label="کامنت" {...a11yProps(1)} />
          <Tab label="نکات(توضیحات)" {...a11yProps(2)} />
          <Tab label="سوابق" {...a11yProps(3)} />
          <Tab label="جزییات" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Tasks okrId={okrId} keyResults={keyResults} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Comments okrId={okrId} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Point okrId={okrId} description={description} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <Logs okrId={okrId} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <Details
          workspaceUsers={workspaceUsers}
          changeHandlred={changeHandlred}
          timeFrame={timeFrame}
          targetParent={targetParent}
          access={access}
          colleagues={colleagues}
        />
      </CustomTabPanel>
    </section>
  );
}
