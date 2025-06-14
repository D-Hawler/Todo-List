import { Todo, Project } from "./creatorTask.js";
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
// creating a task in the DOM

function editTaskDOM(taskElement) {
    const taskValue = Todo.getFromID(taskElement);
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
// edit of an existing task

function createListDOM(name) {
    const div = document.createElement("div");
    div.id = name;
    div.classList.add("project");

    const nameList = document.createElement("button");
    nameList.textContent = name;

    div.appendChild(nameList);
    document.querySelector("nav > div:last-of-type").appendChild(div);
};
// list creation in the DOM

function contentFillingForList(nameList) {
    const list = Project.getFromID(nameList);

    createListMemu(nameList);
    if (list !== undefined) {
        for (let i = 0; i < list.elements.length; i++) {
            createTaskDOM(list.elements[i]);
        };
    } else {
        throw Error("For some reason this object is not in the database.");
    };
};
// filling the DOM with tasks from the list

function contentFillingForTask() {
    const article = document.querySelector("article");

    article.replaceChildren();
    
    const task = Todo.globalTodo;

    if (task !== undefined) {
        for (let i = 0; i < task.length; i++) {
            createTaskDOM(task[i]);
        };
    } else {
        throw Error("For some reason this object is not in the database.");
    };
};
// filling the DOM with tasks from all task

function contentFillingForAdd() {
    const nameList = document.querySelector("article .listMemu").id;
    const listID = Project.getIndexFromID(nameList);

    for (let i = 0; i < Todo.globalTodo.length; i++) {
        if (!Project.globalList[listID].elements.some(task => task.id === Todo.globalTodo[i].id)) {
            contentFilling("&#x002B;", "add", i);
        };
    };
};
// filling the DOM with add tasks from the list

function contentFillingForRemove() {
    const nameList = document.querySelector("article .listMemu").id;
    const listID = Project.getIndexFromID(nameList);

    for (let i = 0; i < Todo.globalTodo.length; i++) {
        if (Project.globalList[listID].elements.some(task => task.id === Todo.globalTodo[i].id)) {
            contentFilling("&#x2212;", "remove", i);
        };
    };
};
// filling the DOM with remove tasks from the list

function contentFilling(char, act, i) {
    const dialog = document.querySelector("dialog > :last-child");

    const div = document.createElement("div");
    div.classList.add("task");
    div.id = Todo.globalTodo[i].id;

    const name = document.createElement("div");
    name.classList.add("name");

    const h2 = document.createElement("h2");
    h2.textContent = Todo.globalTodo[i].title;

    const feature = document.createElement("div");
    feature.classList.add("feature");

    const divButton = document.createElement("div");

    const button = document.createElement("button");
    button.classList.add(act);
    button.innerHTML = char;

    const info = document.createElement("div");
    info.classList.add("info");

    const date = document.createElement("h3");
    if (
        Todo.globalTodo[i].dueDate !== "Overdue" &&
        Todo.globalTodo[i].dueDate !== "Indefinitely"
    ) {
        date.textContent = `Until ${Todo.globalTodo[i].dueDate}`;
    } else {
        date.textContent = Todo.globalTodo[i].dueDate;
    }

    const priority = document.createElement("h3");
    priority.textContent = Todo.globalTodo[i].priority;
    priority.classList.add("priorityMenu");
    priority.classList.add(Todo.globalTodo[i].priority.toLowerCase());

    name.appendChild(h2);

    divButton.appendChild(button);

    feature.appendChild(divButton);

    info.appendChild(date);
    info.appendChild(priority);

    feature.appendChild(info);

    div.appendChild(name);
    div.appendChild(feature);

    dialog.appendChild(div);
};
// filling the DOM from the list

function createListMemu(nameList) {
    const article = document.querySelector("#content > article");

    const listMemu = document.createElement("div");
    listMemu.id = nameList;
    listMemu.classList.add("listMemu");

    const div1 = document.createElement("div");

    const title = document.createElement("div");
    title.classList.add("title");

    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.id = "title";
    input.setAttribute("maxlength", "20");
    input.value = nameList;

    const editList = document.createElement("div");
    editList.id = "editList";
    editList.classList.add("interaction");

    const button1 = document.createElement("button");
    button1.id = "editList";
    button1.innerHTML = "&#x2713;";

    const div2 = document.createElement("div");

    const addToList = document.createElement("div");
    addToList.classList.add("interaction");

    const button2 = document.createElement("button");
    button2.id = "addToList";
    button2.innerHTML = "&#x002B;";

    const removeToList = document.createElement("div");
    removeToList.classList.add("interaction");

    const button3 = document.createElement("button");
    button3.id = "removeToList";
    button3.innerHTML = "&#x2212;";

    const deleteToList = document.createElement("div");
    deleteToList.classList.add("interaction");

    const button4 = document.createElement("button");
    button4.id = "deleteToList";
    button4.innerHTML = "&#x1F5D1;";


    editList.appendChild(button1);  

    title.appendChild(input);

    div1.appendChild(title);
    div1.appendChild(editList)

    addToList.appendChild(button2);  

    removeToList.appendChild(button3);

    deleteToList.appendChild(button4);

    div2.appendChild(addToList);
    div2.appendChild(removeToList);
    div2.appendChild(deleteToList);

    listMemu.appendChild(div1);
    listMemu.appendChild(div2);

    article.appendChild(listMemu);
};
// switch to the contents list

export { createTaskDOM, editTaskDOM, createListDOM, contentFillingForList, contentFillingForTask, contentFillingForAdd, contentFillingForRemove };