const TodoElement = ({title, completed, id, changeTodoStatus, deleteTodo}) =>
    <section
        className={`todo-list-element
                        ${completed ? 'todo-element-completed': 'todo-element-uncompleted'}`}>
        <section id={id}>
            <input type="checkbox" checked={completed} onChange={() => changeTodoStatus(id)} />
        </section>
        <section
            className="todo-list-element-title">
            { title }
        </section>
        <section className="todo-list-element-delete">
            <button onClick={() => deleteTodo(id)}>X</button>
        </section>
    </section>

export default TodoElement
