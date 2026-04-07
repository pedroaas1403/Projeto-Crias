import { type NewTaskData, type Tasks } from "./task/task.model";
import {Injectable} from "@angular/core";


@Injectable({providedIn: 'root'})
export class TasksService {
  private readonly storageKey = 'crias.tasks';
  private tasks: Tasks[] = this.loadTasks();

  private loadTasks(): Tasks[] {
    const storedTasks = globalThis.localStorage?.getItem(this.storageKey);

    if (!storedTasks) {
      return [];
    }

    try {
      return JSON.parse(storedTasks) as Tasks[];
    } catch {
      return [];
    }
  }

  private saveTasks() {
    globalThis.localStorage?.setItem(this.storageKey, JSON.stringify(this.tasks));
  }

  getUserTasks(userId: string) {
    return this.tasks.filter(task => task.userId === userId);
  }

  addTask(taskData: NewTaskData, userId: string ) {
    this.tasks.unshift({
      id: new Date().getTime().toString(),
      userId: userId,
      title: taskData.title,
      summary: taskData.summary,
      dueDate: taskData.date
    });

    this.saveTasks();
  }

  removeTask(id: string) {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.saveTasks();
  }
}
