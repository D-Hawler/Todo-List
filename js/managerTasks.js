import { fillingTaskInformation } from "./creatorTask.js";
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete")) {
        const task = event.target.closest(".task");
        if (task) {
            task.remove();
        };
        // task deletion
    };
    // delete from the array
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    if (event.target.classList.contains("edit")) {
        fetch("diologWindow/editTaskDiolog.html")
        .then(response => response.text())
        .then(html => {
            document.body.insertAdjacentHTML("beforeend", html);
            const dialog = document.querySelector("dialog");
            if (dialog) {
                document.body.classList.add("blurred");
                dialog.showModal();
                const task = event.target.closest(".task");
                const taskID = task.id

                fillingTaskInformation(taskID);
            };
            // opens the task edit window
        });
    };
});