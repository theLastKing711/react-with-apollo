import { Outlet } from "react-router-dom";
import Header from "./layout/Header";
import { useAuth } from "./auth/hooks/useAuth";
import Footer from "./layout/Footer";
import { Box } from "@mui/material";
import { useLayoutEffect } from "react";

function App() {
  const { isLoggedIn, logIn, logOut } = useAuth();
  logIn();

  useLayoutEffect(() => {
    console.log("created");
  }, []);

  return (
    <Box className="App" sx={{ backgroundColor: "#EDF1F5" }}>
      <Header isLoggedIn={isLoggedIn} logIn={logIn} logOut={logOut} />
      <Box
        sx={{
          minHeight: "calc(100vh - 64px)",
        }}
      >
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
