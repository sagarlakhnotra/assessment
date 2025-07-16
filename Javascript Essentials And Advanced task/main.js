const input = document.getElementById("todo-input");
const button = document.getElementById("add-btn");
const list = document.getElementById("todo-list");

// 🧠 Load saved todos from cookies when page loads
window.addEventListener("DOMContentLoaded", () => {
  const saved = getCookie("todos");
  if (saved) {
    const todos = JSON.parse(saved);
    todos.forEach(todo => addTodoToDOM(todo));
  }
});

// ➕ Function to add new todo item to the list
function addTodoToDOM(text) {
  const li = document.createElement("li");
  li.textContent = text;
  list.appendChild(li);
}

// 🧠 Update cookies with current todo list
function updateCookies() {
  const allTodos = [];
  list.querySelectorAll("li").forEach(li => {
    allTodos.push(li.textContent);
  });
  document.cookie = "todos=" + JSON.stringify(allTodos) + "; path=/";
}

// 🍪 Helper function to get cookies by name
function getCookie(name) {
  const cookieArr = document.cookie.split(";");
  for (let c of cookieArr) {
    const [key, val] = c.trim().split("=");
    if (key === name) return val;
  }
  return null;
}

// 🖱️ Add button click event listener
button.addEventListener("click", () => {
  const value = input.value.trim();
  if (value) {
    addTodoToDOM(value);    // Add to DOM
    updateCookies();        // Save in cookies
    input.value = "";       // Clear input
  }
});
