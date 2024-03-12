import React from "react";

import BoxedDetailItem from "./DetailItem";

export default function BoxedItems({ data, config }) {
  return (
    <>
      {data && (
        <section className="d-flex">
          {config.map((configItem, index) => (
            <BoxedDetailItem
              key={index}
              index={index}
              title={configItem.title}
              value={data[configItem.value]}
              icon={configItem.icon}
              iconRender={configItem.iconRender}
              color={configItem.color}
            />
          ))}
        </section>
      )}
    </>
  );
}
