function TodoForm({task, setTask, addTodo}){
    return(
        <form className="todo-form" onSubmit={addTodo}>
            <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter a todo"
          />

          <button type="submit">Add Todo</button>
        </form>
    )
}

export default TodoForm;