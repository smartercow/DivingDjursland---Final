import React, { useState } from "react";
import Godkendt from "./Godkendt";
import IkkeGodkendt from "./IkkeGodkendt";

const Tilmelding = () => {
  const [update, setUpdate] = useState(false)
  return (
    <div className="flex flex-col gap-5">
      <IkkeGodkendt update={update} setUpdate={setUpdate} />
      <Godkendt update={update} setUpdate={setUpdate} />
    </div>
  );
};

export default Tilmelding;
