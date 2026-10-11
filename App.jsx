import { useEffect, useState } from 'react';
import { fetchTasks, addTask, updateTask, removeTask } from './api';
import TaskForm from './components/TaskForm.jsx';
import TaskList from './components/TaskList.jsx';

export default function App() {
  // All tasks live in state; changing it re-renders the screen (no page reload)
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch all tasks from the backend once, when the page loads
  useEffect(() => {
    fetchTasks()
      .then(setTasks)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Add: POST to the backend, then append the saved task to state
  const handleAdd = async (title) => {
    try {
      setError('');
      const created = await addTask(title);
      setTasks((prev) => [...prev, created]);
    } catch (err) {
      setError(err.message);
    }
  };

  // Update (complete toggle or title edit): PUT, then replace that task in state
  const handleUpdate = async (id, changes) => {
    try {
      setError('');
      const updated = await updateTask(id, changes);
      setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete: DELETE, then remove that task from state
  const handleDelete = async (id) => {
    try {
      setError('');
      await removeTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="container">
      <h1>To-Do List</h1>
      <TaskForm onAdd={handleAdd} />
      {error && <p className="error" role="alert">{error}</p>}
      {loading ? (
        <p className="empty">Loading…</p>
      ) : (
        <TaskList tasks={tasks} onUpdate={handleUpdate} onDelete={handleDelete} />
      )}
    </main>
  );
}
