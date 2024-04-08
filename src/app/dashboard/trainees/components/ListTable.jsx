import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

import listColumns from "./listColumns";
import Cards from "@/app/components/Cards";

import getTrainees from "@/app/lib/trainees/list";

export default function ListTable({
  setMode,
  reloadList,
  setSingleUserId,
  setRealoadList,
}) {
  const [trainees, setTrainees] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = listColumns(setSingleUserId);

  useEffect(() => {
    (async function () {
      setLoading(true);

      const traineesList = await getTrainees();

      setTrainees(traineesList.data);
      setLoading(false);
    })();
  }, []);

  return (
    <div
      className={`p-2 wrapper-box
      ${loading ? "loading" : ""}`}
    >
      <div className="d-flex justify-between align-center mb-2">
        <div className="d-flex align-center">
          <h3 className="">لیست کارآموزان</h3>
        </div>

        <div className="d-flex align-center"></div>
      </div>

      {trainees &&
        ((window.innerWidth >= 1250 && (
          <DataGrid
            rows={trainees}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 20 },
              },
            }}
            pageSizeOptions={[5, 10]}
          />
        )) || <Cards rows={trainees} columns={columns} targetW={1250} />)}
    </div>
  );
}
