import create from "zustand";
import {MainTask, Task} from "./interfaces";

interface Store {
  mainTask: MainTask;
  addTask: (task: Task) => void;
  moveTask: (updatedMainTask: MainTask) => void;
  editTask: (updatedMainTask: MainTask) => void;
  // setTasks: () => void;
  // setInProgress: () => void;
  // setDone: () => void;
}

export const useStore = create<Store>(set => ({
  mainTask: {
    tasks: [],
    inProgress: [],
    done: []
  },
  addTask: (task: Task) => set(state => ({
    mainTask: {
      ...state.mainTask,
      tasks: [...state.mainTask["tasks"], task]
    }
  })),
  moveTask: (updatedMainTask: MainTask) => set(
    {
      mainTask: updatedMainTask
    }
  ),
  editTask: (updatedMainTask: MainTask) => set(
    {
      mainTask: updatedMainTask
    }
  )
}));
