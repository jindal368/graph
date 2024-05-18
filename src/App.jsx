import { useState } from "react";

import "./App.css";
import Grid from "./component/Grid";

function App() {
  const [row, setRow] = useState(18);
  const [col, setCol] = useState(18);
  return (
    <>
      <Grid row={row} col={col} />;
    </>
  );
}

export default App;
