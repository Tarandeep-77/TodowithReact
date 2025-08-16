import { useState } from 'react'
import { FaEdit, FaTrash, FaCheck } from "react-icons/fa";
import "./App.css"

function App() {

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");   

  function addTodo(){
    if(input === ""){
      alert("Enter a task first!");
      return;
    }
    setTodos([...todos, { text: input, completed: false }]); 
    setInput("");
  }

  function deleteTodo(index){
    setTodos(todos.filter((_, i) => i !== index));
  }

  function toggleDone(index){
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  }

  function startEdit(index){
    setEditIndex(index);
    setEditValue(todos[index].text);
  }

  function saveEdit(index){
    const newTodos = [...todos];
    newTodos[index].text = editValue;
    setTodos(newTodos);
    setEditIndex(null);
    setEditValue("");
  }

  return (
    <div className="app">
      <h1>Todo App</h1>
      <div className="todo-div">
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          id="todo-input" 
          placeholder="Enter a task.." 
        />
        <button id="add-task-btn" onClick={addTodo}>Add Task</button>

       <ul>
  {todos.map((task, index) => (
    <li key={index} className="task-card">
      {editIndex === index ? (
        <>
          <input 
            type="text" 
            value={editValue} 
            onChange={(e) => setEditValue(e.target.value)} 
          />
          <span onClick={() => saveEdit(index)}>
            <FaCheck color="green" />
          </span>
        </>
      ) : (
        <>
          <span 
            className={`task-text ${task.completed ? "completed" : ""}`}
          >
            {task.text}
          </span>

          <div className="task-icons">
            <span onClick={() => toggleDone(index)}>
              <FaCheck color={task.completed ? "green" : "gray"} />
            </span>

            <span onClick={() => startEdit(index)}>
              <FaEdit color="#fff" />
            </span>

            <span onClick={() => deleteTodo(index)}>
              <FaTrash color="#f87171" />
            </span>
          </div>
        </>
      )}
    </li>
  ))}
</ul>

      </div>
    </div>
  )
}

export default App
