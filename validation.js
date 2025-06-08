function validationCheck() {
    const title = document.querySelector("dialog #title");
    const description = document.querySelector("dialog #description");
    const dueDate = document.querySelector("dialog #dueDate");
    const priority = document.querySelector("dialog #priority");

    const titleCheck = validateTitle(title);
    const descriptionCheck = validateDescription(description);

    if (titleCheck && descriptionCheck) {
        console.log("Yes");
    } else {
        console.log('No');
    };
};


let activeTooltip = null;
function showTooltip(targetElement, message) {
    if (activeTooltip) {
        activeTooltip.destroy();
        activeTooltip = null;
    }

    const descriptionTooltip = tippy(targetElement, {
        appendTo: () => document.querySelector("dialog"),
        content: message,
        trigger: "manual",
        placement: "bottom",
        theme: "myCustomTheme",
        arrow: false,
        onCreate(instance) {
            activeTooltip = instance;
            instance.show();
        }
    });
};


function validateTitle(title) {
    if (title.value.length > 3) {
        title.classList.remove("invalid");
        return true;
    } else {
        title.classList.add("invalid");
        showTooltip(title, "title should be no shorter than 3 characters");
        return false;
    };
};

function validateDescription(description) {
     if (description.value.length > 3 || description.value === "") {
        description.classList.remove("invalid");
        return true;
    } else {
        description.classList.add("invalid");
        showTooltip(description, "description should be no shorter than 3 characters");
        return false;
    };
};


export { validationCheck };