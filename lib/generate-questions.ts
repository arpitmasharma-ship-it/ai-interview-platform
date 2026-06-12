import { skillQuestions } from "./question-bank";

export function generateQuestions(
  skills: string[]
) {
  const questions: string[] = [];

  skills.forEach((skill) => {
    const skillSet =
      skillQuestions[skill];

    if (skillSet) {
      questions.push(...skillSet);
    }
  });

  return questions.slice(0, 10);
}