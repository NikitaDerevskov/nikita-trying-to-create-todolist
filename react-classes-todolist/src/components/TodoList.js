import TodoElement from './TodoElement'

const TodoList = ({todos, onChangeTodoStatus, onDeleteTodo}) =>
        <article className="todo-list">
            { todos.map(({title, completed, id}) =>
                <TodoElement
                    title={title}
                    completed={completed}
                    id={id}
                    key={id}
                    onChangeTodoStatus={onChangeTodoStatus}
                    onDeleteTodo={onDeleteTodo}
                />) }
        </article>

export default TodoList
