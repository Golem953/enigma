import React, { useState } from 'react';
import { useProfileContext } from '../contexts/ProfileContext';

export const HiddenWord = () => {
  const { enigme2, setEnigme2 } = useProfileContext();
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    const val = e.target.value;
    setInputValue(val);
    if (val === 'test') {
      setEnigme2(true);
    }
  };

  return (
    <div>
      {/* Nouveau champ texte */}
      <input type="text" value={inputValue} onChange={handleInputChange} placeholder="Entrez le code" />
      <p>Var1: {enigme2 ? 'true' : 'false'}</p>
      {/* <p>Var2: {enigme2 ? 'true' : 'false'}</p>
      <p>Var3: {enigme3 ? 'true' : 'false'}</p>.<button onClick={() => setEnigme1(true)}>Set Var1 true</button>
      <button onClick={() => setEnigme2(true)}>Set Var2 true</button>
      <button onClick={() => setEnigme3(true)}>Set Var3 true</button>
      <button onClick={reset}>Reset all to false</button> */}
    </div>
  ); 
};
