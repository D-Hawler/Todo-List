import { fillingTaskInformation, removeArrTodo, setNewTaskData, getValueDialogForm } from "./creatorTask.js";
import { editTaskDOM } from "./createDOM.js";
import { validationCheck } from "./validation.js";

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete")) {
        const taskElement = event.target.closest(".task");
        if (taskElement) {
            removeArrTodo(taskElement);
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
            // closes and create the task creation window
        });
    };
});