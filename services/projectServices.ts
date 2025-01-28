import { User } from "@prisma/client";
import prisma from "../prisma";
import createHttpError from "http-errors";

export const createProject = async (dataProps: {
  title: string;
  description: string;
  createdById: number;
  participants: number[];
  deadline: string;
}) => {
  try {
    const project = await prisma.project.create({
      data: {
        title: dataProps.title,
        description: dataProps.description,
        createdById: dataProps.createdById,
        participants: {
          connect: dataProps.participants.map((id) => ({ id })),
        },
        deadline: dataProps.deadline,
      },
    });

    return project;
  } catch (error) {
    throw createHttpError(500, "Failed to create project");
  }
};

export const updateProject = async (
  idProp: number,
  dataProp: {
    title: string;
    description: string;
    deadline: string;
  }
) => {
  const isProjectExsist = await prisma.project.findUnique({
    where: { id: idProp },
  });

  if (!isProjectExsist) {
    return null;
  }

  try {
    const updatedProject = await prisma.project.update({
      where: {
        id: idProp,
      },
      data: {
        title: dataProp.title,
        description: dataProp.description,
        deadline: dataProp.deadline,
      },
    });

    return updatedProject;
  } catch (error) {
    throw createHttpError(500, "Failed to update project");
  }
};

export const deleteProject = async (idProp: number) => {
  const isProjectExsist = await prisma.project.findUnique({
    where: { id: idProp },
  });

  if (!isProjectExsist) {
    return null;
  }

  try {
    const deletedProject = await prisma.project.delete({
      where: { id: idProp },
    });

    return deletedProject;
  } catch (error) {
    throw createHttpError(500, "Failed to delete project");
  }
};

export const updateParticipent = async (
  idProp: number,
  participantsProp: { add: number[]; remove: number[] }
) => {
  const isProjectExsist = await prisma.project.findUnique({
    where: { id: idProp },
  });

  if (!isProjectExsist) {
    return null;
  }

  try {
    const updatedProject = await prisma.project.update({
      where: { id: idProp },
      data: {
        participants: {
          connect: participantsProp.add.map((id) => ({ id })),
          disconnect: participantsProp.remove.map((id) => ({ id })),
        },
      },
    });

    return updatedProject;
  } catch (error) {
    throw createHttpError(500, "Failed to add participents");
  }
};

export const getAllMyProjects = async (userId: number) => {
  try {
    const myProjects = prisma.project.findMany({
      where: {
        participants: {
          some: {
            id: userId,
          },
        },
      },
    });

    return myProjects;
  } catch (error) {
    throw createHttpError(500, "Failed to get your projects");
  }
};

export const getProjectsThatCreatedByMe = async (userId: number) => {
  try {
    const myProjects = await prisma.project.findMany({
      where: {
        createdById: userId,
      },
    });

    return myProjects;
  } catch (error) {
    throw createHttpError(500, "Failed to get projects that you craeted");
  }
};

export const projectDone = async (idProp: number) => {
  const isProjectExsist = await prisma.project.findUnique({
    where: { id: idProp },
  });

  if (!isProjectExsist) {
    return null;
  }

  try {
    const projectDone = await prisma.project.update({
      where: {
        id: idProp,
      },
      data: {
        isDone: true,
      },
    });
  } catch (error) {
    throw createHttpError(500, "Failed");
  }
};
