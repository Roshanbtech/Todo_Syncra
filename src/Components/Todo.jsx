import React, { useState, useEffect, useRef } from "react";
import { MdEdit, MdDoneAll, MdDelete, MdArrowDropDown,MdArrowUpward } from "react-icons/md";
import { toast } from "react-toastify";
import "./Todo.css";

const Todo = ({ tasks, setTasks }) => {
  const [todo, setTodo] = useState("");
  const [order, setOrder] = useState("default");
  const [editId, setEditId] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const addTodo = () => {
    if (todo.trim() === "") {
      toast.error("Please enter a valid task");
      return;
    }

    if (editId) {
      const updatedTodos = tasks.map((t) =>
        t.id === editId ? { ...t, text: todo } : t
      );
      setTasks(updatedTodos);
      setEditId(null);
      toast.success("Task updated successfully");
    } else {
      setTasks([...tasks, { text: todo, id: Date.now(), isDone: false }]);
      toast.success("Task added successfully");
    }
    setTodo("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo();
  };

  const onDelete = (id) => {
    setTasks(tasks.filter((todo) => todo.id !== id));
    toast.success("Task Deleted Successfully");
  };

  const onComplete = (id) => {
    let complete = tasks.map((todo) => {
      if (todo.id === id) {
        todo.isDone = !todo.isDone;
        if (todo.isDone === true) {
          toast.success("Task Marked As Completed");
        } else {
          toast.info("Task Marked As Not Completed");
        }
      }
      return todo;
    });
    setTasks(complete);
  };

  const onEdit = (id) => {
    const editTodo = tasks.find((todo) => todo.id === id);
    if (editTodo) {
      setTodo(editTodo.text);
      setEditId(editTodo.id);
    }
  };

 

  //sorting based on alphabetical order

  const handleSort = (order) => {
    setOrder(order);
    const sortedTodos = [...tasks].sort((a, b) => {
      if (order === "asc") {
        return a.text.localeCompare(b.text);
      } else if(order === "desc") {
        return b.text.localeCompare(a.text);
      } else if(order === "isDone") {
        return a.isDone - b.isDone;
      }
    })
    setTasks(sortedTodos);
  };

  
  
  
  return (
    <div className="todo-container">
      <form className="input-section" onSubmit={handleSubmit}>
        <h2>Todo Syncra</h2>
        <div className="input-wrapper">
          <input
            type="text"
            value={todo}
            ref={inputRef}
            placeholder="Enter Your Todo"
            onChange={(e) => setTodo(e.target.value)}
          />
          <button type="submit">
            {editId ? "Update" : "Add"}
          </button>
        </div>
      </form>
      <div className="dropdown">
        <button className="dropdown-button">Sort By <MdArrowDropDown /></button>
        <div className="dropdown-content">
          <a className="dropdown-item" onClick={() => handleSort('asc')}>aA-zZ</a>
          <a className="dropdown-item" onClick={() => handleSort('desc')}>zZ-aA</a>
          <a className="dropdown-item" onClick={() => handleSort('isDone')}>isDone</a>
        </div>
      </div>
      <div>
        <ul>
          {tasks.map((todo) => (
            <li key={todo.id} className={todo.isDone ? "completed" : ""}>
              {todo.text}
              <span className="icons">
                <i title="Done" onClick={() => onComplete(todo.id)}>
                  <MdDoneAll />
                </i>
                {!todo.isDone && (
                    <>
                     <i title="Edit" onClick={() => onEdit(todo.id)}>
                     <MdEdit />
                   </i>
                   <i title="Delete" onClick={() => onDelete(todo.id)}>
                     <MdDelete />
                   </i>
                   </>
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
