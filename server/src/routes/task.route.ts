import { Router } from 'express';
import { IRoutes } from '@interfaces';
import TaskController from '@controllers/task.controller';

class TaskRoute implements IRoutes {
  public path = '/task';

  public router = Router();
  public taskController = new TaskController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(`${this.path}`, this.taskController.getTasks);
    this.router.patch(`${this.path}/:task_id`, this.taskController.updateStatusTask);
    this.router.get(`${this.path}/:task_id`, this.taskController.getTaskById);
    this.router.post(`${this.path}`, this.taskController.createTask);
    this.router.put(`${this.path}/:task_id`, this.taskController.updateTask);
    this.router.delete(`${this.path}/:task_id`, this.taskController.deleteTask);
  }
}

export default TaskRoute;
