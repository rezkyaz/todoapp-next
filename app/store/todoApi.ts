import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], { start: number, limit: number }>({
      query: ({ start, limit }) => `todos?_start=${start}&_limit=${limit}`,
    }),
    addTodo: builder.mutation<Todo, Partial<Todo>>({
      query: (todo) => ({
        url: 'todos',
        method: 'POST',
        body: todo,
      }),
    }),
  }),
});

export const { useGetTodosQuery, useAddTodoMutation } = todoApi;
