import { Box, Grid } from "@mui/material";
import { footerNavUrls } from "../shared/shared.constants";
import _ from "lodash";

const Footer = () => {
  const navLinksChunks = _.chunk(footerNavUrls, 4);

  navLinksChunks[3][4] = navLinksChunks[4][0];
  navLinksChunks[3][5] = navLinksChunks[4][1];
  navLinksChunks.pop();

  return (
    <Box
      sx={{
        backgroundColor: "#11161D",
        // marginTop: "2rem",
      }}
    >
      <Box
        sx={{
          maxWidth: "1300px",
          margin: "0 auto",
          padding: "2.5rem 1rem 2rem",
        }}
      >
        <Grid container>
          {navLinksChunks.map((col, colIndex) => (
            <Grid item xs={12} sm={6} lg={3} key={colIndex}>
              <Box component="section" sx={{ marginBottom: "1.5rem" }}>
                <Box
                  component="ul"
                  sx={{
                    padding: "0",
                    "& > * + *": {
                      marginTop: "0.725rem",
                    },
                  }}
                >
                  {col.map((item, index) => (
                    <Box
                      key={index}
                      component="li"
                      sx={{
                        // padding: "0.25rem",
                        color: "rgb(68, 180, 239)",
                        "&:hover": {
                          color: "rgb(160, 177, 197)",
                        },
                      }}
                    >
                      <a href={item.url} style={{ fontSize: "0.9rem" }}>
                        {item.name}
                      </a>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Footer;
