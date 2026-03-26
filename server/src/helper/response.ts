import { ITask } from '@interfaces/task.interface';
import { Response } from 'express';

type message = ITask | ITask[];

const buildResponse = (res: Response, status: number, message: message) => {
  res.status(status);
  res.send(message);
};

export { buildResponse };
