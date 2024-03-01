import React, { useContext, useEffect, useState } from "react";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import TableRowsIcon from "@mui/icons-material/TableRows";

import workspaceContext from "@/app/context/workspaceContext";
import ContainedInheritText from "@/app/components/Button/ContainedInheritText";

import getUsersList from "@/app/lib/users/list";

export default function Header({
  viewMode,
  setViewMode,
  filteredUser,
  setFilteredUser,
  filteredMeMode,
  setFilteredMeMode,
}) {
  const { theWorkspace, theUsers, setTheUsers } = useContext(workspaceContext);
  const theUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    (async function () {
      let usersList = [];

      if (theWorkspace) {
        usersList = await getUsersList(theWorkspace);
      }

      setTheUsers(usersList);
    })();
  }, [theWorkspace]);

  // const handleChange = (e) => {
  //   setFilteredUser(e.target.value);
  // };

  return (
    <div className="d-flex justify-between align-center mb-1">
      {/* <div className="d-flex">
        <Box sx={{ minWidth: 120 }}>
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
            className="mr-2"
            onClick={() => {
              if (filteredMeMode) setFilteredMeMode(false);
              else {
                setFilteredMeMode(true);
                setFilteredUser("all");
              }
            }}
            control={<Checkbox checked={filteredMeMode} />}
            label="نمایش همه آیتم های مشارکت شده توسط  شما"
          />
        </span>
      </div> */}
      <div className="d-flex align-center" style={{ marginRight: "auto" }}>
        <span className="ml-1">حالت نمایش</span>
        <ContainedInheritText
          className={`ml-1 p-1`}
          active={viewMode === "column"}
          onClick={() => setViewMode("column")}
        >
          <ViewColumnIcon />
        </ContainedInheritText>
        <ContainedInheritText
          className={`p-1`}
          active={viewMode === "row"}
          onClick={() => setViewMode("row")}
        >
          <TableRowsIcon />
        </ContainedInheritText>
      </div>
    </div>
  );
}
