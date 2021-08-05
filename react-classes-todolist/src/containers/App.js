import {Component} from 'react'
import TodoList from "../components/TodoList";
import AddTodo from "../components/AddTodo"
import './App.css';


class App extends Component {
    constructor() {
        super();
        this.state = {
            todos: [],
            hasError: false,
            error: "",
            isPending: true,
            newTodoTitle: ""
        }
    }

    fetchTodos() {
        fetch("https://jsonplaceholder.typicode.com/todos/")
            .then(response => {if (!response.ok) {
                throw new Error(`${response.statusText} ${response.status}`)
            } else { return response }})
            .then(response => response.json())
            .then(data => this.setState({todos: data}))
            .catch(error => this.setState({hasError: true, error}))
            .finally(() => this.setState({isPending: false}))
    }

    componentDidMount() {
        this.fetchTodos()
    }

    onChangeTodoStatus = id => {
        const changedTodosList = this.state.todos.map(todo => {
            if (todo.id === id ) { todo.completed = !todo.completed }
            return todo
        })
        this.setState({todos: changedTodosList})
    }

    onDeleteTodo = id => {
        const changedTodosList = this.state.todos.filter(todo => todo.id !== id)
        this.setState({todos: changedTodosList})
    }

    newTodoInputHandler = ({target}) => {
        this.setState({newTodoTitle: target?.value})
    }

    newTodoButtonHandler = title => {
        const id = this.state.todos.reduce((acc, x) => x.id > acc ? x.id : acc, 0) + 1
        const newTodo =  { id, title, completed: false}
        const todoListWithNewOne = [newTodo, ...this.state.todos]
        this.setState({todos: todoListWithNewOne})
    }

    calcTodosPage() {
        const {isPending, hasError, todos} = this.state
        if (isPending) return "Loading..."
        else if (hasError) return this.state.error
        else return (
            <section>
                <h1>Nikita's todolist</h1>
                <AddTodo
                    newTodoInputHandler={this.newTodoInputHandler}
                    newTodoButtonHandler={this.newTodoButtonHandler}
                    newTodoTitle={this.state.newTodoTitle}
                />
                <TodoList
                    todos={todos}
                    onChangeTodoStatus={this.onChangeTodoStatus}
                    onDeleteTodo={this.onDeleteTodo}
                />
            </section>)
    }

    render() {
        return (
            <section className="todos-page">
                { this.calcTodosPage() }
            </section>)
    }
}

export default App;
