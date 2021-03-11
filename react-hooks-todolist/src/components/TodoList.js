import TodoElement from './TodoElement'

const TodoList = ({todos, deleteTodo, changeTodoStatus}) =>
    <article className="todo-list">
        { todos.map(({title, completed, id}) =>
            <TodoElement
                title={title}
                completed={completed}
                id={id}
                key={id}
                changeTodoStatus={changeTodoStatus}
                deleteTodo={deleteTodo}
            />) }
    </article>

export default TodoList
