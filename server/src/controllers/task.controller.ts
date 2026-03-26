import { Request, Response, NextFunction } from 'express';
import { TaskService } from '@services/task.service';
import { buildResponse } from '@helper/response';

class TaskController {
  private taskService = new TaskService();

  getTasks = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      buildResponse(res, 200, await this.taskService.getTasks());
    } catch (error) {
      next(error);
    }
  };

  updateStatusTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { task_id } = req.params;
      const task = req.body;
      buildResponse(res, 200, await this.taskService.updateStatusTask(task_id, task));
    } catch (error) {
      next(error);
    }
  };

  getTaskById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { task_id } = req.params;
      buildResponse(res, 200, await this.taskService.getTaskById(task_id));
    } catch (error) {
      next(error);
    }
  };

  createTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const task = req.body;
      buildResponse(res, 201, await this.taskService.createTask(task));
    } catch (error) {
      next(error);
    }
  };

  updateTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { task_id } = req.params;
      const task = req.body;
      buildResponse(res, 200, await this.taskService.updateTask(task_id, task));
    } catch (error) {
      next(error);
    }
  };

  deleteTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { task_id } = req.params;
      buildResponse(res, 200, await this.taskService.deleteTask(task_id));
    } catch (error) {
      next(error);
    }
  };
}

export default TaskController;
