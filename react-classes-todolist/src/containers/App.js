import './App.css';
import {Component} from 'react'
import TodoList from "../components/TodoList";

class App extends Component {
    constructor() {
        super();
        this.state = {
            todos: [],
            hasError: false,
            error: '',
            isPending: true
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

    calcTodosPage() {
        const {isPending, hasError, todos, completedTodos} = this.state
        if (isPending) return 'Loading...'
        else if (hasError) return this.state.error
        else return (
            <TodoList
                todos={todos}
                onChangeTodoStatus={this.onChangeTodoStatus}
                onDeleteTodo={this.onDeleteTodo}
            />)
    }

    render() {
        return (
            <section className="todos-page">
                { this.calcTodosPage() }
            </section>)
    }
}

export default App;
