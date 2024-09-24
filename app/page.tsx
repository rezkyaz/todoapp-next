'use client';

import { useGetTodosQuery } from './store/todoApi';
import { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { Todo } from './store/todoApi';

export default function Home() {
  const [page, setPage] = useState(1); // Menyimpan state halaman
  const { data: fetchedTasks = [], isLoading } = useGetTodosQuery({ start: (page - 1) * 10, limit: 10 });
  const [tasks, setTasks] = useState<Todo[]>(fetchedTasks);

  useEffect(() => {
    if (fetchedTasks) {
      setTasks(fetchedTasks);
    }
  }, [fetchedTasks]);

  const handleAddTodo = (newTodo: Todo) => {
    setTasks((prevTodos) => [newTodo, ...prevTodos]);  // Update state dengan todo baru
  };

  if (isLoading) return <div className="text-center">Loading...</div>;

  return (
    <main className="max-w-4xl mx-auto mt-4">
      <div className="text-center my-5 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Todo List App</h1>
        <TodoForm onAddTodo={handleAddTodo} />  
      </div>
      <TodoList tasks={tasks} />
      <div className="flex justify-center mt-6">
        <div className="join">
          <button
            className="join-item btn"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            «
          </button>
          <button className="join-item btn">Page {page}</button>
          <button
            className="join-item btn"
            onClick={() => setPage(page + 1)}
          >
            »
          </button>
        </div>
      </div>
    </main>
  );
}
