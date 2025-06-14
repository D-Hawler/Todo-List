import { Project, Todo } from "./creatorTask.js";
import { editTaskDOM, contentFillingForList, contentFillingForTask, contentFillingForAdd, contentFillingForRemove } from "./createDOM.js";
import { validationCheck, validationCheckForEditList } from "./validation.js";

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete")) {
        const taskElement = event.target.closest(".task");

        const task = Todo.getFromID(taskElement);
        if (taskElement) {
            if (task.list !== undefined) {
                task.list.elements.splice(task, 1);
            };
            Todo.removeArrTodo(taskElement);
            taskElement.remove();
        };
    };
    // task deletion

    if (event.target.classList.contains("edit")) {
        fetch("diologWindow/editTaskDiolog.html")
        .then(response => response.text())
        .then(html => {
            document.body.insertAdjacentHTML("beforeend", html);
            const dialog = document.querySelector("dialog");
            const taskElement = event.target.closest(".task");
            if (dialog) {
                document.body.classList.add("blurred");
                dialog.showModal();
                dialog.addEventListener("keydown", function(event) {
                    if (event.key === "Escape" || event.key === "Enter") {
                        event.stopPropagation();
                        event.preventDefault();
                    }
                }, true);
                fillingTaskInformation(taskElement);
            };
            // opens the task edit window

            document.querySelector("dialog #edit").addEventListener("click", (event) => {
                event.preventDefault();

                const dialog = document.querySelector("dialog");
                const valid = validationCheck();
                if (valid) {
                    setNewTaskData(taskElement);
                    editTaskDOM(taskElement);

                    document.body.classList.remove("blurred");
                    dialog.remove();
                };
            });
            // closes and edit the task
        });
    };

    const projectDiv = event.target.closest(".project");
    if (projectDiv && event.target.tagName === "BUTTON") {
        const article = document.querySelector("article");
        article.replaceChildren();
        contentFillingForList(projectDiv.id);
    };
    // list opening

    if (event.target.id.includes("editList")) {
        const oldListDiv = document.querySelector("article > div");
        const oldListName = oldListDiv.id;
        const targetListName = document.getElementById("title").value;
        const listName = document.querySelector(`nav > div:last-child > #${oldListName}`);

        const valid = validationCheckForEditList();
        if (listName) {
            if (valid) {
                listName.querySelector("button").textContent = targetListName;
                listName.id = targetListName;

                oldListDiv.id = targetListName;
                Project.getFromID(oldListName).name = targetListName;
            };
        } else {
            throw Error("For some reason this object is not in the database.");
        };
    };
    // edit list name

    if (event.target.id.includes("addToList")) {
        fetch("diologWindow/additionToTheList.html")
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
                // opens a dialog box for adding new tasks

                contentFillingForAdd();

                document.querySelectorAll("dialog .add").forEach(element => element.addEventListener("click", (event) => {
                    const taskID = event.target.closest(".task");

                   const nameList = document.querySelector("article .listMemu").id;
                   const taskIndex = Todo.getIndexFromID(taskID);

                   if (taskIndex !== -1) {
                        Todo.addTodoToList(Project.getFromID(nameList), Todo.getFromID(taskID));
                        Todo.globalTodo[taskIndex].list = nameList;
                        taskID.remove();
                   } else {
                        throw Error("For some reason this object is not in the database.");
                   };
                }));
                // add tasks for the list
            };

            document.querySelector("dialog #close").addEventListener("click", () => {
                document.body.classList.remove("blurred");
                dialog.remove();

                const nameList = document.querySelector("article .listMemu").id;
                const article = document.querySelector("article");
                article.replaceChildren();
                contentFillingForList(nameList);
            });
            // closes a dialog box for adding new tasks
        });
    };

    if (event.target.id.includes("removeToList")) {
        fetch("diologWindow/additionToTheList.html")
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
                // opens a dialog box for remove tasks

                contentFillingForRemove();

                document.querySelectorAll("dialog .remove").forEach(element => element.addEventListener("click", (event) => {
                    const taskID = event.target.closest(".task");

                   const nameList = document.querySelector("article .listMemu").id;
                   const list = Project.getFromID(nameList);
                   const taskIndex = Todo.getFromID(taskID);

                   if (taskIndex !== -1) {
                        list.elements.splice(taskIndex, 1);
                        taskID.remove();
                   } else {
                        throw Error("For some reason this object is not in the database.");
                   };
                }));
                // remove tasks for the list
            };

            document.querySelector("dialog #close").addEventListener("click", () => {
                document.body.classList.remove("blurred");
                dialog.remove();

                const nameList = document.querySelector("article .listMemu").id;
                const article = document.querySelector("article");
                article.replaceChildren();
                contentFillingForList(nameList);
            });
            // closes a dialog box for adding new tasks
        });
    };

    if (event.target.id.includes("deleteToList")) {
        const oldListName = document.querySelector("article > div").id;
        const listName = document.querySelector(`nav > div:last-child > #${oldListName}`); 

        if (oldListName && listName) {
            Project.removeList(oldListName);
            listName.remove();
            
            contentFillingForTask();
        } else {
            throw Error("For some reason this object is not in the database.");
        };
    };
    // delete list
});

import { parse, format } from "https://esm.sh/date-fns";
function fillingTaskInformation(taskElement) {
    const task = Todo.getFromID(taskElement);
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

function getValueDialogForm() {
    const title = document.querySelector("dialog #title");
    const description = document.querySelector("dialog #description");
    const dueDate = document.querySelector("dialog #dueDate");
    const priority = document.querySelector("dialog #priority");

    return [title.value, description.value, dueDate.value, priority.value];
};
// returns the value of the form to be filled in

function setNewTaskData(taskElement) {
    const task = Todo.getIndexFromID(taskElement);
    const value = getValueDialogForm();

    Todo.globalTodo[task].title = value[0];
    Todo.globalTodo[task].description = value[1];
    Todo.globalTodo[task].dueDate = value[2];
    Todo.globalTodo[task].priority = value[3];
};
// editing task data in the database


document.querySelector("#allTask button").addEventListener("click", () => {
    contentFillingForTask();
});

export { getValueDialogForm };