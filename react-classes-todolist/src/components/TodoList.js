import TodoElement from './TodoElement'

function TodoList({todos}) {
    return (
        <article className="todo-list">
            { todos.map(({title, completed, id}) =>
                <TodoElement title={title} completed={completed} id={id} key={id}/>) }
        </article>)
}

export default TodoList
