import { Request, Response } from "express";
import * as projectService from "../services/projectServices";

export const createProject = async (req: Request, res: Response) => {
  const { title, description, createdById, participants, deadline } = req.body;

  const project = await projectService.createProject({
    title,
    description,
    createdById,
    participants,
    deadline,
  });

  res.status(201).json(project);
};

export const updateProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, deadline } = req.body;

  const updatedProject = await projectService.updateProject(Number(id), {
    title,
    description,
    deadline,
  });

  res.status(201).json(updatedProject);
};

export const deleteProject = async (req: Request, res: Response) => {
  const { id } = req.params;

  const deletedProject = await projectService.deleteProject(Number(id));

  res.status(201).json(deletedProject);
};

export const updateParticipent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { add, remove } = req.body;

  const updatedProject = await projectService.updateParticipent(Number(id), {
    add,
    remove,
  });

  res.status(201).json(updatedProject);
};

export const getAllProjectsNoFilter = async (req: Request, res: Response) => {
  const { id } = req.params;

  const myProjects = await projectService.getAllProjectsNoFilter(Number(id));

  res.status(201).json(myProjects);
};

export const getAllMyProjects = async (req: Request, res: Response) => {
  const { id } = req.params;

  const myProjects = await projectService.getAllMyProjects(Number(id));

  res.status(201).json(myProjects);
};

export const getProjectsThatCreatedByMe = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  const myProjects = await projectService.getProjectsThatCreatedByMe(
    Number(id)
  );

  res.status(201).json(myProjects);
};

export const getSingleProject = async (req: Request, res: Response) => {
  const { id } = req.params;

  const project = await projectService.getSingleProject(Number(id));

  res.status(201).json(project);
};

export const projectDone = async (req: Request, res: Response) => {
  const { id } = req.params;

  const projectDone = await projectService.projectDone(Number(id));

  res.status(201).json(projectDone);
};
