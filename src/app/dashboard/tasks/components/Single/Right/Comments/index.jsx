import React, { useState, useEffect, useContext } from "react";

import workspaceContext from "@/app/context/workspaceContext";

import List from "./List";
import Create from "./Create";

import getTaskComments from "@/app/lib/tasks/comments/list";
import Devider from "@/app/components/Devider";

export default function Comments({ taskId }) {
  const { theWorkspace } = useContext(workspaceContext);

  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [reloadList, setReloadList] = useState(false);

  useEffect(() => {
    (async function () {
      const commentsList = await getTaskComments(taskId);
      setComments(commentsList.data);
      setLoading(false);
    })();
  }, [reloadList]);

  return (
    <section className={`mt-5 ${loading ? "loading" : ""}`}>
      <h5 className="text-h6">کامنت ها</h5>
      {(loading && "در حال بارگذاری") ||
        (comments.length === 0 && <span className="text-caption">کامنتی برای نمایش وجود ندارد</span>) || (
          <List
            comments={comments}
            taskId={taskId}
            setReloadList={setReloadList}
            setLoading={setLoading}
          />
        )}
      <Devider line={true} spacing={1} />
      <Create
        taskId={taskId}
        setReloadList={setReloadList}
        setLoading={setLoading}
      />
    </section>
  );
}
