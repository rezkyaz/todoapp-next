'use client';

import { Todo } from '../store/todoApi';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';

interface TodoListProps {
  tasks: Todo[];
}

const TodoList: React.FC<TodoListProps> = ({ tasks }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th className="text-center">Title</th>
            <th className="text-center">Completed</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td className="text-center">
                {task.completed ? (
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
  );
};

export default TodoList;
