import React from "react";
import TopAnimeSpreadItemCover from "./TopAnimeSpreadItemCover";

interface Props {
  listCount: number;
  hasRanking?: boolean;
}

const TopAnimeSpreadListCover = ({ listCount, hasRanking = true }: Props) => {
  const placeHolderList = Array.from({ length: listCount }, (_, i) => {
    return i;
  });

  return (
    <>
      {placeHolderList.map((item, index) => (
        <TopAnimeSpreadItemCover key={index} hasRanking={hasRanking} />
      ))}
    </>
  );
};

export default TopAnimeSpreadListCover;
