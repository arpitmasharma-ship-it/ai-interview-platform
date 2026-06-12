import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({
      success: false,
    });
  }

  const existingUser =
    await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

  if (!existingUser) {
    await prisma.user.create({
      data: {
        name:
          session.user.name ||
          "User",
        email:
          session.user.email,
      },
    });
  }

  return NextResponse.json({
    success: true,
  });
}