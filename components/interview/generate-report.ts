import jsPDF from "jspdf";

export const generateInterviewReport = (
  result: any
) => {
  const doc = new jsPDF();

  doc.setFontSize(22);

  doc.text(
    "AI Interview Report",
    20,
    20
  );

  doc.setFontSize(14);

  doc.text(
    `Overall Score: ${result.score}%`,
    20,
    40
  );

  doc.text(
    `Technical: ${result.technical}%`,
    20,
    55
  );

  doc.text(
    `Communication: ${result.communication}%`,
    20,
    70
  );

  doc.text(
    `Confidence: ${result.confidence}%`,
    20,
    85
  );

  doc.text(
    "Feedback:",
    20,
    110
  );

  doc.text(
    result.feedback,
    20,
    125,
    {
      maxWidth: 160,
    }
  );

  doc.save(
    "Interview-Report.pdf"
  );
};