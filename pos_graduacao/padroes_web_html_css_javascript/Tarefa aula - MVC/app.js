// Model
const model = {
  todos: [], 
  addTodo: function (todo) {
    this.todos.push({ text: todo, completed: false });
  },
  editTodo: function (position, newTodo) {
    this.todos[position].text = newTodo;
  },
  toggleCompleted: function (position) {
    this.todos[position].completed = !this.todos[position].completed;
  },
  removeTodo: function (position) {
    this.todos.splice(position, 1);
  },
  sortTodos: function () {
    this.todos.sort((a, b) => a.text.localeCompare(b.text));
  },
};

// View
const view = {
  todoList: document.getElementById("todo-list"),
  renderTodo: function (todo, position) {
    const todoItem = document.createElement("li");
    
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.addEventListener("change", function () {
      controller.toggleCompleted(position);
    });
    
    const todoText = document.createElement("span");
    todoText.textContent = todo.text;
    
    const editButton = document.createElement("button");
    editButton.textContent = "Editar";
    editButton.addEventListener("click", function () {
      const newTodo = prompt("Editar tarefa:", todo.text);
      if (newTodo !== null) {
        controller.editTodo(position, newTodo);
      } 
    });
    
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Excluir";
    deleteButton.addEventListener("click", function () {
      controller.removeTodo(position);
    });
    
    todoItem.appendChild(checkbox);
    todoItem.appendChild(todoText);
    todoItem.appendChild(editButton);
    todoItem.appendChild(deleteButton);
    this.todoList.appendChild(todoItem);
  },
};

// Controller
const controller = {
  init: function () {
    const todoForm = document.getElementById("todo-form");
    todoForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const todoInput = document.getElementById("todo-input");
      const todo = todoInput.value;
      if (todo.trim() !== "") {
        model.addTodo(todo);
        view.renderTodo({ text: todo, completed: false }, model.todos.length - 1);
        todoInput.value = "";
        controller.sortAndRender();
      }
    });

    controller.sortAndRender();
  },
  editTodo: function (position, newTodo) {
    model.editTodo(position, newTodo);
    controller.sortAndRender();
  },
  toggleCompleted: function (position) {
    model.toggleCompleted(position);
    controller.sortAndRender();
  },
  removeTodo: function (position) {
    model.removeTodo(position);
    controller.sortAndRender();
  },
  sortAndRender: function () {
    model.sortTodos();
    view.todoList.innerHTML = "";
    model.todos.forEach(function (todo, position) {
      view.renderTodo(todo, position);
    });
  },
};

controller.init();
