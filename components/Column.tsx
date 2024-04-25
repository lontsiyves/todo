"use client";
import React, { useEffect, useMemo } from "react";
import Task from "./Task";
import { Status, taskStore } from "@/lib/store";

/*
const tasks = [
    {
        id: '1',
        title:'Next 14',
        description: 'Next js 14  course',
        status: 'DONE'
    },
    {
        id: '2',
        title:'TypeScript',
        description: 'TypeScript course',
        status: 'DONE'
    },
    {
        id: '3',
        title:'zustand',
        description: 'Global state management',
        status: 'IN_PROGRESS'
    },
    {
        id: '4',
        title:'Nest Js',
        description: 'Node Js framework',
        status: 'TODO'
    }
]*/
export default function Column({
  title,
  status,
}: {
  title: string;
  status: Status;
}) {
  const tasks = taskStore((state) => state.tasks);
  const filteredTasks = useMemo(
    () => tasks.filter((task) => task.status === status),
    [tasks, status]
  );
  const id = taskStore((state) => state.draggdTask);

  const dragTask = taskStore((state) => state.dragTask);

  const updateTask = taskStore((state) => state.updateTask);

  const handlerDrop = (e: React.DragEvent<HTMLDivElement>) => {
    if (!id) return;
    updateTask(id, status);
    dragTask(null);
  };

  useEffect(() => {
    taskStore.persist.rehydrate();
  }, []);

  return (
    <section className="h-[600px] flex-1">
      <h2 className="ml-1 font-serif text-2xl font-semibold">{title}</h2>
      <div
        className="mt-3.5 h-full w-full flex-1 rounded-lg bg-gray-700/50"
        onDrop={handlerDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className="flex flex-col gap-4">
          {filteredTasks.map((task) => (
            <Task key={task.id} {...task} />
          ))}
        </div>
      </div>
    </section>
  );
}
