let TODOS = [];

document.querySelector("#add-todo").addEventListener("click", addTodo);

function addTodo(e) {
  const task = document.querySelector("#todo-input").value;
  if (!task) {
    alert("Please enter the task!!");
    return;
  }

  const newTodo = {
    id: TODOS.length + 1,
    task: task,
    isCompleted: false,
  };

  document.querySelector("#todo-input").value = "";
  TODOS.push(newTodo);

  renderTodos();
}

function updateTodo(todoId) {
  renderTodos({ updateTodo: true, updateTodoId: todoId});
}

function saveTodo(todoId) {
  const updatedTodoValue = document.querySelector(
    `#updated-todo-${todoId}`
  ).value;

  TODOS.map((todo) => {
    if (todo.id == todoId) {
      todo.task = updatedTodoValue;
      todo.isCompleted = false;
    }
  });

  renderTodos();
}

function cancelUpdatingTodo() {
  renderTodos();
}

function deleteTodo(todoId) {
  TODOS = TODOS.filter(todo => todo.id != todoId);
  
  renderTodos();
}

function markDoneTodo(todoId) {
  TODOS.map((todo) => {
    if (todo.id == todoId) {
      if (!todo.isCompleted) todo.isCompleted = true;
      else todo.isCompleted = false;
    }
  });

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
  const todoElement = document.querySelector("#todos");
  todoElement.innerHTML = "";
  TODOS.map((todo) => {
    const eachTodo = createEachTodoComponent(todo, obj);
    todoElement.appendChild(eachTodo);
  });
}
