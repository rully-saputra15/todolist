import create from "zustand";
import {MainTask, Task} from "./interfaces";

interface Store {
  mainTask: MainTask;
  addTask: (task: Task) => void;
  updateTask: (updatedMainTask: MainTask) => void;
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
  updateTask: (updatedMainTask: MainTask) => set(
    {
      mainTask: updatedMainTask
    }
  ),
}));
