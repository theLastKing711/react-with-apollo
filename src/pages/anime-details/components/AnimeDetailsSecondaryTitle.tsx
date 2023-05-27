import { Typography } from "@mui/material";

export interface Props {
  children: string;
}

const AnimeDetailsSecondaryTitle = ({ children }: Props) => {
  return (
    <Typography
      component="h2"
      sx={{
        color: "rgb(92, 114, 138)",
        fontSize: "0.875rem",
        fontWeight: 500,
        marginBottom: "0.625rem",
      }}
    >
      {children}
    </Typography>
  );
};

export default AnimeDetailsSecondaryTitle;
