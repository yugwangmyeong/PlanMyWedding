import { questionList } from "../data/question";
import { parseWon, parseNumber } from "./parser"; // 기존 파서 함수

export const makeSurveyData = (answers) => {
  const data = {};

  answers.forEach(({ question, answer }) => {
    const q = questionList.find((q) => q.question === question);
    if (!q) return;

    if (q.type === "single") {
      if (q.name === "리뷰") {
        data["리뷰"] = [[answer]];
      } else if (q.name === "대관료" || q.name === "식대") {
        data[q.name] = parseWon(answer);
      } else {
        data[q.name] = parseNumber(answer);
      }
    }

    if (q.type === "importance" && q.weightKey) {
      const weight = parseInt(answer) / 10;
      data[q.weightKey] = weight;
    }
  });

  return data;
};
