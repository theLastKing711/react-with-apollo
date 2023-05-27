import { NUMBER_TO_SEASON_MAP } from "./shared.constants";

export const newLineText = (text: string) => {

  const newText = text
    .replaceAll("__", "")
    .split("\n")
    .filter((x) => x !== "")
    .map((str, index) => {

      if(str[0] === "~") {
        return {
          text: str.substring(2, str.length - 2),
          hasSpoiler: true,
          id: index
        }
      }

      return {
        text: str,
        hasSpoiler: false,
        id: index
      }
      
    });


  return newText;
};

export const convertToKFormat = (value: number) => {
  if (value < 1000) {
    return value;
  }

  return (value / 1000).toFixed(1);
};


export const getThisSeasonName = () => {

  const monthNumber = (getCurrentMonth() % 12).toString();


  return NUMBER_TO_SEASON_MAP[monthNumber]
  
}

export const getNextSeasonName = () => {

  const nextMonthNumber = ((getCurrentMonth() + 3) % 12).toString();

  return NUMBER_TO_SEASON_MAP[nextMonthNumber];
  
}

export const getCurrentMonth = () => {

  // const utcToTokyoHourDifference = 9;
  
  return new Date().getUTCMonth() + 1;
  
}

export const getCurrentYear = () => {

  return new Date().getUTCFullYear();
  
}

export const getNextYear = () => {
  return getCurrentYear() + 1;
}

export const toUpperCaseFirstChar = (word: string) => {

  if(! word) {
    return "";
  }
  
  const firstLetter = word.charAt(0);

  const firstLetterCap = firstLetter.toUpperCase();

  const remainingLetters = word.toLowerCase().slice(1);
  
  const capitalized = firstLetterCap + remainingLetters;

  return capitalized;

};

export const formatDayCount = (day: string) => {
  if (day === "1") {
    return day + " Day";
  }

  return day + " Days";
};

export const formatHourCount = (hour: string) => {
  if (hour === "1") {
    return hour + " hour";
  }

  return hour + " hours";
}

export const formatMinutesCount = (minute: string) => {
  if (minute === "1") {
    return minute + " minute";
  }

  return minute + " minutes";
}

export const generateYearsUntilNextYear = () => {

  console.log("generating values")

  const startingYear = 1940;

  const endingYear = getNextYear();

  const yearsList = []

  let yearsPassed = endingYear;

  while(startingYear <= yearsPassed) 
  {
    yearsList.push(yearsPassed--);
  }

  console.log("years list", yearsList);


  return yearsList;
}

export const buildValueToLabelMap = (list: {label: string, value: string}[]) => {
  let valueToLabelMap: Record<string, string> = {};
  
  list.forEach(item => {
      valueToLabelMap[item.value] = item.label;
  })

  return valueToLabelMap;
  
}