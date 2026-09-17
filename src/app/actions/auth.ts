"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters")
});

export async function registerUser(name: string, email: string, password: string) {
  try {
    const validData = schema.parse({ name, email, password });
    const normalizedEmail = validData.email.toLowerCase();

    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail }
    });

    if (existingUser) {
      return { error: "User already exists with this email" };
    }

    const hashedPassword = await bcrypt.hash(validData.password, 10);

    await prisma.user.create({
      data: {
        name: validData.name,
        email: normalizedEmail,
        password: hashedPassword,
        role: "USER", // Server strictly enforces default role
      }
    });

    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Change .errors to .issues
      return { error: error.issues[0].message };
    }
    return { error: "Something went wrong during registration" };
  }
}