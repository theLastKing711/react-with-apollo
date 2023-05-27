import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface Props {
  title?: string;
  link?: string;
}

const MainAnimeHeader = ({ title, link }: Props) => {
  return (
    <>
      {title && link && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "0.825rem",
          }}
        >
          <Link to={link}>
            <Typography
              component="h2"
              sx={{
                color: "rgb(81, 97, 112)",
                "&:hover": {
                  color: "rgb(93, 109, 122)",
                },
              }}
            >
              {title}
            </Typography>
          </Link>
          {link && (
            <Box>
              <Link to={link}>
                <Typography
                  component="p"
                  sx={{
                    color: "rgb(81, 97, 112)",
                    fontSize: "0.725rem",
                    "&:hover": {
                      color: "rgb(135, 155, 173)",
                    },
                  }}
                >
                  View All
                </Typography>
              </Link>
            </Box>
          )}
        </Box>
      )}
    </>
  );
};

export default MainAnimeHeader;
