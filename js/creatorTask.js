class Project {
    forToday = [];
};

import { parseISO, parse, format, isBefore } from "https://esm.sh/date-fns";
class Todo {
    static globalTodo = [];
    #ID;
    constructor (title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = "";
        this.checklist = false;
        this.#ID = crypto.randomUUID();
    };

    set dueDate(value) {
        if (value !== "") {
            value = parseISO(value);
            const today = new Date();

            if (!isBefore(value, today)) {
                this._dueDate = format(value, "dd MM yyyy");
            } else {
                this._dueDate = "Overdue";
            };
        } else {
            this._dueDate = "Indefinitely";
        };
    };
    get dueDate() {
        return this._dueDate;
    };

    get ID() {
        return this.#ID;
    };
};

import { validationCheck } from "./validation.js";
document.querySelector("#createTask button").addEventListener("click", () => {
     fetch("diologWindow/creatorTaskDialog.html")
        .then(response => response.text())
        .then(html => {
            document.body.insertAdjacentHTML("beforeend", html);
            const dialog = document.querySelector("dialog");
            if (dialog) {
                document.body.classList.add("blurred");
                dialog.showModal();
            };
            // opens the task creation window

            document.querySelector("dialog #create").addEventListener("click", (event) => {
                event.preventDefault();

                const dialog = document.querySelector("dialog");
                const valid = validationCheck();
                if (valid) {
                    createTask();
                    document.body.classList.remove("blurred");

                    dialog.remove();
                };
            });
            // closes and create the task creation window
        });
});


import { createTaskDOM } from "./createDOM.js";
function createTask() {
    const title = document.querySelector("dialog #title");
    const description = document.querySelector("dialog #description");
    const dueDate = document.querySelector("dialog #dueDate");
    const priority = document.querySelector("dialog #priority");

    const task = new Todo(title.value, description.value, dueDate.value, priority.value);
    addArrTodo(task);
    createTaskDOM(task);
};
// creates an instance of a class (task)

function addArrTodo(task) {
    Todo.globalTodo.push(task);
};
// adding to the task array



function fillingTaskInformation(taskID) {
    const task = Todo.globalTodo.find(task => task.ID === taskID);
    const form = document.querySelector("form");
    const date = parse(task.dueDate, "dd MM yyyy", new Date());

    form.elements["title"].value = task.title;
    form.elements["description"].value = task.description;
    form.elements["dueDate"].value = format(date, "yyyy-MM-dd");
    form.elements["priority"].value = task.priority;



//To make:
// 1. check whether the object is found by the ID or not
// 2. for the date when it is indefinite or expired






};
export { fillingTaskInformation };