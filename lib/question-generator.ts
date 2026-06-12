export function generateQuestions(
  skills: string[]
) {
  const questions = [];

  for (const skill of skills) {
    questions.push(
      `Explain ${skill}`
    );

    questions.push(
      `What projects have you built using ${skill}?`
    );
  }

  return questions.slice(0, 10);
}