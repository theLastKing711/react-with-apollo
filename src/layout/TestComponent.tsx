import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TestComponent = () => {
  const [state, updateState] = useState(0);

  console.log("test created", state);

  useEffect(() => {
    updateState((prev) => prev + 1);

    return () => console.log("test destroyed");
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        gap: "1rem",
      }}
    >
      <Box></Box>
      <Link to="/t/testFirst">first test</Link>

      <Link to="/t/testSecond">second test</Link>
      <Link to="/anime">main</Link>
      <button onClick={() => updateState((s) => s + 1)}>increment</button>
    </Box>
  );
};

export default TestComponent;
