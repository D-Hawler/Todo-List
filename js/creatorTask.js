import { getValueDialogForm } from "./managerTasks.js";
import { createTaskDOM, createListDOM } from "./createDOM.js";
import { validationCheck, validationCheckForList } from "./validation.js";
import { parseISO, format, isBefore, isValid } from "https://esm.sh/date-fns";
class Project {
    static globalList = [];
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

    static importElements(list) {
        const listID = Project.getFromID(list.name);
        list.elements.forEach(element => listID.elements.push(element));
    };
    // to import from localStorage
};

class Todo {
    static globalTodo = [];
    #ID;
    constructor (title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.list = undefined;
        this.#ID = crypto.randomUUID();
    };

    set dueDate(value) {
        if (value === "Overdue" || value === "Indefinitely") {
            this._dueDate = value;
            return;
        };

        const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;
        if (typeof value === "string" && isoDatePattern.test(value)) {
            const dateObj = parseISO(value);
            if (isValid(dateObj)) {
                const today = new Date();
                const valueDate = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate());
                const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

                if (!isBefore(valueDate, todayDate)) {
                    this._dueDate = format(dateObj, "dd.MM.yyyy");
                } else {
                    this._dueDate = "Overdue";
                };
                return;
            };
        };

        const formattedPattern = /^\d{2}\.\d{2}\.\d{4}$/;
        if (typeof value === "string" && formattedPattern.test(value)) {
            this._dueDate = value;
            return;
        };

        this._dueDate = "Indefinitely";
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

    static addTodoToList(listName, taskElement) {
        listName.elements.push(taskElement);
        taskElement.list = listName;
    };
    // adding to the task to the list

    static removeArrTodo(taskElement) {
        const taskIndex = Todo.getIndexFromID(taskElement);
        if (taskIndex !== -1) {
            Todo.globalTodo.splice(taskIndex, 1);
        } else {
            throw Error("For some reason this object is not in the database.");
        };
    };
    // deletion into the task array
};


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


export { Todo, Project };