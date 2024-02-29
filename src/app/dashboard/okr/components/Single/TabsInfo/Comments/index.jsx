import React, { useState, useEffect, useContext } from "react";

import workspaceContext from "@/app/context/workspaceContext";

import List from "./List";
import Create from "./Create";

import getOkrComments from "@/app/lib/okr/comments/list";
import Devider from "@/app/components/Devider";

export default function Comments({ okrId }) {
  const { theWorkspace } = useContext(workspaceContext);

  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [reloadList, setReloadList] = useState(false);

  useEffect(() => {
    (async function () {
      const commentsList = await getOkrComments(okrId);
      setComments(commentsList.data);
      setLoading(false);
    })();
  }, [reloadList]);

  return (
    <section className={loading ? "loading" : ""}>
      {(loading && "در حال بارگذاری") ||
        (comments.length === 0 && "کامنتی برای نمایش وجود ندارد") || (
          <List
            comments={comments}
            okrId={okrId}
            setReloadList={setReloadList}
            setLoading={setLoading}
          />
        )}
      <Devider line={true} spacing={2} />
      <Create
        okrId={okrId}
        setReloadList={setReloadList}
        setLoading={setLoading}
      />
    </section>
  );
}
