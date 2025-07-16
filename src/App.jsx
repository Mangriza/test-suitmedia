// src/App.jsx
import './App.css'; // Kalau ada CSS global
import HomePage from './pages/HomePage'; // Import komponen HomePage

function App() {
  return (
    <div className="App">
      {/* Di sini nanti akan ada Header, Banner, dll. */}
      <HomePage /> {/* Render komponen HomePage di sini */}
    </div>
  );
}

export default App;