import React, { useEffect, useState, useContext } from "react";

import workspaceContext from "@/app/context/workspaceContext";
import ContainedPrimary from "@/app/components/Button/ContainedPrimary";
import Single from "./Single";

import listTags from "@/app/lib/tags/list";
import List from "./List";

export default function Tags() {
  const { theWorkspace } = useContext(workspaceContext);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [single, setSingle] = useState("");
  const [reloadList, setReloadList] = useState(false);

  useEffect(() => {
    (async function () {
      const tagsList = theWorkspace
        ? await listTags({ workspaceId: theWorkspace })
        : [];

      setTags(tagsList);
      setLoading(false);
    })();
  }, [reloadList, theWorkspace]);

  return (
    <>
      <section className={loading ? "loading" : ""}>
        <header className="d-flex justify-between align-center mb-3">
          <h3 className="text-h6">برچسب ها</h3>
          <ContainedPrimary onClick={() => setSingle("create")}>
            ایجاد برچسب جدید
          </ContainedPrimary>
        </header>

        {(tags?.data?.length ?? 0) !== 0 && (
          <List
            tags={tags.data}
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
          tags={tags.data}
        />
      )}
    </>
  );
}
