function validationCheck() {
    const title = document.querySelector("dialog #title");
    const description = document.querySelector("dialog #description");

    const titleCheck = validateTitle(title);
    const descriptionCheck = validateDescription(description);

    return titleCheck && descriptionCheck;
};
// validation of all elements


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
// popup window for non-valid forms


function validateTitle(title) {
    if (/^[a-zA-Z0-9_ -]{3,20}$/.test(title.value)) {
        title.classList.remove("invalid");
        return true;
    } else {
        title.classList.add("invalid");
        showTooltip(title, "Only Latin letters, numbers, spaces, _ and - (3-20 characters) are allowed.");
        return false;
    };
};
// title validity check

function validateDescription(description) {
     if (/^[a-zA-Z0-9_ -]{3,120}$/.test(description.value) || description.value === "") {
        description.classList.remove("invalid");
        return true;
    } else {
        description.classList.add("invalid");
        showTooltip(description, "Only Latin letters, numbers, spaces, _ and - (3-20 characters) are allowed.");
        return false;
    };
};
// description validity check


export { validationCheck };