// Functions that call the Express backend using fetch.
// The backend address can be overridden with VITE_API_URL.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/tasks';

// Helper: send a request and throw an Error with the server's message if it fails
async function request(url, options = {}) {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

// GET /api/tasks
export const fetchTasks = () => request(API_URL);

// POST /api/tasks
export const addTask = (title) =>
  request(API_URL, { method: 'POST', body: JSON.stringify({ title }) });

// PUT /api/tasks/:id (changes = { completed } and/or { title })
export const updateTask = (id, changes) =>
  request(`${API_URL}/${id}`, { method: 'PUT', body: JSON.stringify(changes) });

// DELETE /api/tasks/:id
export const removeTask = (id) => request(`${API_URL}/${id}`, { method: 'DELETE' });
