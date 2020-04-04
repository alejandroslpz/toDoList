const tasklist = document.getElementById("my-tasks");
const sendButton = document.getElementById("butsub");
const checkText = document.querySelector(".checkText");

eventListeners();

//Eventos

function eventListeners() {
  document.getElementById("formTask").addEventListener("submit", addTask);

  tasklist.addEventListener("click", eraseTask);

  document.addEventListener("DOMContentLoaded", loadedDOM);

  checkText.addEventListener("blur", validateText);
}

//Funciones

function validateText() {
  if (this.value.length > 0) {
    sendButton.disabled = false;
  } else {
    sendButton.disabled = true;
  }
}

function addTask(e) {
  e.preventDefault();

  const task = document.getElementById("icon_prefix2").value;
  const eraseButton = document.createElement("a");

  eraseButton.classList = "eraseTask";
  eraseButton.innerText = "x";

  const li = document.createElement("li");
  li.innerText = task;
  li.appendChild(eraseButton);
  tasklist.appendChild(li);
  addTaskLocalStorage(task);
}

function eraseTask(e) {
  e.preventDefault();
  if (e.target.className === "eraseTask") {
    e.target.parentElement.remove();
    eraseTaskLocalStorage(e.target.parentElement.innerText);
  }
}

function addTaskLocalStorage(task) {
  let tasks;

  tasks = getTaskLocalStorage();
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function eraseTaskLocalStorage(task) {
  let tasks, eraseButton;

  eraseButton = task.substring(0, task.length - 1);

  tasks = getTaskLocalStorage();

  tasks.forEach(function (task, index) {
    if (eraseButton === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTaskLocalStorage() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  return tasks;
}

function loadedDOM() {
  sendButton.disabled = true;

  let tasks;

  tasks = getTaskLocalStorage();

  tasks.forEach(function (task) {
    const eraseButton = document.createElement("a");

    eraseButton.classList = "eraseTask";
    eraseButton.innerText = "x";

    const li = document.createElement("li");
    li.innerText = task;
    li.appendChild(eraseButton);
    tasklist.appendChild(li);
  });
}
