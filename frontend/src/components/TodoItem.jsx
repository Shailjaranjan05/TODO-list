function TodoItem({ todo, toggleTodo, deleteTodo }) {
  return (
    <div className="todo-item">
      <input
        type = "checkbox"
        checked = {todo.completed}
        onChange = {() => toggleTodo(todo._id, todo.completed)}
        />
        <span
        style={{
          textDecoration: todo.completed ? "line-through" : "none",
        }}
        >{todo.task}</span>

        <button 
          className="delete-btn"
          onClick = {()=> deleteTodo(todo._id)}>Delete
        </button>
        
    </div>
  );
}

export default TodoItem;