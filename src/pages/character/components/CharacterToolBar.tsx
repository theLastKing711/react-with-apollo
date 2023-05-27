import { Box } from "@mui/system";

interface Props {
  currentPage: number;
  perPage: number;
  total: number;
}

const CharacterToolBar = ({ currentPage, perPage, total }: Props) => {
  const paginationStart = currentPage * perPage - perPage + 1;
  const paginationEnd = Math.min(currentPage * perPage, total);

  return (
    <Box
      sx={{
        boxShadow: "0px 0.825px 5px",
        padding: "0.75rem 0.5rem",
        marginBottom: "1rem",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div>
        <Box sx={{ fontSize: "1rem" }}>
          {paginationStart} - {paginationEnd} of {total} results
        </Box>
      </div>
    </Box>
  );
};

export default CharacterToolBar;
