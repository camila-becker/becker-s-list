let allTasks = [];
let inputTask = null;
let isEditing = false;
let currentIndex = null;

window.addEventListener("load", () => {
  inputTask = document.querySelector("#new-task");
  preventFormSubmit();
  activateInput();
  render();
});

const preventFormSubmit = () => {
  const handleFormSubmit = (event) => {
    event.preventDefault();
  };
  let form = document.querySelector("form");
  form.addEventListener("submit", handleFormSubmit);
};

const activateInput = () => {
  const insertTask = (newTask) => (allTasks = [...allTasks, newTask]);
  const updateTask = (newTask) => (allTasks[currentIndex] = newTask);

  const handleTyping = ({ target, key }) => {
    let hasText = !!target.value && target.value.trim() !== "";

    if (!hasText) {
      clearInput();
      return;
    }

    if (key === "Enter") {
      if (isEditing) {
        updateTask(target.value);
      } else {
        insertTask(target.value);
      }

      render();
      isEditing = false;
      clearInput();
    }
  };

  inputTask.focus();
  inputTask.addEventListener("keyup", handleTyping);
};

const render = () => {
  const createDeleteButton = (index) => {
    const deleteTask = () => {
      allTasks = allTasks.filter((_, i) => i !== index);
      render();
    };
    let button = document.createElement("button");
    button.textContent = "X";
    button.classList.add("remove-button");
    button.addEventListener("click", deleteTask);
    return button;
  };

  const createSpan = (task, index) => {
    const editItem = () => {
      inputTask.value = task;
      inputTask.focus();
      isEditing = true;
      currentIndex = index;
    };
    let span = document.createElement("span");
    span.classList.add("clickable");
    span.textContent = task;
    span.addEventListener("click", editItem);
    return span;
  };

  let listTasks = document.querySelector("#all-tasks");
  listTasks.innerHTML = "";
  let ul = document.createElement("ul");

  for (let i = 0; i < allTasks.length; i++) {
    let currentTask = allTasks[i];
    let li = document.createElement("li");
    let deleteButton = createDeleteButton(i);
    let span = createSpan(currentTask, i);

    li.appendChild(deleteButton);
    li.appendChild(span);
    ul.appendChild(li);
  }

  listTasks.appendChild(ul);
  clearInput();
};

const clearInput = () => {
  inputTask.value = "";
  inputTask.focus();
};
