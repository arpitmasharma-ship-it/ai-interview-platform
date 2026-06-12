import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const body = await req.json();

  await prisma.user.update({
    where: {
      email: session.user.email,
    },
    data: {
      theme: body.theme,
      notifications:
        body.notifications,
    },
  });

  return NextResponse.json({
    success: true,
  });
}