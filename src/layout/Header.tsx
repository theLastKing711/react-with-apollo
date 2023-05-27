import { useResize } from "../shared/hook/useResize";
import HeaderMobileNavigation from "./HeaderMobileNavigation";
import { useLayoutEffect, useState } from "react";
import { HeaderDesktopNavigation } from "./HeaderDesktopNavigation";

interface Props {
  isLoggedIn: boolean;
  logIn: () => void;
  logOut: () => void;
}

const Header = ({ logIn, logOut, isLoggedIn }: Props) => {
  const [mobileNavAnchorEl, setMobileNavAnchorEl] =
    useState<null | HTMLElement>(null);

  const openMobileNav = (event: React.MouseEvent<HTMLElement>) => {
    setMobileNavAnchorEl(event.currentTarget);
  };

  const closeMobileNav = () => {
    setMobileNavAnchorEl(null);
  };

  const isMobileNavOpen = Boolean(mobileNavAnchorEl);

  const screenWidth = useResize();

  const isScreenWidthMediumScreenSizeOrSmaller = screenWidth <= 1025;

  useLayoutEffect(() => {
    if (!isScreenWidthMediumScreenSizeOrSmaller && isMobileNavOpen) {
      closeMobileNav();
    }
  }, [screenWidth]);

  return (
    <>
      {isScreenWidthMediumScreenSizeOrSmaller ? (
        <HeaderMobileNavigation
          closeMobileNav={closeMobileNav}
          openMobileNav={openMobileNav}
          mobileNavAnchorEl={mobileNavAnchorEl}
        />
      ) : (
        <HeaderDesktopNavigation
          isLoggedIn={isLoggedIn}
          logIn={logIn}
          logOut={logOut}
        />
      )}
    </>
  );
};

export default Header;
