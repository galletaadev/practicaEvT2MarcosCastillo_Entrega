const input = document.querySelector("input");
const ul = document.querySelector("ul");
const emptyMessage = document.querySelector(".empty");
const taskCount = document.querySelector(".task-count:last-child");

loadTasksFromLocalStorage();

document.querySelector(".btn-add").addEventListener("click", function (e) {
  e.preventDefault();

  const taskText = input.value.trim();

  if (taskText !== "") {
    const li = document.createElement("li");
    li.className = "li-container";

    const p = document.createElement("p");
    p.textContent = taskText;

    const deleteButton = document.createElement("button");
    deleteButton.className = "btn-delete";
    deleteButton.textContent = "X";

    deleteButton.addEventListener("click", function () {
      ul.removeChild(li);
      updateTaskCount();
      updateLocalStorage();
    });

    li.appendChild(p);
    li.appendChild(deleteButton);

    ul.appendChild(li);

    input.value = "";

    updateTaskCount();

    updateLocalStorage();
  }
});

function updateTaskCount() {
  const taskCountValue = ul.children.length;
  taskCount.textContent = taskCountValue;

  if (taskCountValue === 0) {
    emptyMessage.style.display = "block";
  } else {
    emptyMessage.style.display = "none";
  }
}

function updateLocalStorage() {
  const tasks = Array.from(ul.querySelectorAll(".li-container p")).map(
    (p) => p.textContent
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  for (const taskText of tasks) {
    const li = document.createElement("li");
    li.className = "li-container";

    const p = document.createElement("p");
    p.textContent = taskText;

    const deleteButton = document.createElement("button");
    deleteButton.className = "btn-delete";
    deleteButton.textContent = "X";

    deleteButton.addEventListener("click", function () {
      ul.removeChild(li);
      updateTaskCount();
      updateLocalStorage();
    });

    li.appendChild(p);
    li.appendChild(deleteButton);

    ul.appendChild(li);
  }

  updateTaskCount();
}
