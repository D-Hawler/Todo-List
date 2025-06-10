function createTaskDOM(taskElement) {
    const article = document.querySelector("article");

    const main = document.createElement("div");
    main.classList.add("task");
    main.id = taskElement.id;

    const name = document.createElement("div");
    name.classList.add("name");

    const input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.setAttribute("name", "completed");

    const title = document.createElement("h2");
    title.textContent = taskElement.title;

    const feature = document.createElement("div");
    feature.classList.add("feature");

    const buttons = document.createElement("div");

    const icon = [
        {icon : `&#x2606;`, class: "favorite"},
        {icon : `&#128393;`, class: "edit"},
        {icon : `&#x1F5D1;`, class: "delete"}
    ];
    for (let i = 0; i < icon.length; i++) {
        const button = document.createElement("button");
        button.innerHTML = icon[i].icon;
        button.classList.add(icon[i].class);

        buttons.appendChild(button);
    };

    const info = document.createElement("div");
    info.classList.add("info");

    const date = document.createElement("h3");
    if (taskElement.dueDate !== "Overdue" && taskElement.dueDate !== "Indefinitely") {
        date.textContent = `Until ${taskElement.dueDate}`;
    } else {
        date.textContent = taskElement.dueDate;
    };

    const priority = document.createElement("h3");
    priority.textContent = taskElement.priority;
    priority.classList.add("priorityMenu");
    priority.classList.add(taskElement.priority.toLowerCase());

    name.appendChild(input);
    name.appendChild(title);

    info.appendChild(date);
    info.appendChild(priority);

    feature.appendChild(buttons);
    feature.appendChild(info);

    main.appendChild(name);
    main.appendChild(feature);

    article.appendChild(main);
};

import { getFromID } from "./creatorTask.js";
function editTaskDOM(taskElement) {
    const taskValue = getFromID(taskElement);
    const taskDiv = document.getElementById(taskValue.id);

    if (!taskDiv) {
        throw Error("for some reason the task was not found in the task list");
    };

    const title = taskDiv.querySelector(".name h2");
    title.textContent = taskValue.title;

    const date = taskDiv.querySelector(".info h3");
    if (taskValue.dueDate !== "Overdue" && taskValue.dueDate !== "Indefinitely") {
        date.textContent = `Until ${taskValue.dueDate}`;
    } else {
        date.textContent = taskValue.dueDate;
    };

    const priority = taskDiv.querySelector(".info .priorityMenu");
    priority.textContent = taskValue.priority;
    if (priority.classList.length > 1) {
        priority.classList.remove(priority.classList[1]);
    };
    priority.classList.add(taskValue.priority.toLowerCase());
};

export { createTaskDOM, editTaskDOM };