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


function createListDOM(name) {
    const div = document.createElement("div");
    div.id = name;
    div.classList.add("project");

    const nameList = document.createElement("button");
    nameList.textContent = name;

    div.appendChild(nameList);
    document.querySelector("nav > div:last-of-type").appendChild(div);
};



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

function contentFillingForTask() {
    const task = Todo.globalTodo;

    if (task !== undefined) {
        for (let i = 0; i < task.length; i++) {
            createTaskDOM(task[i]);
        };
    } else {
        throw Error("For some reason this object is not in the database.");
    };
};








function createListMemu(nameList) {
    const article = document.querySelector("#content > article");

    const listMemu = document.querySelector("div");
    listMemu.classList.add("listMemu");

    const div1 = document.createElement("div");

    const title = document.createElement("title");
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
    button1.textContent = "&#x2713;";

    const div2 = document.createElement("div");

    const addToList = document.createElement("div");
    addToList.id = "addToList";
    addToList.classList.add("interaction");

    const button2 = document.createElement("button");
    button2.textContent = "&#x002B;";

    const deleteToList = document.createElement("div");
    deleteToList.id = "deleteToList";
    deleteToList.classList.add("interaction");

    const button3 = document.createElement("button");
    button3.textContent = "&#x1F5D1;";


    editList.appendChild(button1);  

    title.appendChild(input);

    div1.appendChild(title);
    div1.appendChild(editList)

    addToList.appendChild(button2);  

    deleteToList.appendChild(button3);

    div2.appendChild(addToList);
    div2.appendChild(deleteToList)

    listMemu.appendChild(div1);
    listMemu.appendChild(div2);

    article.appendChild(listMemu);
};

// <div class="listMemu">
//                     <div>
//                         <div class="title">
//                             <input type="text" id="title" maxlength="20">
//                         </div>
//                         <div id="editList" class="interaction"><button>&#x2713;</button></div>
//                     </div>
//                     <div>
//                         <div id="addToList" class="interaction"><button>&#x002B;</button></div>
//                         <div id="deleteToList" class="interaction"><button>&#x1F5D1;</button></div>
//                     </div>
//                 </div>




export { createTaskDOM, editTaskDOM, createListDOM, contentFillingForList, contentFillingForTask };