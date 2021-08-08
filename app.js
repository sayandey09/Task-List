const form = document.querySelector("form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");
// load aa event listener

loadEventListener();

function loadEventListener() {
  document.addEventListener("DOMContentLoaded", getTasks);
  //
  //add task form
  form.addEventListener("submit", addTask);
  //remove btn
  taskList.addEventListener("click", removeTask);
  //   clear all
  clearBtn.addEventListener("click", clearTasks);
  //   filter

  filter.addEventListener("keyup", filterTask);
}

//

function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function (task) {
    const li = document.createElement("li");
    li.classList.add("collection-item");
    li.appendChild(document.createTextNode(task));
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
    // console.log(li);
    li.appendChild(link);
    taskList.appendChild(li);
  });
}

function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a Task");
  } else {
    //
    const li = document.createElement("li");
    li.classList.add("collection-item");
    li.appendChild(document.createTextNode(taskInput.value));
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
    // console.log(li);
    li.appendChild(link);
    taskList.appendChild(li);

    //
    storeTask(taskInput.value);
    // console.log(taskInput.value);

    taskInput.value = "";
  }
  e.preventDefault();
}
//
function storeTask(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are tou sure")) {
      //   console.log(e.target.parentElement.parentElement);
      e.target.parentElement.parentElement.remove();
      //
      removeTaskFromLS(e.target.parentElement.parentElement);
    }
  }
}

function removeTaskFromLS(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));

  console.log(taskItem);
}

//
function clearTasks() {
  taskList.innerHTML = "";
  clearTaskFromLS();
}

//
function clearTaskFromLS() {
  localStorage.clear();
}

//
function filterTask(e) {
  const text = e.target.value.toLowerCase();
  console.log(text);
  document.querySelectorAll(".collection-item").forEach(function (task) {
    item = task.firstChild.textContent;
    console.log(item);
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "flex";
    } else {
      task.style.display = "none";
    }
  });
}

//
