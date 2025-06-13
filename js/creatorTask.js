import { getValueDialogForm } from "./managerTasks.js";
import { createTaskDOM, createListDOM } from "./createDOM.js";
import { validationCheck, validationCheckForList } from "./validation.js";
import { parseISO, format, isBefore } from "https://esm.sh/date-fns";
class Project {
    static globalList = [{"name": "forToday", "elements": []}];
    constructor(name) {
        this.name = name;
        this.elements = [];
    };


    static getFromID(listElement) {
        return Project.globalList.find(list => list.name === listElement);
    };
    // finds an object by ID in the global list

    static getIndexFromID(listElement) {
        return Project.globalList.findIndex(list => list.name === listElement);
    };
    // finds an index object by its identifier in the global list

    static addList(list) {
        Project.globalList.push(list);
        Project.globalList.sort((a, b) => a.name.localeCompare(b.name));
    };
    // adding to the list and sort array

    static removeList(list) {
        const listIndex = Project.getFromID(list);
        if (list !== -1) {
            Project.globalList.splice(listIndex, 1);
        } else {
            throw Error("For some reason this object is not in the database.");
        };
    };
    // deletion into the list and sort array
};

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


    static getFromID(taskElement) {
        return Todo.globalTodo.find(task => task.id === taskElement.id);
    };
    // finds an object by ID in the global task list

    static getIndexFromID(taskElement) {
        return Todo.globalTodo.findIndex(task => task.id === taskElement.id);
    };
    // finds an index object by its identifier in the global task list

    static addArrTodo(taskElement) {
        Todo.globalTodo.push(taskElement);
    };
    // adding to the task array

    static removeArrTodo(taskElement) {
        const taskIndex = Todo.getFromID(taskElement);
        if (taskIndex !== -1) {
            Todo.globalTodo.splice(taskIndex, 1);
        } else {
            throw Error("For some reason this object is not in the database.");
        };
    };
    // deletion into the task array
};


const globalData = [Todo.globalTodo, Project.globalList];


document.querySelector("#createTask button").addEventListener("click", () => {
     fetch("diologWindow/creatorTaskDialog.html")
        .then(response => response.text())
        .then(html => {
            document.body.insertAdjacentHTML("beforeend", html);
            const dialog = document.querySelector("dialog");
            if (dialog) {
                document.body.classList.add("blurred");
                dialog.show();
                dialog.addEventListener("keydown", function(event) {
                    if (event.key === "Escape" || event.key === "Enter") {
                        event.stopPropagation();
                        event.preventDefault();
                    };
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


function createTask() {
    const value = getValueDialogForm();

    const taskElement = new Todo(value[0], value[1], value[2], value[3]);
    Todo.addArrTodo(taskElement);

    const listMenu = document.querySelector("article > .listMemu");
    if (!listMenu) {
        createTaskDOM(taskElement);
    };
};
// creates an instance of a class (task)

document.getElementById("createTaskList").addEventListener("click", () => {
    fetch("diologWindow/createListDiolog.html")
        .then(response => response.text())
        .then(html => {
            document.body.insertAdjacentHTML("beforeend", html);
            const dialog = document.querySelector("dialog");

            if (dialog) {
                document.body.classList.add("blurred");
                dialog.show();
                dialog.addEventListener("keydown", function(event) {
                    if (event.key === "Escape" || event.key === "Enter") {
                        event.stopPropagation();
                        event.preventDefault();
                    }
                }, true);
                // opens the list creation window


                document.getElementById("createList").addEventListener("click", (event) => {
                    const form = document.querySelector("form");

                    if (validationCheckForList()) {
                        const list = new Project(form.elements["title"].value);

                        Project.addList(list);
                        createListDOM(list.name);

                        document.body.classList.remove("blurred");
                        dialog.remove();
                    };
                });
                // closes and create the list creation window
            };
        });
});






(function() {
    // Example usage: Add tasks to the default 'forToday' project
    const forTodayProject = Project.globalList[0];
    forTodayProject.elements.push(new Todo("Buy groceries", "Get milk, bread, and eggs", "2025-06-15", "Normal"));
    forTodayProject.elements.push(new Todo("Finish project", "Complete frontend and submit for review", "2025-06-20", "Normal"));
    forTodayProject.elements.push(new Todo("Call the doctor", "Schedule an appointment for next week", "2025-06-13", "Normal"));
    forTodayProject.elements.push(new Todo("Clean the apartment", "Vacuum and mop the floors", "2025-06-14", "Normal"));
})();




export { Todo, Project };