import React, { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../services/taskService';
import './style.css';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', dueDate: '' });
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  const handleInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleEditInputChange = (e) => {
    setEditingTask({ ...editingTask, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTask(newTask);
    fetchTasks();
    setNewTask({ title: '', description: '', dueDate: '' });
    setShowForm(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateTask(editingTask.id, editingTask);
    fetchTasks();
    setEditingTask(null);
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  return (
    <div className="task-container">
      <h2>Tasks</h2>
      <button onClick={() => setShowForm(!showForm)}>{showForm ? 'Close' : 'Add Task'}</button>
      {showForm && (
        <form onSubmit={handleSubmit}>
          <input type="text" name="title" placeholder="Title" value={newTask.title} onChange={handleInputChange} required />
          <input type="text" name="description" placeholder="Description" value={newTask.description} onChange={handleInputChange} required />
          <input type="date" name="dueDate" placeholder="Due Date" value={newTask.dueDate} onChange={handleInputChange} required />
          <button type="submit">Add</button>
        </form>
      )}
      {editingTask && (
        <form onSubmit={handleUpdate}>
          <input type="text" name="title" placeholder="Title" value={editingTask.title} onChange={handleEditInputChange} required />
          <input type="text" name="description" placeholder="Description" value={editingTask.description} onChange={handleEditInputChange} required />
          <input type="date" name="dueDate" placeholder="Due Date" value={editingTask.dueDate} onChange={handleEditInputChange} required />
          <button type="submit">Update</button>
          <button onClick={() => setEditingTask(null)}>Cancel</button>
        </form>
      )}
      <table className="task-table">
        <thead>
          <tr>
  <th>Title</th>
  <th>Description</th>
  <th>Due Date</th>
  <th>Task Status</th>
</tr>
<tr>
  <td>Complete Project Report</td>
  <td>Finalize and submit the AI project report to the professor</td>
  <td>2025-09-30</td>
  <td>Active</td>
</tr>
<tr>
  <td>Code Review</td>
  <td>Review backend API code for performance issues</td>
  <td>2025-10-02</td>
  <td>Inactive</td>
</tr>
<tr>
  <td>UI Mockups</td>
  <td>Design wireframes for the new dashboard</td>
  <td>2025-10-05</td>
  <td>Temporarily Disabled</td>
</tr>
<tr>
  <td>Database Backup</td>
  <td>Run full database backup and store in cloud</td>
  <td>2025-09-28</td>
  <td>Active</td>
</tr>
<tr>
  <td>Client Meeting</td>
  <td>Discuss requirements with the client for CRM module</td>
  <td>2025-09-29</td>
  <td>Inactive</td>
</tr>
<tr>
  <td>Bug Fixing</td>
  <td>Resolve critical production bugs reported by QA</td>
  <td>2025-09-27</td>
  <td>Active</td>
</tr>
<tr>
  <td>Prepare Presentation</td>
  <td>Create PPT slides for project demonstration</td>
  <td>2025-10-01</td>
  <td>Temporarily Disabled</td>
</tr>
<tr>
  <td>Test Cases</td>
  <td>Write unit tests for authentication module</td>
  <td>2025-09-26</td>
  <td>Active</td>
</tr>
<tr>
  <td>Deployment</td>
  <td>Deploy latest build on staging server</td>
  <td>2025-09-27</td>
  <td>Inactive</td>
</tr>
<tr>
  <td>Documentation</td>
  <td>Update API documentation with new endpoints</td>
  <td>2025-09-30</td>
  <td>Active</td>
</tr>

        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.dueDate}</td>
              <td>
                <button onClick={() => setEditingTask(task)}>Edit</button>
                <button onClick={() => handleDelete(task.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tasks;