import { Alert, Box, Snackbar } from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetCharacterDetails } from "./hooks/useGetCharacterDetails";
import { usePostToggleFavouriteCharacter } from "./hooks/usePostToggleFavouriteCharacter";
import { useLayoutEffect, useRef, useState } from "react";
import { GET_CHARACTER_DETAILS } from "./queries/character.query";
import { useApolloClient } from "@apollo/client";
import { useResize } from "../../shared/hook/useResize";
import CharacterAnimeCoverList from "./components/CharacterAnimeCoverList";
import CharacterAnimeList from "./components/CharacterAnimeList";
import CharacterInfo from "./components/CharacterInfo";
import CharacterAnimesFilter from "./components/CharacterAnimesFilter";
import { CharacterAnimeFilter } from "./character.type";
import { CHARACTER_ANIME_FILTER } from "../../shared/shared.constants";
import { useGetCharacterDetailsAnimes } from "./hooks/useGetCharacterDetailsAnimes";

const descriptionMaxHeight = 300;

const CharacterDetails = () => {
  const { id } = useParams();
  const client = useApolloClient();
  const windowWidth = useResize();
  const [readMore, setReadMore] = useState(false);
  const [descriptonHeight, setDescriptionHeight] = useState(0);
  const [toggleFavoriteSnackOpen, setToggleFavoriteSnackOpen] = useState(false);

  const [descriptionSpoilers, setDescriptionSpoilers] = useState<number[]>([]);
  const [isNameAltSpoilerShown, setIsNameAltSpoilerShown] = useState(true);
  const [sortFilter, SetSortFilter] = useState<CharacterAnimeFilter>(
    CHARACTER_ANIME_FILTER[0]
  );
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleSortFilterOpened = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };
  const handleSortFilterClosed = () => {
    setAnchorEl(null);
  };
  const handleSortFilterSelected = (filter: CharacterAnimeFilter) => {
    SetSortFilter(filter);
    setAnchorEl(null);
  };

  const showNameAltSpoiler = () => {
    setIsNameAltSpoilerShown(false);
  };

  const hideNameAltSpoiler = () => {
    setIsNameAltSpoilerShown(true);
  };

  const addDescriptionSpoiler = (id: number) => {
    setDescriptionSpoilers([...descriptionSpoilers, id]);
  };

  const removeDescriptionSpoiler = (id: number) => {
    const newArray = descriptionSpoilers.filter((x) => x !== id);

    setDescriptionSpoilers(newArray);
  };

  const {
    data: characterAnimeList,
    loading: animeListLoading,
    refetch: getCharacterAnimeList,
  } = useGetCharacterDetailsAnimes(parseInt(id!), sortFilter.value);

  const { data, error, loading, refetch } = useGetCharacterDetails(
    parseInt(id!)
  );

  console.log("characterAnimeList", characterAnimeList);

  const handleCharacterFavouriteToggled = () => {
    client.writeQuery({
      query: GET_CHARACTER_DETAILS,
      data: {
        // Contains the data to write
        ...data,
        Character: {
          ...data?.Character,
          isFavourite: !data?.Character.isFavourite,
        },
      },
      variables: {
        id: parseInt(id!),
        sortFilter: sortFilter.value,
      },
    });

    setToggleFavoriteSnackOpen(true);
  };

  const {
    favouriteStatus,
    toggleFavouriteCharacter,
    toggleFavouriteCharacterData,
    toggleFavouriteCharacterLoading,
    toggleFavoriteCharacterError,
  } = usePostToggleFavouriteCharacter(parseInt(id!), () => {
    setToggleFavoriteSnackOpen(true);
    handleCharacterFavouriteToggled();
  });

  const descriptionRef = useRef<null | HTMLParagraphElement>(null);

  const shouldDisplayDescription = () => {
    return descriptonHeight >= descriptionMaxHeight;
  };

  useLayoutEffect(() => {
    const descriptionHeight = descriptionRef.current?.clientHeight || 0;

    if (descriptionHeight > 0) {
      setDescriptionHeight(descriptionHeight);
    }
  }, [windowWidth, data, descriptionSpoilers]);

  const isFavoriteCharacterToggled = data?.Character.isFavourite == true;

  const isAnimeListLoading = loading || animeListLoading;

  return (
    <Box
      sx={{
        backgroundColor: "#EDF1F5",
        position: "relative",
      }}
    >
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        onClose={() => setToggleFavoriteSnackOpen(false)}
        open={toggleFavoriteSnackOpen}
        autoHideDuration={3000}
        message="Note archived"
        action={<p>aslkdj</p>}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          {`${isFavoriteCharacterToggled ? "Added to " : "Removed from "}`}
          favourites
        </Alert>
      </Snackbar>
      <CharacterInfo
        character={data?.Character}
        ref={descriptionRef}
        readMore={readMore}
        setReadMore={setReadMore}
        descriptionMaxHeight={descriptionMaxHeight}
        shouldDisplayDescription={shouldDisplayDescription()}
        toggleFavouriteCharacter={toggleFavouriteCharacter}
        descriptionSpoilers={descriptionSpoilers}
        addDescriptionSpoiler={addDescriptionSpoiler}
        removeDescriptionSpoiler={removeDescriptionSpoiler}
        isNameAltSpoilerShown={isNameAltSpoilerShown}
        showNameAltSpoiler={showNameAltSpoiler}
        hideNameAltSpoiler={hideNameAltSpoiler}
      />
      {data && (
        <CharacterAnimesFilter
          sortFilter={sortFilter}
          handleSortFilterClosed={handleSortFilterClosed}
          handleSortFilterOpened={handleSortFilterOpened}
          handleSortFilterSelected={handleSortFilterSelected}
          isSortFilterOpen={Boolean(anchorEl)}
          anchorEl={anchorEl}
        />
      )}

      {isAnimeListLoading && <CharacterAnimeCoverList />}
      {characterAnimeList && !isAnimeListLoading && (
        <CharacterAnimeList
          animeList={characterAnimeList.Character.media.nodes}
        />
      )}
      <Box
        sx={{
          paddingTop: "1rem",
        }}
      ></Box>
    </Box>
  );
};

export default CharacterDetails;
