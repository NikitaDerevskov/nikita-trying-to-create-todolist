import './App.css';
import {Component} from 'react'
import TodoList from "../components/TodoList";

class App extends Component {
    constructor() {
        super();
        this.state = {
            todos: [],
            completedTodos: [],
            hasError: false,
            isPending: true
        }
    }

    componentDidMount() {
        fetch("https://jsonplaceholder.typicode.com/todos/")
            .then(response => response.json())
            .then(data => this.setState({todos: data}))
    }

    render() {
        return (
            <section className="todos-page">
                {` ${this.state.isPending}` }
                <TodoList />
            </section>)
    }
}

export default App;
