import React from "react";
import MainContainer from "../../../../shared/components/MainContainer";
import { Box } from "@mui/material";
import { TopAnime } from "../../../anime/anime.type";
import AnimeBigListViewList from "./AnimeBigListViewList";

interface Props {
  animeList: TopAnime[];
  children?: React.ReactNode;
  hasRanking?: boolean;
}

const AnimeBigListViewMain = ({ animeList, hasRanking, children }: Props) => {
  // alert(hasRanking);

  return (
    <MainContainer>
      <Box
        sx={{
          padding: "1.5rem 0",
        }}
      >
        <AnimeBigListViewList animeList={animeList} hasRanking={hasRanking}>
          {children}
        </AnimeBigListViewList>
      </Box>
    </MainContainer>
  );
};

export default AnimeBigListViewMain;

// <Box sx={{ display: "flex" }}>
//   <Box
//     sx={{
//       backgroundColor: "red",
//       borderRadius: "50%",
//       width: 100,
//       height: 100,
//       position: "relative",
//       overflow: "hidden",
//       padding: "3rem",
//       border: "1px solid yellow",
//     }}
//   >
//     <Box
//       sx={{
//         position: "absolute",
//         top: 0,
//         left: 0,
//         width: "200px",
//         backgroundColor: "black",
//       }}
//     >
//       asdf
//     </Box>
//   </Box>
//   <span>asdh</span>
// </Box>
// <Box
//   sx={{
//     position: "relative",
//     width: "200px",
//     height: "200px",
//     padding: "0.5rem",
//     backgroundColor: "red",
//     marginLeft: "25rem",
//     overflow: "hidden",
//     // boxSizing: "content-box",
//     boxSizing: "border-box",
//     border: "1rem solid yellow",
//   }}
// >
{
  /* <Box sx={{ transform: "translate(-20px)" }}>
        dlk;sjf aklsdjf klasdjf lkasjdflk jasdlkfj asldkfj al;skdfj ;las dlk;sjf
        aklsdjf klasdjf lkasjdflk jasdlkfj asldkfj al;skdfj ;las dlk;sjf aklsdjf
        klasdjf lkasjdflk jasdlkfj asldkfj al;skdfj ;las dlk;sjf aklsdjf klasdjf
        lkasjdflk jasdlkfj asldkfj al;skdfj ;lasdlk;sjf aklsdjf klasdjf
        lkasjdflk jasdlkfj asldkfj al;skdfj ;las dlk;sjf aklsdjf klasdjf
        lkasjdflk jasdlkfj asldkfj al;skdfj ;lasdlk;sjf aklsdjf klasdjf
        lkasjdflk jasdlkfj asldkfj al;skdfj ;las dlk;sjf aklsdjf klasdjf
        lkasjdflk jasdlkfj asldkfj al;skdfj ;lasdlk;sjf aklsdjf klasdjf
        lkasjdflk jasdlkfj asldkfj al;skdfj ;las dlk;sjf aklsdjf klasdjf
        lkasjdflk jasdlkfj asldkfj al;skdfj ;lasdlk;sjf aklsdjf klasdjf
        lkasjdflk jasdlkfj asldkfj al;skdfj ;las dlk;sjf aklsdjf klasdjf
        lkasjdflk jasdlkfj asldkfj al;skdfj ;las
      </Box> */
}

{
  /* <Box
        sx={{
          position: "absolute",
          content: "''",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "green",
          transform: "translateX(0px)",
          border: "4px solid black",
          boxSizing: "border-box",
        }}
      ></Box>
    </Box> */
}
