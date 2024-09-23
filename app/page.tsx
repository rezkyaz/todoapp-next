'use client';

import { useState, useEffect } from 'react';
import { useGetTodosQuery } from '../store/todoApi';
import { Todo } from '../store/todoApi';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import TodoForm from '../components/TodoForm';

const TodosPage = () => {
  const [page, setPage] = useState(1);
  const [todos, setTodos] = useState<Todo[]>([]);

  const { data: fetchedTodos, isLoading } = useGetTodosQuery({ start: (page - 1) * 10, limit: 10 });

  useEffect(() => {
    if (fetchedTodos) {
      setTodos(fetchedTodos);
    }
  }, [fetchedTodos]);

  const handleAddTodo = (newTodo: Todo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  if (isLoading) return <div className="text-center">Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Todo List</h1>

      {/* Form untuk menambah Todo */}
      <TodoForm onAddTodo={handleAddTodo} />

      {/* Tabel Todo */}
      <div className="overflow-x-auto w-full max-w-2xl">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th className="text-center">Title</th>
              <th className="text-center">Completed</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td className="text-center">{todo.title}</td>
                <td className="text-center">
                  {todo.completed ? (
                    <AiOutlineCheckCircle className="text-green-500 text-2xl inline-block" />
                  ) : (
                    <AiOutlineCloseCircle className="text-red-500 text-2xl inline-block" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 space-x-4">
        <button
          className="btn btn-primary"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <button className="btn btn-primary" onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default TodosPage;
