import { NavigateBefore } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";

interface Props {
  hasPerviousPage: boolean;
  hasNextPage: boolean;
  page: string;
  getPreviousPageUrl: () => string;
  getNextPageUrl: () => string;
}

const CharacterPagination = ({
  hasPerviousPage,
  hasNextPage,
  page,
  getPreviousPageUrl,
  getNextPageUrl,
}: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        marginBottom: "1rem",
      }}
    >
      <Box
        sx={{
          flex: "1",
        }}
      >
        {hasPerviousPage && (
          <Link to={getPreviousPageUrl()}>
            <IconButton>
              <NavigateBefore fontSize="large" />
            </IconButton>
          </Link>
        )}
      </Box>
      {hasNextPage && (
        <Link to={getNextPageUrl()}>
          <IconButton>
            <NavigateNextIcon fontSize="large" />
          </IconButton>
        </Link>
      )}
    </Box>
  );
};

export default CharacterPagination;
