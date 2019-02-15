let todos = [];

const filters = {
  searchTodo: "",
  hideCompleted: false
};

const todosJSON = localStorage.getItem("todos");

if (todosJSON !== null) {
  todos = JSON.parse(todosJSON);
}

const renderTodos = (todos, filters) => {
  const filteredTodos = todos.filter(todo => {
    const searchTextMatch = todo.text
      .toLowerCase()
      .includes(filters.searchTodo.toLowerCase());
    const hideCompletedMatch = !filters.hideCompleted || !todo.completed;
    return searchTextMatch && hideCompletedMatch;
  });

  // filteredTodos = filteredTodos.filter(todo => {
  //   // if (filters.hideCompleted) {
  //   //   return !todo.completed;
  //   // } else {
  //   //   return true;
  //   // }
  //   return !filters.hideCompleted || !todo.completed;
  // });

  const incompleteTodos = filteredTodos.filter(todo => {
    return !todo.completed;
  });

  document.getElementById("todo-root").innerHTML = "";

  const summary = document.createElement("h2");
  summary.textContent = `You have ${incompleteTodos.length} todos left`;
  document.getElementById("todo-root").appendChild(summary);

  filteredTodos.forEach(todo => {
    const todoP = document.createElement("p");
    todoP.textContent = todo.text;
    document.getElementById("todo-root").appendChild(todoP);
  });
  // filteredTodos.forEach(todo => {
  //   const todoElement = document.createElement("p");
  //   todoElement.textContent = todo.text;
  //   document.getElementById("todo-root").appendChild(todoElement);
  // });
};

renderTodos(todos, filters);
// const p = document.querySelectorAll("p");

// p.forEach(p => {
//   if (p.textContent.toLowerCase().includes("the")) {
//     p.remove();
//   }
// });
//starts
// const incompleteTodos = todos.filter(todo => {
//   return !todo.completed;
// });

// const todosParagraph = document.createElement("h2");

// document.body.appendChild(todosParagraph).textContent = `You have ${
//   incompleteTodos.length
// } todos left`;

// todos.forEach(todo => {
//   const todoP = document.createElement("p");
//   document.body.appendChild(todoP).textContent = todo.text;
// });

//alt instructor's way
// todos.forEach(todo => {
//   const p = document.createElement("p");
//   p.textContent = todo.text;
//   document.querySelector("body").appendChild(p);
// });

// document.querySelector("button").addEventListener("click", e => {
//   console.log("Adding Todo");
// });

// document.querySelector(".btn-create").addEventListener("click", e => {
//   console.log("adding todo");
//   document.querySelectorAll("h1").forEach(t => {
//     t.remove();
//   });
// });
// document.getElementById("btn-create").addEventListener("click", () => {
//   console.log("creating todo");
// });

// document.getElementById("new-todo").addEventListener("input", e => {
//   console.log(e.target.value);
// });
document.getElementById("search-todo").addEventListener("input", e => {
  filters.searchTodo = e.target.value;
  renderTodos(todos, filters);
});

document.getElementById("todoSubmit").addEventListener("submit", e => {
  //prevent form default behavior
  e.preventDefault();
  let name = e.target.todoName.value;
  //push new todo object in array
  todos.push({ text: name, completed: false });
  localStorage.setItem("todos", JSON.stringify(todos));
  //clear input field
  e.target.todoName.value = "";
  //rerender todo list
  renderTodos(todos, filters);
  console.log(todos);
});

//instructor solution
// document.querySelector("#todoSubmit").addEventListener("submit", e => {
//   e.preventDefault();
//   todos.push({
//     text: e.target.elements.todoName.value,
//     completed: false
//   });
//   renderTodos(todos, filters);
//   e.target.elements.todoName.value = "";
// });
// document.getElementById("hideChecked").addEventListener("change", e => {
//   console.log(e.target.checked);
// });
document.getElementById("hideChecked").addEventListener("change", e => {
  filters.hideCompleted = e.target.checked;
  renderTodos(todos, filters);
});
