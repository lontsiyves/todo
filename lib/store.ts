import Task from "@/components/Task";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from 'uuid';

export type Status = "TODO" | "IN_PROGRESS" | "DONE";

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: Status;
};

export type State = {
  tasks: Task[];
  draggdTask: string | null;
};

export type Action = {
  addTask: (title: string, description?: string) => void;
  removeTask: (id: string) => void;
  dragTask: (id: string | null) => void;
  updateTask: (id: string, status: Status) => void;
};

export const taskStore = create<State & Action>()(
  persist(
    (set) => ({
      tasks: [],
      draggdTask: null,
      addTask: (title: string, description?: string) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            { id: uuidv4(), title, description, status: "TODO" },
          ],
        })),
      removeTask: (id: string) =>
        set((state) => ({
          tasks: state.tasks.filter((p) => p.id !== id),
        })),
      dragTask: (id: string | null) => set({ draggdTask: id }),
      updateTask: (id: string, status: Status) =>
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === id ? { ...t, status } : t)),
        })),
    }),
    { name: "task-store", skipHydration: true }
  )
);
