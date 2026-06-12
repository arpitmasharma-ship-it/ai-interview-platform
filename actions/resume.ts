"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { extractResumeText } from "@/lib/extract-resume-text";

export async function createResume(
  title: string,
  fileUrl: string
) {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  let extractedText = "";

  try {
    console.log("=================================");
    console.log("Downloading PDF:", fileUrl);

    const pdfResponse = await fetch(
      fileUrl,
      {
        headers: {
          Accept:
            "application/pdf",
        },
      }
    );

    console.log("CONTENT TYPE:");
    console.log(
      pdfResponse.headers.get("content-type")
    );


    console.log(
      "Response Status:",
      pdfResponse.status
    );

    if (!pdfResponse.ok) {
      throw new Error(
        `Failed to download PDF: ${pdfResponse.status}`
      );
    }

    const arrayBuffer =
      await pdfResponse.arrayBuffer();

    console.log(
      "PDF Size:",
      arrayBuffer.byteLength
    );

    const pdfBuffer =
      Buffer.from(arrayBuffer);

    extractedText =
      await extractResumeText(pdfBuffer);

    console.log(
      "Extracted Text Length:",
      extractedText.length
    );

    console.log(
      "Text Preview:"
    );

    console.log(
      extractedText.substring(0, 500)
    );

    console.log("=================================");
  } catch (error) {
    console.error(
      "PDF Extraction Error:",
      error
    );
  }

  const resume =
    await prisma.resume.create({
      data: {
        title,
        fileUrl,
        extractedText,
        userId: user.id,
      },
    });

  return resume;
}

export async function getUserResumes() {
  const session = await auth();

  if (!session?.user?.email) {
    return [];
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    return [];
  }

  return prisma.resume.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function deleteResume(
  id: string
) {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  await prisma.resume.delete({
    where: {
      id,
    },
  });

  return {
    success: true,
  };
}