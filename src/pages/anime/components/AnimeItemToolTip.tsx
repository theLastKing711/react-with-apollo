import React, { useState } from "react";
import AnimeItemToolTipComponent, {
  AnimeToolTipComponentProps,
} from "./AnimeItemToolTipComponent";
import { Tooltip, TooltipProps, styled, tooltipClasses } from "@mui/material";

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
    padding: "1.5rem 1.25rem 1.25rem",
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: `${theme.palette.common.white}`,
  },
}));

interface Props {
  animeInfo: AnimeToolTipComponentProps;
  children: JSX.Element;
  placement: TooltipProps["placement"];
  isVisible: boolean;
}

const AnimeItemToolTip = ({
  children,
  animeInfo,
  placement,
  isVisible = true,
}: Props) => {
  const [isopen, setIsOpen] = useState(false);

  const openToolTip = () => {
    if (isVisible) {
      setIsOpen(true);
    }
  };

  const closeToolTip = () => {
    setIsOpen(false);
  };

  return (
    <LightTooltip
      placement={placement}
      title={<AnimeItemToolTipComponent animeInfo={animeInfo} />}
      arrow
      onOpen={openToolTip}
      onClose={closeToolTip}
      open={isopen}
    >
      {children}
    </LightTooltip>
  );
};

export default AnimeItemToolTip;
