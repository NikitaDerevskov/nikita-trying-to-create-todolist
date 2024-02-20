import AddTodo from '../../../../../src/components/AddTodo';

import { render, fireEvent } from '@testing-library/react';
import React from 'react';

const setState = jest.fn();
const useStateSpy = jest.spyOn(React, 'useState');
useStateSpy.mockImplementation((init) => [init, setState]);

describe('AddTodo Component Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders AddTodo component', () => {
    render(<AddTodo />);
  });

  test('should render initial layout', () => {
    const component = render(<AddTodo />);
    expect(component).toMatchSnapshot();
  });

  test('should create an input and a button', () => {
    const { getByRole } = render(<AddTodo />);
    const input = getByRole('textbox');
    const button = getByRole('button');
    
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('should change state on input change', () => {
    const { getByRole } = render(<AddTodo />);
    const input = getByRole('textbox');
    
    fireEvent.change(input, { target: { value: 'Test Todo' } });
    expect(setState).toHaveBeenCalledTimes(1);
    expect(setState).toHaveBeenCalledWith('Test Todo');
  });

  test('should call addNewTodo prop on button click', () => {
    const addNewTodo = jest.fn();
    const { getByRole } = render(<AddTodo addNewTodo={addNewTodo} />);
    const button = getByRole('button');
    
    fireEvent.click(button);
    expect(addNewTodo).toHaveBeenCalledTimes(1);
    expect(addNewTodo).toHaveBeenCalledWith('');
  });
});