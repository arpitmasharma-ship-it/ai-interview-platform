"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { registerSchema } from "@/lib/validations";

export async function registerUser(formData: {
  name: string;
  email: string;
  password: string;
}) {
  const validated = registerSchema.safeParse(formData);

  if (!validated.success) {
    return {
      success: false,
      error: "Invalid input",
    };
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: formData.email,
    },
  });

  if (existingUser) {
    return {
      success: false,
      error: "User already exists",
    };
  }

  const hashedPassword = await bcrypt.hash(
    formData.password,
    10
  );

  await prisma.user.create({
    data: {
      name: formData.name,
      email: formData.email,
      password: hashedPassword,
    },
  });

  return {
    success: true,
  };
}