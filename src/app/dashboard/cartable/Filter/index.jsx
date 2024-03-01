import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  MenuItem,
  FormControl,
  Select,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

import workspaceContext from "@/app/context/workspaceContext";

export default function Filter({
  filteredUser,
  setFilteredUser,
  filteredMeMode,
  setFilteredMeMode,
}) {
  const { theWorkspace, theUsers, setTheUsers } = useContext(workspaceContext);
  const theUser = JSON.parse(localStorage.getItem("user"));

  const handleChange = (e) => {
    setFilteredUser(e.target.value);
  };

  return (
    <section>
      <div className="d-flex align-center">
        <div className="ml-1">کارتابل: </div>
        <Box sx={{ minWidth: 150 }}>
          <FormControl variant="standard" fullWidth>
            <Select
              id="select-user"
              value={filteredUser}
              label="User"
              onChange={handleChange}
            >
              <MenuItem key="all" value="all">
                همه
              </MenuItem>
              {theUsers?.data?.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.fullName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <span className="mr-2">
          <FormControlLabel
            onChange={(e) => {
              if (e.target.checked) {
                setFilteredMeMode(true);
                setFilteredUser("all");
              } else {
                setFilteredMeMode(false);
              }
            }}
            control={<Checkbox />}
            label="نمایش همه آیتم های مشارکت شده توسط  شما"
          />
        </span>
      </div>
    </section>
  );
}
