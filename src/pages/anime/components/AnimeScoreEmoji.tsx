import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";

interface Props {
  score: number;
  size?: "small" | "medium" | "large";
}

const AnimeScoreEmoji = ({ score, size = "medium" }: Props) => {
  //   let ScoreEmoji: JSX.Element | null = null;
  if (score >= 70) {
    return (
      <SentimentSatisfiedAltIcon
        sx={{
          fill: "green",
        }}
        fontSize={size}
      />
    );
  } else if (score >= 50) {
    return (
      <SentimentNeutralIcon
        sx={{
          color: "orange",
        }}
        fontSize={size}
      ></SentimentNeutralIcon>
    );
  } else {
    return (
      <SentimentDissatisfiedIcon
        sx={{
          color: "red",
        }}
        fontSize={size}
      ></SentimentDissatisfiedIcon>
    );
  }
};

export default AnimeScoreEmoji;
