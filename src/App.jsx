import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState(() => {
    // Stage E: Data Persistence. Load from LocalStorage on initial boot.
    const saved = localStorage.getItem('eisenhower-tasks');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [title, setTitle] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);
  const [isImportant, setIsImportant] = useState(false);

  // Save to LocalStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('eisenhower-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = {
      id: crypto.randomUUID(),
      title,
      isUrgent,
      isImportant
    };

    setTasks([...tasks, newTask]);
    setTitle(''); // Reset form
    setIsUrgent(false);
    setIsImportant(false);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Stage E: Meaningful Application Logic (Filtering into quadrants)
  const doFirst = tasks.filter(t => t.isUrgent && t.isImportant);
  const schedule = tasks.filter(t => !t.isUrgent && t.isImportant);
  const delegate = tasks.filter(t => t.isUrgent && !t.isImportant);
  const dontDo = tasks.filter(t => !t.isUrgent && !t.isImportant);

  const Quadrant = ({ title, color, items }) => (
    <div className={`quadrant ${color}`}>
      <h3>{title}</h3>
      {items.length === 0 ? <p className="empty">No tasks</p> : null}
      <ul>
        {items.map(task => (
          <li key={task.id}>
            {task.title}
            <button onClick={() => deleteTask(task.id)} className="delete-btn">X</button>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="container">
      <header>
        <h1>Eisenhower Matrix Prioritizer</h1>
        <p>A decision-making tool for your end-term project.</p>
      </header>

      <form onSubmit={addTask} className="task-form">
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="What needs to be done?" 
          required 
        />
        <div className="checkboxes">
          <label>
            <input type="checkbox" checked={isUrgent} onChange={(e) => setIsUrgent(e.target.checked)} />
            Urgent
          </label>
          <label>
            <input type="checkbox" checked={isImportant} onChange={(e) => setIsImportant(e.target.checked)} />
            Important
          </label>
        </div>
        <button type="submit">Add Task</button>
      </form>

      <div className="matrix-grid">
        <Quadrant title="Do First (Urgent & Important)" color="green" items={doFirst} />
        <Quadrant title="Schedule (Not Urgent & Important)" color="blue" items={schedule} />
        <Quadrant title="Delegate (Urgent & Not Important)" color="orange" items={delegate} />
        <Quadrant title="Don't Do (Not Urgent & Not Important)" color="red" items={dontDo} />
      </div>
    </div>
  )
}

export default App