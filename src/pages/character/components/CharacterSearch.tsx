import { TextField } from "@mui/material";
import { Box } from "@mui/system";

export interface Props {
  searchValue: string;
  searchChanged: (value: string) => void;
}

export const CharacterSearch = ({ searchValue, searchChanged }: Props) => {
  return (
    <Box
      sx={{
        paddingTop: "2rem",
        display: "flex",
        justifyContent: "center",
        marginBottom: "0.5rem ",
      }}
    >
      <TextField
        label="Search Characters"
        sx={{
          width: "60%",
        }}
        variant="outlined"
        type="search"
        value={searchValue}
        onChange={(event) => {
          searchChanged(event.target.value);
        }}
      ></TextField>
    </Box>
  );
};
