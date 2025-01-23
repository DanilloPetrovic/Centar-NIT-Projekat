import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../prisma";
import createHttpError from "http-errors";

export const regiter = async (data: {
  email: string;
  password: string;
  username: string;
}) => {
  const isUserExsist = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (isUserExsist) {
    throw createHttpError(400, "This email already in use");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      username: data.username,
      email: data.email,
      password: hashedPassword,
    },
  });

  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const login = async (data: { email: string; password: string }) => {
  const user = await prisma.user.findUnique({ where: { email: data.email } });

  if (!user) {
    throw createHttpError(401, "This user do not exists");
  }

  const isPasswordValid = await bcrypt.compare(data.password, user.password);

  if (!isPasswordValid) {
    throw createHttpError(401, "Invalid credentials");
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: "1d" }
  );

  const { password: _, ...userWithoutPassword } = user;
  return { token, user: userWithoutPassword };
};

export const getUserInfoById = async (userID: number) => {
  const user = await prisma.user.findUnique({
    where: { id: userID },
    select: {
      username: true,
      email: true,
      tasks: true,
      comments: true,
      replies: true,
      projects: true,
      createdProjects: true,
    },
  });

  if (!user) {
    throw createHttpError(404, "User not found");
  }

  return user;
};
