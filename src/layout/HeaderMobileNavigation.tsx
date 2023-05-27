import { Box, IconButton, Popover, styled } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CloseIcon from "@mui/icons-material/Close";

const StyledMobileNavigationLink = styled(NavLink)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  color: "rgb(139, 160, 178)",
  fontSize: "0.625rem",
  "&:hover": {
    backgroundColor: "transparent",
  },
  padding: "1rem",
}));

interface Props {
  closeMobileNav: () => void;
  openMobileNav: (event: React.MouseEvent<HTMLElement>) => void;
  mobileNavAnchorEl: null | HTMLElement;
}

const HeaderMobileNavigation = ({
  mobileNavAnchorEl,
  closeMobileNav,
  openMobileNav,
}: Props) => {
  const isMobileNavOpen = Boolean(mobileNavAnchorEl);

  const id = isMobileNavOpen ? "simple-popper" : undefined;

  return (
    <>
      <IconButton
        sx={{
          position: "fixed",
          bottom: "2rem",
          right: "1rem",
          backgroundColor: "white",
          borderRadius: 2,
          zIndex: 2,
        }}
        disableRipple
        onClick={openMobileNav}
      >
        <MenuIcon
          sx={{
            fontSize: "2.4rem",
            fontWeight: 700,
            fill: "rgb(61, 180, 242)",
          }}
        />
      </IconButton>
      <Popover
        id={id}
        open={isMobileNavOpen}
        anchorEl={mobileNavAnchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        sx={{
          p: "5rem",
        }}
      >
        <Box component="nav">
          <Box
            component="ul"
            sx={{
              display: "flex",
              gap: "0.5rem",
              alignItems: "center",
            }}
          >
            <Box component="li">
              <StyledMobileNavigationLink to="/">
                <HomeIcon
                  sx={{
                    fontSize: "2.5rem",
                    fill: "rgb(139, 160, 178)",
                    "&:hover": {
                      fill: "rgb(61, 180, 242)",
                    },
                  }}
                />
                Home
              </StyledMobileNavigationLink>
            </Box>
            <Box component="li">
              <StyledMobileNavigationLink to="/anime">
                <PlayArrowIcon
                  sx={{
                    fontSize: "2.5rem",
                    fill: "rgb(139, 160, 178)",
                    "&:hover": {
                      fill: "rgb(61, 180, 242)",
                    },
                  }}
                />
                Anime List
              </StyledMobileNavigationLink>
            </Box>
            <Box component="li">
              <IconButton disableRipple onClick={closeMobileNav}>
                <CloseIcon
                  sx={{
                    fontSize: "2.5rem",
                    fill: "rgb(139, 160, 178)",
                    "&:hover": {
                      fill: "rgb(61, 180, 242)",
                    },
                  }}
                />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Popover>
    </>
  );
};

export default HeaderMobileNavigation;
