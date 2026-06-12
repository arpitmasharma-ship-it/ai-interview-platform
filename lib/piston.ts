export async function executeCode(
  code: string
) {
  const response = await fetch(
    "https://emkc.org/api/v2/piston/execute",
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        language: "javascript",
        version: "18.15.0",

        files: [
          {
            content: code,
          },
        ],
      }),
    }
  );

  const text =
    await response.text();

  console.log(
    "===================="
  );

  console.log(
    "PISTON STATUS:",
    response.status
  );

  console.log(
    "PISTON RESPONSE:"
  );

  console.log(text);

  console.log(
    "===================="
  );

  if (!response.ok) {
    throw new Error(
      `Piston Error ${response.status}: ${text}`
    );
  }

  return JSON.parse(text);
}