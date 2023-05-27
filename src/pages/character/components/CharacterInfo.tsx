import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import React, { forwardRef } from "react";
import { convertToKFormat, newLineText } from "../../../shared/shared.util";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { CharacterDetailsBasic } from "../character.type";

interface Props {
  toggleFavouriteCharacter: (id: number) => void;
  readMore: boolean;
  setReadMore: (value: boolean) => void;
  descriptionMaxHeight: number;
  character: Omit<CharacterDetailsBasic, "media"> | undefined;
  shouldDisplayDescription: boolean;
  descriptionSpoilers: number[];
  addDescriptionSpoiler: (id: number) => void;
  removeDescriptionSpoiler: (id: number) => void;
  isNameAltSpoilerShown: boolean;
  showNameAltSpoiler: () => void;
  hideNameAltSpoiler: () => void;
}

const CharacterInfo = forwardRef<HTMLParagraphElement, Props>(
  (
    {
      character,
      toggleFavouriteCharacter,
      descriptionMaxHeight,
      readMore,
      setReadMore,
      shouldDisplayDescription,
      descriptionSpoilers,
      addDescriptionSpoiler,
      removeDescriptionSpoiler,
      isNameAltSpoilerShown,
      hideNameAltSpoiler,
      showNameAltSpoiler,
    },
    descriptionRef
  ) => {
    const buildCharacterAltNames = () => {
      let characterAltNames = "";

      if (character == undefined) {
        return "";
      }

      characterAltNames += character.name.alternative.join(",");

      return characterAltNames;
    };

    const buildCharacterAltSpoilerNames = () => {
      if (character == undefined) {
        return "";
      }

      let characterAltNamesSpoiler = "";

      characterAltNamesSpoiler += character.name.alternativeSpoiler.join(",");

      return characterAltNamesSpoiler;
    };

    const formatCharacterBirthDate = () => {
      if (character == undefined) {
        return "";
      }

      let characterBirthDateFormatted = "";

      if (character.dateOfBirth.year) {
        characterBirthDateFormatted += character.dateOfBirth.year;
      }

      if (character.dateOfBirth.month) {
        characterBirthDateFormatted += "/" + character.dateOfBirth.month;
      }

      if (character.dateOfBirth.day) {
        characterBirthDateFormatted += "/" + character.dateOfBirth.day;
      }

      return characterBirthDateFormatted;
    };

    const isDescriptionSpoilerItemActive = (item: {
      text: string;
      hasSpoiler: boolean;
      id: number;
    }) => {
      return (
        !descriptionSpoilers.includes(item.id) &&
        itemDescriptionHasSpoiler(item)
      );
    };

    const itemDescriptionHasSpoiler = (item: {
      text: string;
      hasSpoiler: boolean;
      id: number;
    }) => {
      return item.hasSpoiler;
    };

    return (
      <Box sx={{ minHeight: "408px" }}>
        {character && (
          <>
            <Box
              sx={{
                backgroundColor: "white",
                fontSize: "0.875rem",
                "@media screen and (max-width: 700px)": {
                  display: "flex",
                  flexDirection: "column-reverse",
                  alignItems: "center",
                  padding: "1.825rem 1rem 1rem",
                  backgroundColor: "#EDF1F5",
                },
              }}
            >
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "220px 1fr auto",
                  gap: "35px",
                  padding: "2rem 6.2rem 1.5rem 6.2rem",
                  maxWidth: "1300px",
                  margin: "0 auto",
                  "@media screen and (max-width: 1025px)": {
                    padding: "3rem 1.5rem 1.5rem",
                  },
                  "@media screen and (max-width: 700px)": {
                    display: "flex",
                    flexDirection: "column-reverse",
                    alignItems: "center",
                    padding: "0 1rem 0 1rem",
                    gap: "1rem",
                  },
                }}
              >
                <Box
                  className="image-empty-space"
                  sx={{
                    "@media screen and (max-width: 700px)": {
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "200px",
                      backgroundColor: "white",
                    },
                  }}
                ></Box>
                <Box
                  component="img"
                  src={character?.image.large}
                  alt=""
                  sx={{
                    width: "auto",
                    borderRadius: "6px",
                    boxShadow: "0 14px 30px purple",
                    position: "absolute",
                    "@media screen and (max-width: 700px)": {
                      position: "static",
                      width: "200px",
                      zIndex: 2,
                    },
                  }}
                />
                <Box>
                  <Box
                    component="h2"
                    sx={{
                      marginTop: "0.5rem",
                      "@media screen and (max-width: 700px)": {
                        zIndex: 2,
                      },
                    }}
                  >
                    {character?.name.full}
                  </Box>
                  <Box
                    sx={{
                      marginTop: "0.5rem",
                      fontSize: "0.825rem",
                      color: "rgb(139, 160, 178)",
                    }}
                  >
                    {character.name.native}
                    &nbsp; &nbsp;
                    {buildCharacterAltNames()}
                    <Tooltip
                      placement="top"
                      title={
                        isNameAltSpoilerShown
                          ? "Spoiler names, click to view"
                          : "Spoiler names, click to hide"
                      }
                      arrow
                    >
                      <Box
                        component="span"
                        sx={{
                          position: "relative",
                          fontSize: "1rem",
                        }}
                      >
                        <Box
                          component="button"
                          sx={{
                            border: "none",
                            backgroundColor: "transparent",
                            cursor: "pointer",
                            padding: "0px",
                          }}
                          onClick={
                            isNameAltSpoilerShown
                              ? showNameAltSpoiler
                              : hideNameAltSpoiler
                          }
                        >
                          {buildCharacterAltSpoilerNames()}
                        </Box>
                        {isNameAltSpoilerShown && (
                          <Box
                            component="span"
                            sx={{
                              position: "absolute",
                              top: "0",
                              left: "0",
                              width: "100%",
                              height: "100%",
                              backgroundColor: "#ADC0D2",
                              border: "none",
                              cursor: "pointer",
                              borderRadius: "4px",
                              padding: "0px",
                              pointerEvents: "none",
                            }}
                          ></Box>
                        )}
                      </Box>
                    </Tooltip>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    "@media screen and (max-width: 700px)": {
                      position: "absolute",
                      top: 9,
                      right: 9,
                      zIndex: 2,
                    },
                  }}
                >
                  <IconButton
                    onClick={() => toggleFavouriteCharacter(character?.id || 1)}
                  >
                    {character?.isFavourite ? (
                      <FavoriteIcon />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </IconButton>
                  <Typography component="p">
                    {character?.favourites
                      ? `${convertToKFormat(character?.favourites)}K`
                      : ""}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "220px 1fr",
                  gap: "35px",
                  maxWidth: "1300px",
                  margin: "1.2rem auto 0 auto",
                  padding: "0 6.2rem",
                  "@media screen and (max-width: 1025px)": {
                    padding: "0 1.5rem",
                  },
                  "@media screen and (max-width: 700px)": {
                    gap: 0,
                    gridTemplateColumns: "0fr 1fr",
                    padding: "0 1rem",
                  },
                }}
              >
                <Box></Box>
                <Box>
                  {character?.age && (
                    <p
                      style={{
                        marginBottom: "0.125rem",
                        fontSize: "0.875rem",
                      }}
                    >
                      <label
                        style={{ fontWeight: "bold", fontSize: "0.875rem" }}
                      >
                        Age: {character.age}
                      </label>
                    </p>
                  )}

                  {character?.dateOfBirth.year && (
                    <p
                      style={{
                        marginBottom: "0.125rem",
                        fontSize: "0.875rem",
                      }}
                    >
                      <label
                        style={{ fontWeight: "bold", fontSize: "0.875rem" }}
                        htmlFor=""
                      >
                        Date Of Birth:{" "}
                      </label>
                      {formatCharacterBirthDate()}
                    </p>
                  )}

                  {character?.bloodType && (
                    <p style={{ marginBottom: "0.125rem" }}>
                      <label
                        style={{ fontWeight: "bold", fontSize: "0.875rem" }}
                        htmlFor=""
                      >
                        Blood Type:
                      </label>
                      {character?.bloodType}
                    </p>
                  )}

                  <Box
                    ref={descriptionRef}
                    sx={{
                      minHeight: "250px",
                      maxHeight: !readMore
                        ? `${descriptionMaxHeight}px`
                        : "auto",
                      overflowY: "hidden",
                      marginTop: "1rem",
                      position: "relative",
                      "&:hover .read-more": {
                        color: "black",
                      },
                      "@media screen and (max-width: 700px)": {
                        minHeight: 0,
                      },
                    }}
                  >
                    <label
                      style={{ fontWeight: "bold", fontSize: "0.875rem" }}
                      htmlFor=""
                    ></label>
                    {newLineText(character?.description || "").map(
                      (item, index) => {
                        return isDescriptionSpoilerItemActive(item) ? (
                          <Box
                            key={item.id}
                            component="button"
                            sx={{
                              marginBottom: "0.5rem",
                              lineHeight: "1.25rem",
                              fontSize: "0.875rem",
                              color: "rgb(92, 114, 138)",
                              backgroundColor: "transparent",
                              outline: "none",
                              border: "1px solid transparent",
                              cursor: "pointer",
                              padding: "0.25rem",
                              "&:focus": {
                                border: "1px solid black",
                              },
                            }}
                            onClick={() => addDescriptionSpoiler(item.id)}
                          >
                            Click to View Spoiler
                          </Box>
                        ) : (
                          <Box
                            key={item.id}
                            sx={{
                              position: "relative",
                              "&:hover .remove-description-button": {
                                display: "block",
                              },
                            }}
                          >
                            {itemDescriptionHasSpoiler(item) && (
                              <Box
                                component="button"
                                className="remove-description-button"
                                sx={{
                                  display: "none",
                                  position: "absolute",
                                  top: "-1.25rem",
                                  right: "0",
                                  backgroundColor: "transparent",
                                  color: "red",
                                  fontSize: "1.5rem",
                                  border: "none",
                                  cursor: "pointer",
                                }}
                                onClick={() =>
                                  removeDescriptionSpoiler(item.id)
                                }
                              >
                                x
                              </Box>
                            )}
                            <Box
                              component="p"
                              sx={{
                                marginBottom: "0.5rem",
                                lineHeight: "1.25rem",
                                fontSize: "0.875rem",
                              }}
                              key={index}
                            >
                              {item.text}
                            </Box>
                          </Box>
                        );
                      }
                    )}
                    {!readMore && shouldDisplayDescription && (
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          width: "100%",
                          textAlign: "center",
                          cursor: "pointer",
                          padding: "0.825rem",
                          color: "transparent",
                          backgroundImage:
                            "linear-gradient(180deg, transparent, #EDF1F5 );",
                          "&:hover": {
                            color: "purple !important",
                          },
                        }}
                        className="read-more"
                        onClick={() => setReadMore(true)}
                      >
                        Read more
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          </>
        )}
      </Box>
    );
  }
);

export default CharacterInfo;
