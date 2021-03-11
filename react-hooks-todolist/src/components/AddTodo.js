const AddTodo = ({newTodoTitle, setNewTodoTitle, addNewTodo}) =>
    (<section className="add-todo">
        <input type="text" value={newTodoTitle}
               onChange={({target}) => setNewTodoTitle(target?.value)}/>
        <button onClick={() => addNewTodo(newTodoTitle)}>ADD</button>
    </section>)

export default AddTodo

