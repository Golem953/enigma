import React, { useEffect } from 'react';
import { StrongBox } from '../components/StrongBox';
import { useProfileContext } from '../contexts/ProfileContext';
import { HiddenWord } from '../components/HiddenWord';
import { ColorButton } from '../components/ColorButton';
import { useNavigate } from 'react-router-dom';
import './css/Game.css';

const App = () => {
  const { reset, enigme1, enigme2, enigme3 } = useProfileContext();
  const navigate = useNavigate();

  // Quand les deux énigmes sont résolues, redirige vers la page de succès
  useEffect(() => {
    if (enigme1 && enigme2 && enigme3) {
      navigate('/success');
    }
  }, [enigme1, enigme2, enigme3, navigate]);

  return (
    <div className="app-container">
      <StrongBox />

      {/* Affiche HiddenWord seulement si enigme1 est true */}
      {enigme1 && <HiddenWord />}

      {/* Affiche ColorButton seulement si enigme2 est true */}
      {enigme2 && <ColorButton />}

      <button className="reset-button" onClick={reset}>
        Réinitialiser la partie
      </button>
    </div>
  );
};

export default App;
