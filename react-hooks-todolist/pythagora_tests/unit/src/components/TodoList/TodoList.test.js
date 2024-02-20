import TodoList from '../../../../../src/components/TodoList';
import { TodoElement } from '../../../../../src/components/TodoElement';

import React from 'react';
import { shallow } from 'enzyme';

describe('TodoList Component', () => {
    let props;
    beforeEach(() => {
        props = {
            todos: [
                { title: 'Todo 1', completed: false, id: '1' },
                { title: 'Todo 2', completed: true, id: '2' },
            ],
            deleteTodo: jest.fn(),
            changeTodoStatus: jest.fn(),
        };
    });

    it('should render correctly', () => {
        const wrapper = shallow(<TodoList {...props} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('should render TodoElement for each todo', () => {
        const wrapper = shallow(<TodoList {...props} />);
        expect(wrapper.find(TodoElement).length).toEqual(props.todos.length);
    });

    it('should pass correct props to TodoElement', () => {
        const wrapper = shallow(<TodoList {...props} />);
        wrapper.find(TodoElement).forEach((todoElementWrapper, idx) => {
            expect(todoElementWrapper.props()).toMatchObject(props.todos[idx]);
        });
    });

    it('should call deleteTodo when TodoElement deleteTodo prop is invoked', () => {
        const wrapper = shallow(<TodoList {...props} />);
        wrapper.find(TodoElement).first().props().deleteTodo();
        expect(props.deleteTodo).toHaveBeenCalled();
    });

    it('should call changeTodoStatus when TodoElement changeTodoStatus prop is invoked', () => {
        const wrapper = shallow(<TodoList {...props} />);
        wrapper.find(TodoElement).first().props().changeTodoStatus();
        expect(props.changeTodoStatus).toHaveBeenCalled();
    });
});