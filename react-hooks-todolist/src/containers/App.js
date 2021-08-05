import { useState, useEffect } from 'react'
import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";
import './App.css'

// TODO bug - if i delete some and add new - we have double keys/id 198 and 198 for example
function App() {
    // TODO add custom hook
    const [todos, setTodos] = useState([])
    const [error, setError] = useState({errorText: '', hasError: false})
    const [isLoading, setLoading] = useState(true)
    const [newTodoTitle, setNewTodoTitle] = useState('')

    useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos/")
        .then(response => {if (!response.ok) {
          throw new Error(`${response.statusText} ${response.status}`)
        } else { return response }})
        .then(response => response.json())
        .then(data => setTodos(data))
        .catch(e => setError({errorText: e.toString(), hasError: true}))
        .finally(() => setLoading(false))
    }, [])

    const addNewTodo = title => {
        const id = todos.reduce((acc, x) => x.id > acc ? x.id : acc, 0) + 1
        const newTodo = { id, title, completed: false}
        const newTodosList = [newTodo, ...todos]
        setTodos(newTodosList)
    }

    const deleteTodo = id => {
        const newTodosList = todos.filter(todo => todo.id !== id)
        setTodos(newTodosList)
    }

    const changeTodoStatus = id => {
        const newTodoList = todos.map(todo => {
            if (todo.id === id) todo.completed = !todo.completed
            return todo
        })
        setTodos(newTodoList)
    }

    const calcTodoList = (isLoading, error) => { // TODO think about better way of this
      if (isLoading) return 'Loading...'
      else if (error.hasError) return error.errorText
      else return (<TodoList todos={todos}  deleteTodo={deleteTodo} changeTodoStatus={changeTodoStatus}/>)
    }

    return (
        <section className="todos-page">
            <h1>Nikita's todo</h1>
            <AddTodo newTodoTitle={newTodoTitle} setNewTodoTitle={setNewTodoTitle} addNewTodo={addNewTodo} />
            { calcTodoList(isLoading, error) }
        </section>
    );
}

export default App;
