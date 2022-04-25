export interface MainTask {
  // tasks: Task[],
  // inProgress: Task[],
  // done: Task[]
  [key: string]: Task[]
}
export interface Task {
  id: string,
  title: string
}

export interface Entity {
  id: string;
  title: string;
  color: string;
}

export interface EditTaskModalData {
  taskId: string;
  entityId: string;
  taskValue: string;
}
