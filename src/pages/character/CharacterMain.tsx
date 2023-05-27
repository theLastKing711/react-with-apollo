import { CharactersList } from "./components/CharactersList";
import { useGetCharacters } from "./hooks/useGetCharacters";
import { CharacterSearch } from "./components/CharacterSearch";
import CharacterPagination from "./components/CharacterPagination";
import CharacterToolBar from "./components/CharacterToolBar";
import { Box } from "@mui/material";
import CharacterCoverList from "./components/CharacterCoverList";

const CharacterMain = () => {
  const {
    loading,
    error,
    data,
    searchQueryParamsAsString,
    pageQueryParamsAsString,
    hasNextPage,
    hasPreviousPage,
    getNextPageUrl,
    getPreviousPageUrl,
    updateSearchTerm,
  } = useGetCharacters();

  return (
    <Box sx={{ backgroundColor: "#EDF1F5" }}>
      <Box
        sx={{
          maxWidth: "1300px",
          margin: "0 auto",
          padding: "1rem 2rem 3rem",
        }}
      >
        <CharacterSearch
          searchValue={searchQueryParamsAsString}
          searchChanged={(value) => {
            updateSearchTerm(value);
          }}
        />
        {error && <h2> error happened</h2>}
        {loading && <CharacterCoverList />}
        {data && (
          <>
            <CharacterPagination
              hasNextPage={hasNextPage}
              hasPerviousPage={hasPreviousPage}
              page={pageQueryParamsAsString}
              getPreviousPageUrl={getPreviousPageUrl}
              getNextPageUrl={getNextPageUrl}
            />
            <CharacterToolBar
              currentPage={data?.Page.pageInfo.currentPage}
              perPage={data.Page.pageInfo.perPage}
              total={data.Page.pageInfo.total}
            />
            <CharactersList
              isLoading={loading}
              characters={data?.Page.characters}
            />
          </>
        )}
      </Box>
    </Box>
  );
};

export default CharacterMain;
