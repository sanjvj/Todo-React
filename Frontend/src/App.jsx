import { useState } from "react";
import "./App.css";
import { CreateTodo } from "./components/CreateTodo";
import { Todos } from "./components/Todos";
function App() {
  const [todos, SetTodos] = useState([]);

  fetch("http://localhost:3000/todos").then(async function (res) {
    const json = await res.json();
    SetTodos(json.todos);
  });


  return (
    <div>
      <CreateTodo />
      <Todos todos={todos}></Todos>
    </div>
  );
}

export default App;
