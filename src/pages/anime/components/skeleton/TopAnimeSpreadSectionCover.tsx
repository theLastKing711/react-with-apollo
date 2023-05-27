import React from "react";
import MainAnimeHeader from "../MainAnimeHeader";
import TopAnimeSpreadListCover from "./TopAnimeSpreadListCover";
import MainContainer from "../../../../shared/components/MainContainer";

interface Props {
  title: string;
  link: string;
  listCount: number;
}

const TopAnimeSpreadSectionCover = ({ title, link, listCount }: Props) => {
  return (
    <MainContainer>
      <MainAnimeHeader title={title} link={link} />
      <TopAnimeSpreadListCover listCount={listCount} />
    </MainContainer>
  );
};

export default TopAnimeSpreadSectionCover;
