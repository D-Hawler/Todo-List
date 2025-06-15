import "./managerTasks.js";
import { Todo, Project } from "./creatorTask.js";
import { contentFillingForTask, createListDOM } from "./createDOM.js";

const globalData = [Todo.globalTodo, Project.globalList];

window.addEventListener("beforeunload", () => {
    localStorage.setItem("all", JSON.stringify(globalData));
});

window.addEventListener("DOMContentLoaded", () => {
    const all = JSON.parse(localStorage.getItem("all") || "[]");

    all[0].map(task => Todo.globalTodo.push(new Todo(task.title, task.description, task._dueDate, task.priority)));
    all[1].map(list => Project.globalList.push(new Project(list.name)));
    all[1].map(list => {
        for (let i = 0; i < list.length; i++) {
            const taskIndex = Todo.getIndexFromID(list.elements[i]);
            list.addList(Todo.globalTodo[taskIndex]);
            // тут баг!!
        };
    });

    (function() {
        contentFillingForTask();

        Project.globalList.forEach(list => createListDOM(list.name));


        console.log(globalData);
        console.log(all)
    })();
});