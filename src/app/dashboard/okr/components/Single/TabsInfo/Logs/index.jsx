import React, { useState, useEffect, useContext } from "react";

import List from "./List";

export default function Logs({okrId}) {
  return (
    <div><List okrId={okrId} /></div>
  )
}
