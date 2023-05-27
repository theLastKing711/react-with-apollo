import { Box, Button, styled } from "@mui/material";
import React, { useLayoutEffect, useState } from "react";
import MainContainer from "../shared/components/MainContainer";
import { NavLink, useLocation } from "react-router-dom";

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  color: "white",
  textDecoration: "none",
  "&:hover": {
    color: "rgb(211, 213, 243)",
  },
  textAlign: "center",
  padding: "1rem",
}));

interface Props {
  isLoggedIn: boolean;
  logIn: () => void;
  logOut: () => void;
}

export const HeaderDesktopNavigation = ({
  isLoggedIn,
  logIn,
  logOut,
}: Props) => {
  const { pathname } = useLocation();
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  const isOnAnimeDetailsPage = () => {
    const pathParts = pathname.split("/");

    const isOnAnimeRoute = pathParts[1] === "anime";

    if (
      pathParts.length === 3 &&
      isOnAnimeRoute &&
      /^\d*$/.test(pathParts[2])
    ) {
      return true;
    }

    return false;
  };

  const hideHeader = () => {
    setIsHeaderVisible(false);
  };

  const showHeader = () => {
    setIsHeaderVisible(true);
  };

  useLayoutEffect(() => {
    const scrollFunc = () => {
      const scrollY = window.scrollY;

      const isDocumentScrolled = scrollY > 0;

      if (isDocumentScrolled && isHeaderVisible) {
        hideHeader();
      }

      if (!isDocumentScrolled && !isHeaderVisible) {
        showHeader();
      }
    };

    window.addEventListener("scroll", scrollFunc);

    return () => window.removeEventListener("scroll", scrollFunc);
  }, [isHeaderVisible]);

  const animeDetailsPagHeadereProps = isOnAnimeDetailsPage()
    ? {
        opacity: 0.5,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 3,
        backgroundColor: "rgb(35,38,67)",
        transition: "opacity 0.3s",
        "&:hover": {
          backgroundColor: "rgb(43, 45, 66)",
          opacity: 1,
        },
      }
    : {};

  return (
    <>
      {isHeaderVisible && (
        <Box
          component="header"
          sx={{
            boxShadow: "0 0 0.5px 0.5px black",
            backgroundColor: "rgb(43, 45, 66)",
            ...animeDetailsPagHeadereProps,
          }}
        >
          <MainContainer>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                height: "4rem",
              }}
            >
              <Box
                component="a"
                href="/"
                sx={{
                  color: "rgb(188, 190, 220)",
                  textDecoration: "none",
                  "&:hover": {
                    color: "#d3d5f3",
                  },
                }}
              >
                Anime Boat
              </Box>
              <nav>
                <Box
                  component="ul"
                  sx={{
                    display: "flex",
                  }}
                >
                  <li>
                    <StyledNavLink to="/">Characters</StyledNavLink>
                  </li>
                  <li>
                    <StyledNavLink to="/anime">Anime List</StyledNavLink>
                  </li>
                </Box>
              </nav>
              <Box>
                {isLoggedIn ? (
                  <Button onClick={logOut}>Log Out</Button>
                ) : (
                  <StyledNavLink to="https://anilist.co/api/v2/oauth/authorize?client_id=11915&response_type=token">
                    Login
                  </StyledNavLink>
                )}
              </Box>
            </Box>
          </MainContainer>
        </Box>
      )}
    </>
  );
};
