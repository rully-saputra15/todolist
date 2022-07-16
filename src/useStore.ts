import create from "zustand";
import {MainTask, Task} from "./interfaces";
import {persist} from "zustand/middleware";

interface Store {
  mainTask: MainTask;
  addTask: (task: Task) => void;
  updateTask: (updatedMainTask: MainTask) => void;
  // setTasks: () => void;
  // setInProgress: () => void;
  // setDone: () => void;
}

export const useStore = create<Store>(persist((set, get) => ({
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
      )
    }),
    {
      name: "todolist"
    })
);
