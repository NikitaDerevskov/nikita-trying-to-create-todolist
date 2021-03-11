const TodoElement = ({title, completed, id, onChangeTodoStatus, onDeleteTodo}) =>
        <section
            className={`todo-list-element
                        ${completed ? 'todo-element-completed': 'todo-element-uncompleted'}`}>
            <section id={id}>
                <input type="checkbox" checked={completed} onChange={() => onChangeTodoStatus(id)} />
            </section>
            <section
                className="todo-list-element-title">
                { title }
            </section>
            <section className="todo-list-element-delete">
                <button onClick={() => onDeleteTodo(id)}>X</button>
            </section>
        </section>

export default TodoElement
