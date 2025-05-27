/* pages/HomePage.tsx */
import React from 'react';
import './css/HomePage.css';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  const handleClick = async () => {
    // 1. Charger dynamiquement le CSS de GamePage
    await import(/* webpackChunkName: "game-css" */ './css/Game.css');
    // 2. Puis naviguer vers la route /game
    navigate('/game');
  };

  return (
    <div className="hp-container">
      <div className="hp-overlay">
        <header className="hp-header">
          <h1>🔒 Escape the Unknown</h1>
          <p className="hp-tagline">Oserez-vous résoudre les énigmes et percer leurs mystères ?</p>
        </header>

        <nav className="hp-nav">
          <button className="hp-btn" onClick={handleClick}>
            <span className="hp-letter">Commencer l'énigme</span>
          </button>
        </nav>

        <section className="hp-intro">
          <h2>Votre défi :</h2>
          <ul>
            <li>Décryptez la combinaison du coffre-fort</li>
            <li>Trouvez le mot caché au cœur du mystère</li>
            <li>Alignez les couleurs dans l’ordre secret</li>
          </ul>
        </section>

        <footer className="hp-footer">
          <p>
            Prêt à plonger ?<br />
            Le temps presse…
          </p>
        </footer>
      </div>
    </div>
  );
}
