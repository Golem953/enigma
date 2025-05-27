// App.tsx
import { Routes, Route } from 'react-router-dom';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import './App.css';
import HomePage from './pages/HomePage';

// Composants de page
function Home() {
  return <h2>🏠 Accueil</h2>;
}

function About() {
  return <h2>ℹ️ À propos</h2>;
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/homepage" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
