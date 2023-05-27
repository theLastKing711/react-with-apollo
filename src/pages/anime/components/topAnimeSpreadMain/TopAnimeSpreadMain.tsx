import React from "react";
import MainContainer from "../../../../shared/components/MainContainer";
import { TopAnime } from "../../anime.type";
import TopAnimeSpreadItem from "./TopAnimeSpreadItem";
import MainAnimeHeader from "../MainAnimeHeader";

interface Props {
  animeList: TopAnime[];
  title?: string;
  link?: string;
  itemHasRanking?: boolean;
}

const TopAnimeSpreadMain = ({
  animeList,
  title,
  link,
  itemHasRanking = false,
}: Props) => {
  return (
    <MainContainer>
      {title && link && <MainAnimeHeader title={title} link={link} />}
      {animeList.map((item, index) => (
        <TopAnimeSpreadItem
          animeInfo={item}
          rank={index + 1}
          key={item.id}
          hasRanking={itemHasRanking}
        />
      ))}
    </MainContainer>
  );
};

export default TopAnimeSpreadMain;
