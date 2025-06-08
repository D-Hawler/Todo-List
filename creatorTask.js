class project {
    forToday = [];
};

class todo {
    globalTodo = [];
    constructor (title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = "";
        this.checklist = false;
    };
};

import { validationCheck } from "./validation.js";
document.querySelector("#createTask button").addEventListener("click", () => {
     fetch("creatorTaskDialog.html")
        .then(response => response.text())
        .then(html => {
            document.body.insertAdjacentHTML("beforeend", html);
            const dialog = document.querySelector("dialog");
            if (dialog) {
                dialog.showModal();
            };
            // opens the task creation window

            document.querySelector("dialog #create").addEventListener("click", (event) => {
                event.preventDefault();

                validationCheck();
            });
            // closes and create the task creation window
        });
});