import { Todo } from "./creatorTask.js";
import { editTaskDOM, contentFillingForList, contentFillingForTask } from "./createDOM.js";
import { validationCheck } from "./validation.js";

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete")) {
        const taskElement = event.target.closest(".task");
        if (taskElement) {
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

        console.log("DD");
    };


});










// 1. открытие карточки task при нажатии на неё.
// 2. Local storeg.
// 3. листы и их менеджмент.
// 4. фильтр.






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
    const task = getIndexFromID(taskElement);
    const value = getValueDialogForm();

    Todo.globalTodo[task].title = value[0];
    Todo.globalTodo[task].description = value[1];
    Todo.globalTodo[task].dueDate = value[2];
    Todo.globalTodo[task].priority = value[3];
};
// editing task data in the database


document.querySelector("#allTask button").addEventListener("click", () => {
    const article = document.querySelector("article");

    article.replaceChildren();
    contentFillingForTask();
});



// function fillingListInformation(list) {
//     const form = document.querySelector("form");
//     form.elements["title"].value = list.id;
// };

// fetch("diologWindow/editListDiolog.html")
//         .then(response => response.text())
//         .then(html => {
//             document.body.insertAdjacentHTML("beforeend", html);
//             const dialog = document.querySelector("dialog");

//             if (dialog) {
//                 document.body.classList.add("blurred");
//                 dialog.showModal();
//                 dialog.addEventListener("keydown", function(event) {
//                     if (event.key === "Escape" || event.key === "Enter") {
//                         event.stopPropagation();
//                         event.preventDefault();
//                     }
//                 }, true);
//                 fillingListInformation(projectDiv);
//             };
//         });
//     };
// opens the list edit window



// document.getElementById("taskFromList").addEventListener("click", () => {});




export { getValueDialogForm };