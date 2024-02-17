import React, { useEffect, useState, useContext } from "react";

import workspaceContext from "@/app/context/workspaceContext";
import ContainedPrimary from "@/app/components/Button/ContainedPrimary";
import Single from "./Single";

import listTags from "@/app/lib/tags/list";
import listMerits from "@/app/lib/merits/list";
import List from "./List";

export default function Merits() {
  const { theWorkspace } = useContext(workspaceContext);
  const [merits, setMerits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [single, setSingle] = useState("");
  const [reloadList, setReloadList] = useState(false);

  useEffect(() => {
    (async function () {
      const mertisList = theWorkspace
        ? await listMerits({ workspaceId: theWorkspace })
        : [];

      setMerits(mertisList);
      setLoading(false);
    })();
  }, [reloadList, theWorkspace]);

  return (
    <>
      <section className={loading ? "loading" : ""}>
        <header className="d-flex justify-between align-center mb-3">
          <h3 className="text-h6">ارزش ها</h3>
          <ContainedPrimary onClick={() => setSingle("create")}>
            ایجاد ارزش جدید
          </ContainedPrimary>
        </header>

        {(merits?.data?.length ?? 0) !== 0 && (
          <List
            merits={merits.data}
            setSingle={setSingle}
            setLoading={setLoading}
            setReloadList={setReloadList}
          />
        )}
      </section>
      {single !== "" && (
        <Single
          single={single}
          setSingle={setSingle}
          setReloadList={setReloadList}
          theWorkspace={theWorkspace}
          merits={merits.data}
        />
      )}
    </>
  );
}
