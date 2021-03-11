const AddTodo = ({newTodoTitle, newTodoButtonHandler, newTodoInputHandler}) =>
    (<section className="add-todo">
        <input type="text" value={newTodoTitle} onChange={newTodoInputHandler}/>
        <button onClick={() => newTodoButtonHandler(newTodoTitle)}>ADD</button>
    </section>)

export default AddTodo
