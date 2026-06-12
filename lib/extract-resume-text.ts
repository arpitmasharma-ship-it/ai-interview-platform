import PDFParser from "pdf2json";

export async function extractResumeText(
  pdfBuffer: Buffer
): Promise<string> {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();

    pdfParser.on(
      "pdfParser_dataError",
      (err) => {
        reject(err);
      }
    );

    pdfParser.on(
      "pdfParser_dataReady",
      (pdfData) => {
        try {
          let text = "";

          for (
            const page of pdfData.Pages || []
          ) {
            for (
              const textObj of page.Texts || []
            ) {
              for (
                const run of textObj.R || []
              ) {
                text +=
                  decodeURIComponent(
                    run.T
                  ) + " ";
              }
            }
          }

          console.log(
            "EXTRACTED TEXT:"
          );
          console.log(
            text.substring(0, 1000)
          );

          resolve(text);
        } catch (error) {
          reject(error);
        }
      }
    );

    pdfParser.parseBuffer(pdfBuffer);
  });
}