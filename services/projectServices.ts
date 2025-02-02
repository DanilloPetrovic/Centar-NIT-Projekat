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
        deadline: dataProps.deadline ? new Date(dataProps.deadline) : null,
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
  const isProjectExsist = await prisma.project.findFirst({
    where: { id: idProp, isDeleted: false },
  });

  if (!isProjectExsist) {
    return null;
  }

  try {
    const deletedProject = await prisma.project.update({
      where: { id: idProp },
      data: {
        isDeleted: true,
      },
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

export const getAllProjectsNoFilter = async (userId: number) => {
  try {
    const noFilterProjects = await prisma.project.findMany({
      where: {
        isDeleted: false,
        participants: {
          some: {
            id: userId,
          },
        },
      },

      include: {
        createdBy: true,
        participants: true,
      },
    });

    return noFilterProjects;
  } catch (error) {
    throw createHttpError(500, "Failed");
  }
};

export const getAllMyProjects = async (userId: number) => {
  try {
    const myProjects = await prisma.project.findMany({
      where: {
        isDeleted: false,
        participants: {
          some: {
            id: userId,
          },
        },
        NOT: { createdById: userId },
      },

      include: {
        createdBy: true,
        participants: true,
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
        isDeleted: false,
        createdById: userId,
      },

      include: {
        createdBy: true,
        participants: true,
      },
    });

    return myProjects;
  } catch (error) {
    throw createHttpError(500, "Failed to get projects that you craeted");
  }
};

export const getSingleProject = async (idProp: number) => {
  try {
    const project = await prisma.project.findUnique({
      where: {
        id: idProp,
      },
      include: {
        createdBy: true,
        participants: true,
        tasks: true,
      },
    });

    return project;
  } catch (error) {
    throw createHttpError(500, "Failed");
  }
};

export const getProjectTasks = async (idProp: number) => {
  try {
    const tasks = await prisma.task.findMany({
      where: {
        projectId: idProp,
      },
    });

    return tasks;
  } catch (error) {
    throw createHttpError(500, "Failed");
  }
};

export const projectDone = async (idProp: number) => {
  const isProjectExsist = await prisma.project.findFirst({
    where: { id: idProp, isDeleted: false },
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

    return projectDone;
  } catch (error) {
    throw createHttpError(500, "Failed");
  }
};
