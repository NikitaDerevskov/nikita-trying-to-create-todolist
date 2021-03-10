function TodoElement({title, completed, id}) {
    return (
        <section className="todo-list-element">
            <section id={id}>
                <input type="checkbox" value={completed}/>
            </section>
            <section>
                { title }
            </section>
            <section>
                <button>X</button>
            </section>
        </section>)
}

export default TodoElement
