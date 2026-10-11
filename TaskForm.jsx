import { useState } from 'react';

// Form to add a new task
export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // stop the browser's full-page form submit
    if (!title.trim()) return;
    await onAdd(title);
    setTitle(''); // clear the input after adding
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a new task…"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}
