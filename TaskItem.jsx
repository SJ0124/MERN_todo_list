import { useState } from 'react';

// A single task: checkbox (complete), title (editable) and delete button
export default function TaskItem({ task, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  // Save the edited title through the PUT endpoint
  const saveTitle = async () => {
    if (!title.trim()) return;
    await onUpdate(task._id, { title });
    setEditing(false);
  };

  return (
    <li className="task">
      {/* Checkbox toggles completed through the PUT endpoint */}
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onUpdate(task._id, { completed: !task.completed })}
      />

      {editing ? (
        <>
          <input
            className="edit-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
          <button onClick={saveTitle}>Save</button>
          <button onClick={() => { setTitle(task.title); setEditing(false); }}>Cancel</button>
        </>
      ) : (
        <>
          {/* Completed tasks are shown with a strike-through */}
          <span className={task.completed ? 'title done' : 'title'}>{task.title}</span>
          <button onClick={() => setEditing(true)}>Edit</button>
          <button className="danger" onClick={() => onDelete(task._id)}>Delete</button>
        </>
      )}
    </li>
  );
}
