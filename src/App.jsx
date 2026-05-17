import React, { useState } from 'react';

function App() {
  // --- JAVASCRIPT: State & Logic ---
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React fundamentals', completed: true },
    { id: 2, text: 'Master advanced useEffect patterns', completed: false },
  ]);
  const [inputValue, setInputValue] = useState('');
  
  // Theme state: false = Light Mode, true = Dark Mode
  const [darkMode, setDarkMode] = useState(false);

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newTodo = {
      id: Date.now(),
      text: inputValue,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  const handleToggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // --- HTML UI: Structure (JSX) ---
  return (
    // Dynamically applies "dark-mode" class to the whole viewport wrapper
    <div className={`page-wrapper ${darkMode ? 'dark-mode' : ''}`}>
      
      <div className="app-container">
        {/* Header with Theme Toggle */}
        <div className="header">
          <h2 className="title">My Task Manager</h2>
          <button onClick={toggleTheme} className="theme-toggle-btn">
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
        
        {/* Input Form */}
        <form onSubmit={handleAddTodo} className="todo-form">
          <input
            type="text"
            placeholder="What needs to be done?"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="todo-input"
          />
          <button type="submit" className="add-button">
            Add
          </button>
        </form>

        {/* Todo List */}
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className="todo-item">
              <div className="todo-content">
                {/* Checkbox Input */}
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleTodo(todo.id)}
                  className="todo-checkbox"
                />
                <span
                  onClick={() => handleToggleTodo(todo.id)}
                  className={`todo-text ${todo.completed ? 'completed' : ''}`}
                >
                  {todo.text}
                </span>
              </div>
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                className="delete-button"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}

export default App;