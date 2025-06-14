import { getValueDialogForm } from "./managerTasks.js";
import { createTaskDOM, createListDOM, contentFillingForTask } from "./createDOM.js";
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
        this.list = undefined;
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
    const todo1 = new Todo("Task 1", "Description 1", "2025-06-15", "Normal");
    const todo2 = new Todo("Task 2", "Description 2", "2025-06-16", "Priority");
    const todo3 = new Todo("Task 3", "Description 3", "2025-06-17", "Urgently");
    const todo4 = new Todo("Task 4", "Description 4", "2025-06-18", "Normal");
    const todo5 = new Todo("Task 5", "Description 5", "2025-06-19", "Priority");
    const todo6 = new Todo("Task 6", "Description 6", "2025-06-20", "Urgently");
    const todo7 = new Todo("Task 7", "Description 7", "2025-06-21", "Normal");
    const todo8 = new Todo("Task 8", "Description 8", "2025-06-22", "Priority");
    const todo9 = new Todo("Task 9", "Description 9", "2025-06-23", "Urgently");
    const todo10 = new Todo("Task 10", "Description 10", "2025-06-24", "Normal");
    const todo11 = new Todo("Task 11", "Description 11", "2025-06-25", "Priority");
    const todo12 = new Todo("Task 12", "Description 12", "2025-06-26", "Urgently");

    Todo.addArrTodo(todo1);
    Todo.addArrTodo(todo2);
    Todo.addArrTodo(todo3);
    Todo.addArrTodo(todo4);
    Todo.addArrTodo(todo5);
    Todo.addArrTodo(todo6);
    Todo.addArrTodo(todo7);
    Todo.addArrTodo(todo8);
    Todo.addArrTodo(todo9);
    Todo.addArrTodo(todo10);
    Todo.addArrTodo(todo11);
    Todo.addArrTodo(todo12);

    Todo.addTodoToList(Project.globalList[0], todo2);
    Todo.addTodoToList(Project.globalList[0], todo4);
    Todo.addTodoToList(Project.globalList[0], todo9);
    Todo.addTodoToList(Project.globalList[0], todo12);
})();



(function() {
    contentFillingForTask();
})();

export { Todo, Project };