'use client';

import { useState } from 'react';
import { useAddTodoMutation } from '../store/todoApi';
import { Todo } from '../store/todoApi';

interface TodoFormProps {
  onAddTodo: (todo: Todo) => void; // Tambahkan prop untuk mengupdate todo di state utama
}

const TodoForm = ({ onAddTodo }: TodoFormProps) => {
  const [title, setTitle] = useState('');
  const [addTodo] = useAddTodoMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newTodo = {
      userId: 1,
      title,
      completed: false,
    };

    try {
      // Mengirim data ke API
      const response = await addTodo(newTodo).unwrap();

      // Panggil prop untuk mengupdate state todos
      onAddTodo(response);
      setTitle('');
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center my-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add new todo"
        className="input input-bordered w-full max-w-xs mb-4"
      />
      <button type="submit" className="btn btn-primary">
        Add Todo
      </button>
    </form>
  );
};

export default TodoForm;
