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
        this.checklist = false;
        this.#ID = crypto.randomUUID();
    };

    set dueDate(value) {
        if (value !== "") {
            value = parseISO(value);
            const today = new Date();
            const valueDate = new Date(value.getFullYear(), value.getMonth(), value.getDate());
            const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

            if (!isBefore(valueDate, todayDate)) {
                this._dueDate = format(value, "dd.MM.yyyy");
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

    get id() {
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
                dialog.addEventListener("keydown", function(event) {
                    if (event.key === "Escape" || event.key === "Enter") {
                        event.stopPropagation();
                        event.preventDefault();
                    }
                }, true);
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
    const value = getValueDialogForm();

    const taskElement = new Todo(value[0], value[1], value[2], value[3]);
    addArrTodo(taskElement);
    createTaskDOM(taskElement);
};
// creates an instance of a class (task)

function addArrTodo(taskElement) {
    Todo.globalTodo.push(taskElement);
};
// adding to the task array

function removeArrTodo(taskElement) {
    const taskIndex = getFromID(taskElement);
    if (taskIndex !== -1) {
        Todo.globalTodo.splice(taskIndex, 1);
    } else {
        throw Error("For some reason this object is not in the database.");
    }
};
// deletion into the task array





// перенос функциий? export { Todo };??
// globalTodo = [{todo}{listTodo}];

// 1. открытие карточки task при нажатии на неё.
// 2. Local storeg.
// 3. листы и их менеджмент.


function fillingTaskInformation(taskElement) {
    const task = getFromID(taskElement);
    if (task !== undefined) {
        const form = document.querySelector("form");

        if (task.dueDate !== "Overdue" && task.dueDate !== "Indefinitely") {
            const date = parse(task.dueDate, "dd.MM.yyyy", new Date());
            form.elements["dueDate"].value = format(date, "yyyy-MM-dd");
        };

        form.elements["title"].value = task.title;
        form.elements["description"].value = task.description;
        form.elements["priority"].value = task.priority;
    } else {
        throw Error("For some reason this object is not in the database.");
    };
};
// filling in the form for editing a task









function getFromID(taskElement) {
    return Todo.globalTodo.find(task => task.id === taskElement.id);
};
// finds an object by ID in the global task list
function getIndexFromID(taskElement) {
    return Todo.globalTodo.findIndex(task => task.id === taskElement.id);
};
// finds an index object by its identifier in the global task list

function getValueDialogForm() {
    const title = document.querySelector("dialog #title");
    const description = document.querySelector("dialog #description");
    const dueDate = document.querySelector("dialog #dueDate");
    const priority = document.querySelector("dialog #priority");

    return [title.value, description.value, dueDate.value, priority.value];
};
// returns the value of the form to be filled in


function setNewTaskData(taskElement) {
    const task = getIndexFromID(taskElement);
    const value = getValueDialogForm();

    Todo.globalTodo[task].title = value[0];
    Todo.globalTodo[task].description = value[1];
    Todo.globalTodo[task].dueDate = value[2];
    Todo.globalTodo[task].priority = value[3];
};
// editing task data in the database

export { fillingTaskInformation, removeArrTodo, getFromID, getIndexFromID, setNewTaskData, getValueDialogForm};