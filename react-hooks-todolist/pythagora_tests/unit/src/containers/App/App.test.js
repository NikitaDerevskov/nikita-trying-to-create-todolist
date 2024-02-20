import App from '../../../../../src/containers/App';

import { render, fireEvent, waitFor, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.get("https://jsonplaceholder.typicode.com/todos/", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([{id: 1, title: "test todo", completed: false}])
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());

describe('App Component', () => {
  test('renders App component and displays loading status first', async () => {
    const {getByText} = render(<App/>);
    expect(getByText("Loading...")).toBeTruthy();
  });

  test('loads and displays todos fetched from API', async () => {
    const {findByText} = render(<App/>);
    expect(await findByText("test todo")).toBeTruthy();
  });

  test('renders error message when request fails', async () => {
    server.use(
        rest.get("https://jsonplaceholder.typicode.com/todos/", (req, res, ctx) => {
          return res(ctx.status(500));
        })
    );

    const {findByText} = render(<App/>);
    const errorMessage = await findByText(/500/i);
    expect(errorMessage).toBeTruthy();
  });

  test('adds a new todo item', async () => {
    const {findByPlaceholderText, findByText} = render(<App/>);
    const inputBox = await findByPlaceholderText('');
    fireEvent.change(inputBox, {target: {value: 'New todo'}});
    fireEvent.click(await findByText('Add Todo'));
    expect(await findByText('New todo')).toBeTruthy();
  });

  test('deletes a todo item', async () => {
    const {findByText, queryByText} = render(<App/>);
    fireEvent.click(await findByText('Delete'));
    await waitFor(() => expect(queryByText('test todo')).toBeFalsy());
  });

  test('changes the status of a todo item', async () => {
    const {findByText} = render(<App/>);
    fireEvent.click(await findByText('Change status'));
    expect(findByText('test todo')).toHaveClass('completed');
  })
});
