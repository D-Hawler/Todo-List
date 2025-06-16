import "./managerTasks.js";
import { Todo, Project } from "./creatorTask.js";
import { contentFillingForTask, createListDOM } from "./createDOM.js";

const globalData = [Todo.globalTodo, Project.globalList];

window.addEventListener("beforeunload", () => {
    localStorage.setItem("all", JSON.stringify(globalData));
});

window.addEventListener("DOMContentLoaded", () => {
    const all = JSON.parse(localStorage.getItem("all") || "[]");

    all[0]?.forEach(task => {
        const value = new Todo(task.title, task.description, task._dueDate, task.priority, task.ID);
        Todo.addArrTodo(value);
    });
    all[1]?.forEach(list => {
        const value = new Project(list.name, list.elements);
        Project.addList(value);
    });

    (function() {
        console.log(Todo.globalTodo.length);
        console.log(Todo.globalTodo);
        if (Todo.globalTodo.length > 0) {
            console.log(Todo.globalTodo.length);
            contentFillingForTask();
        };

        Project.globalList.forEach(list => createListDOM(list.name));


        console.log(globalData);
        console.log(all);
        console.log(Todo.globalTodo);
        console.log(Project.globalList);
    })();
});