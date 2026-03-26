import { promises as fs } from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import { ITask } from '@interfaces/task.interface';
import { HttpException } from '@exceptions/HttpException';
import { ExceptionType } from '@exceptions/exceptions.type';

export class TaskService {
  private storagePath = path.resolve(process.cwd(), 'src', 'storage', 'storage.json');

  private async readTasks(): Promise<ITask[]> {
    const data = await fs.readFile(this.storagePath, 'utf-8');
    const tasks: ITask[] = JSON.parse(data);
    return tasks;
  }

  private async writeTasks(tasks: ITask[]): Promise<void> {
    await fs.writeFile(this.storagePath, JSON.stringify(tasks, null, 2));
  }

  async getTasks(): Promise<ITask[]> {
    return this.readTasks();
  }

  async createTask(task: ITask): Promise<ITask> {
    const tasks = await this.readTasks();

    const createdTask: ITask = {
      task_id: randomUUID(),
      title: task.title,
      description: task.description,
      date: task.date,
      status: task.status ?? false,
    };

    tasks.push(createdTask);
    await this.writeTasks(tasks);

    return createdTask;
  }

  async getTaskById(task_id: string): Promise<ITask> {
    const tasks = await this.readTasks();
    const foundTask = tasks.find(task => task.task_id === task_id);

    if (!foundTask) {
      throw new HttpException(404, ExceptionType.DB_TASK_NOT_FOUND);
    }

    return foundTask;
  }

  async updateTask(task_id: string, task: ITask): Promise<ITask> {
    const tasks = await this.readTasks();
    const taskIndex = tasks.findIndex(item => item.task_id === task_id);

    if (taskIndex === -1) {
      throw new HttpException(404, ExceptionType.DB_TASK_NOT_FOUND);
    }

    const updatedTask: ITask = {
      ...tasks[taskIndex],
      ...task,
      task_id,
    };

    tasks[taskIndex] = updatedTask;
    await this.writeTasks(tasks);

    return updatedTask;
  }

  async deleteTask(task_id: string): Promise<ITask> {
    const tasks = await this.readTasks();
    const taskIndex = tasks.findIndex(item => item.task_id === task_id);

    if (taskIndex === -1) {
      throw new HttpException(404, ExceptionType.DB_TASK_NOT_FOUND);
    }

    const [deletedTask] = tasks.splice(taskIndex, 1);
    await this.writeTasks(tasks);

    return deletedTask;
  }

  async updateStatusTask(task_id: string, task: ITask): Promise<ITask> {
    const tasks = await this.readTasks();
    const taskIndex = tasks.findIndex(item => item.task_id === task_id);

    if (taskIndex === -1) {
      throw new HttpException(404, ExceptionType.DB_TASK_NOT_FOUND);
    }

    const updatedTask: ITask = {
      ...tasks[taskIndex],
      status: task.status,
      task_id,
    };

    tasks[taskIndex] = updatedTask;
    await this.writeTasks(tasks);

    return updatedTask;
  }
}
