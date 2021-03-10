function TodoElement() {
    return (
        <section className="todo-list-element">
            <section>
                <input type="checkbox"/>
            </section>
            <section>
                { `text todo` }
            </section>
            <section>
                {`delete todo`}
            </section>
        </section>)
}

export default TodoElement
