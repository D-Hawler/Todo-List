function createTaskDOM(task) {
    const article = document.querySelector("article");

    const main = document.createElement("div");
    main.classList.add("task");
    main.id = task.ID;

    const name = document.createElement("div");
    name.classList.add("name");

    const input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.setAttribute("name", "completed");

    const title = document.createElement("h2");
    title.textContent = task.title;

    const feature = document.createElement("div");
    feature.classList.add("feature");

    const buttons = document.createElement("div");

    const icon = [
        {icon : `&#x2606;`, class: "a"},
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
    date.textContent = task.dueDate;

    const priority = document.createElement("h3");
    priority.textContent = task.priority;
    priority.classList.add("priorityMenu");
    priority.classList.add(task.priority.toLowerCase());

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

export { createTaskDOM };