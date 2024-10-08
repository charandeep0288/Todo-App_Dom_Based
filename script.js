if (!localStorage.getItem("TODOS")) localStorage.setItem("TODOS", "[]");

document.querySelector("#add-todo").addEventListener("click", addTodo);

function addTodo(e) {
  const task = document.querySelector("#todo-input").value;
  const LOCAL_TODOS = JSON.parse(localStorage.getItem("TODOS"));
  const id = (new Date()).getTime();

  if (!task) {
    alert("Please enter the task!!");
    return;
  }

  const newTodo = {
    id: id,
    task: task,
    isCompleted: false,
  };

  document.querySelector("#todo-input").value = "";

  LOCAL_TODOS.push(newTodo);
  localStorage.setItem("TODOS", JSON.stringify(LOCAL_TODOS));

  renderTodos();
}

function updateTodo(todoId) {
  renderTodos({ updateTodo: true, updateTodoId: todoId });
}

function saveTodo(todoId) {
  const LOCAL_TODOS = JSON.parse(localStorage.getItem("TODOS"));

  const updatedTodoValue = document.querySelector(
    `#updated-todo-${todoId}`
  ).value;

  LOCAL_TODOS.map((todo) => {
    if (todo.id == todoId) {
      todo.task = updatedTodoValue;
      todo.isCompleted = false;
    }
  });

  localStorage.setItem("TODOS", JSON.stringify(LOCAL_TODOS));

  renderTodos();
}

function cancelUpdatingTodo() {
  renderTodos();
}

function deleteTodo(todoId) {
  const LOCAL_TODOS = JSON.parse(localStorage.getItem("TODOS"));
  const UPDATED_TODOS = LOCAL_TODOS.filter((todo) => todo.id != todoId);
  localStorage.setItem("TODOS", JSON.stringify(UPDATED_TODOS));

  renderTodos();
}

function markDoneTodo(todoId) {
  const LOCAL_TODOS = JSON.parse(localStorage.getItem("TODOS"));

  LOCAL_TODOS.map((todo) => {
    if (todo.id == todoId) {
      if (!todo.isCompleted) todo.isCompleted = true;
      else todo.isCompleted = false;
    }
  });

  localStorage.setItem("TODOS", JSON.stringify(LOCAL_TODOS));

  renderTodos();
}

function createEachTodoComponent(todo, obj) {
  const updateTodo = obj?.updateTodo && obj?.updateTodoId == todo?.id;

  const eachTodoContainer = document.createElement("div");
  eachTodoContainer.classList.add("todo-container");

  eachTodoContainer.innerHTML = `
  <input type="checkbox" class="mark-todo check-todo-${todo.id}" style='${updateTodo && "display:none;"}' onclick='markDoneTodo(${todo.id})' ${todo.isCompleted && "checked"}/>
  <p  class="todo scrollbar ${todo.isCompleted && 'mark-todo-done'}" id='${todo.id}' style='${updateTodo ? "display:none;" : "display:flex;"}' >${todo.task}</p>
  <input type="text" placeholder="Update todo...." value="${todo.task}" id="updated-todo-${todo.id}" class="edit-todo-input" style='${updateTodo && "display:block;"}' />
  <div class="todo-btns-container">
    <button class="button-${updateTodo ? '26' : '25'} ${updateTodo ? 'update-todo' : 'save-todo'}" onclick="${updateTodo ? `saveTodo(${todo.id})`: `updateTodo(${todo.id})` }">${updateTodo ? 'Save' : 'Update'}</button>
    <button class="button-24 delete-todo" onclick="${updateTodo ? `cancelUpdatingTodo()` : `deleteTodo(${todo.id})` }">${updateTodo ? 'Cancel' : 'Delete'}</button>
  </div>
`;

  return eachTodoContainer;
}

function renderTodos(obj) {
  const LOCAL_TODOS = JSON.parse(localStorage.getItem("TODOS"));

  const todoElement = document.querySelector("#todos");
  todoElement.innerHTML = "";
  LOCAL_TODOS.map((todo) => {
    const eachTodo = createEachTodoComponent(todo, obj);
    todoElement.appendChild(eachTodo);
  });
}

renderTodos();
