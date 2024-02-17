import React from "react";
import TagItem from "./TagItem";

export default function List({ tags, setSingle, setLoading, setReloadList }) {
  return (
    <div>
      {tags.map((tag) => (
        <TagItem
          key={tag.id}
          tag={tag}
          setSingle={setSingle}
          setLoading={setLoading}
          setReloadList={setReloadList}
        />
      ))}
    </div>
  );
}
