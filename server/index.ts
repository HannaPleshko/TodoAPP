import App from '@app';
import TaskRoute from '@routes/task.route';

const app = new App([new TaskRoute()]);

app.listen();
