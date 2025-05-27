import React from 'react';
import { StrongBox } from '../components/StrongBox';
import { useProfileContext } from '../contexts/ProfileContext';
import { HiddenWord } from '../components/HiddenWord';
import { ColorButton } from '../components/ColorButton';

const App = () => {
  const { reset } = useProfileContext();

  const handleReset = () => {
    reset();
  };

  return (
    <>
      <StrongBox />
      <HiddenWord />
      <ColorButton />
      
      <button onClick={handleReset}>
        Réinitialiser la partie
      </button>

    </>
  );
};

export default App;
