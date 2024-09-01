const TODOS = [];

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

  document.querySelector("#todo-input").value = '';
  
  TODOS.push(newTodo);
  renderTodos();
}

document.querySelector("#add-todo").addEventListener("click", addTodo);

function deleteTodo(e) {

}

function createEachTodoComponent(todo) {
  const eachTodoContainer = document.createElement("div");
  eachTodoContainer.classList.add('todo-container');

  eachTodoContainer.innerHTML = `
        <p class="todo" id='${todo.id}'>${todo.task}</p>
        <button class="update-todo">update</button>
        <button class="delete-todo">delete</button>
    `;

  return eachTodoContainer;
}

function renderTodos() {
  const todoElement = document.querySelector("#todos");
  todoElement.innerHTML = "";
  TODOS.map((todo) => {
    const eachTodo = createEachTodoComponent(todo);
    todoElement.appendChild(eachTodo);
  });
}
