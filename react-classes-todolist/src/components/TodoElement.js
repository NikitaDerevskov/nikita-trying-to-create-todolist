function TodoElement({title, completed, id}) {
    return (
        <section className="todo-list-element">
            <section id={id}>
                <input type="checkbox" value={completed}/>
            </section>
            <section className="todo-list-element-title">
                { title }
            </section>
            <section className="todo-list-element-delete">
                <button>X</button>
            </section>
        </section>)
}

export default TodoElement
