import TodoElement from '../../../../../src/components/TodoElement';

const React = require('react');
const { render, fireEvent } = require('@testing-library/react');

describe('TodoElement', () => {
    it('renders correctly with valid props', () => {
        const todoData = {
            title: 'Test ToDo',
            completed: true,
            id: 1,
            changeTodoStatus: jest.fn(),
            deleteTodo: jest.fn()
        };

        const { container } = render(<TodoElement {...todoData} />);
        expect(container.firstChild).toHaveClass('todo-list-element');
    });

    it('has the correct checkbox checked state', () => {
        const todoData = {
            title: 'Test ToDo',
            completed: true,
            id: 1,
            changeTodoStatus: jest.fn(),
            deleteTodo: jest.fn()
        };

        const { getByTestId } = render(<TodoElement {...todoData} />);
        const checkbox = getByTestId('todo-status-checkbox');
        expect(checkbox.checked).toEqual(true);
    });

    it('calls changeTodoStatus on checkbox change', () => {
        const todoData = {
            title: 'Test ToDo',
            completed: false,
            id: 1,
            changeTodoStatus: jest.fn(),
            deleteTodo: jest.fn()
        };

        const { getByTestId } = render(<TodoElement {...todoData} />);
        const checkbox = getByTestId('todo-status-checkbox');
        fireEvent.click(checkbox);
        expect(todoData.changeTodoStatus).toHaveBeenCalledWith(todoData.id);
    });

    it('calls deleteTodo on delete button click', () => {
        const todoData = {
            title: 'Test ToDo',
            completed: false,
            id: 1,
            changeTodoStatus: jest.fn(),
            deleteTodo: jest.fn()
        };

        const { getByText } = render(<TodoElement {...todoData} />);
        const deleteButton = getByText('X');
        fireEvent.click(deleteButton);
        expect(todoData.deleteTodo).toHaveBeenCalledWith(todoData.id);