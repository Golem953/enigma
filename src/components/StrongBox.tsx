import React, { useState } from 'react';
import { useProfileContext } from '../contexts/ProfileContext';

const SECRET_CODE = '1234';
const DIGITS = ['1','2','3','4','5','6','7','8','9','0'];

export const StrongBox: React.FC = () => {
  const { enigme1, setEnigme1 } = useProfileContext();
  const [inputValue, setInputValue] = useState<string>('');
  const [hint, setHint] = useState<string>('');

  // Réinitialisation : on conserve les bons chiffres et on indique "plus grand"/"plus petit"
  const resetGame = (wrongIndex: number, triedDigit: string) => {
    const correctDigit = parseInt(SECRET_CODE[wrongIndex], 10);
    const tried = parseInt(triedDigit, 10);
    const comparaison = tried > correctDigit ? 'plus grand' : 'plus petit';
    setHint(`Le chiffre ${triedDigit} est ${comparaison}.`);
  };

  const handleButtonClick = (digit: string) => {
    if (enigme1) return;
    const currentIndex = inputValue.length;
    const expectedDigit = SECRET_CODE[currentIndex];

    if (digit === expectedDigit) {
      const newValue = inputValue + digit;
      setInputValue(newValue);
      if (newValue === SECRET_CODE) {
        setEnigme1(true);
        setHint('');
      }
    } else {
      resetGame(currentIndex, digit);
    }
  };

  // Styles
  const container: React.CSSProperties = {
    padding: '50px 100px',
    maxWidth: '480px',
    margin: '0 auto',
    textAlign: 'center',
    background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
    color: '#f1f1f1',
    boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
    borderRadius: '12px',
    minHeight: '460px'
  };
  const title: React.CSSProperties = {
    fontSize: '1.6rem',
    fontWeight: 600,
    marginBottom: '8px',
    color: 'white'
  };
  const introStyle: React.CSSProperties = {
    fontStyle: 'italic',
    color: '#A0AEC0',
    marginBottom: '24px'
  };
  const instructionsStyle: React.CSSProperties = {
    fontSize: '1rem',
    color: '#CBD5E1',
    marginBottom: '24px',
    lineHeight: 1.4,
    textAlign: 'left'
  };
  const inputStyle: React.CSSProperties = {
    width: '100%',
    textAlign: 'center',
    fontSize: '1.25rem',
    fontFamily: 'monospace',
    border: '2px solid #D1D5DB',
    borderRadius: '8px',
    padding: '8px 0',
    marginBottom: '16px'
  };
  const grid: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '12px',
    marginBottom: '16px'
  };
  const buttonStyle: React.CSSProperties = {
    width: '48px',
    height: '48px',
    backgroundColor: '#F3F4F6',
    border: 'none',
    borderRadius: '50%',
    fontSize: '1rem',
    fontWeight: 700,
    cursor: 'pointer'
  };
  const resetContainer: React.CSSProperties = { marginBottom: '16px' };
  const resetButton: React.CSSProperties = {
    fontSize: '0.875rem',
    color: '#4F46E5',
    background: 'none',
    border: 'none',
    cursor: 'pointer'
  };
  const hintContainer: React.CSSProperties = {
    minHeight: '48px',
    marginTop: '16px'
  };
  const hintText: React.CSSProperties = {
    color: '#D97706',
    margin: 0
  };
  const successText: React.CSSProperties = {
    color: '#059669',
    fontWeight: 600,
    margin: 0
  };

  return (
    <div style={container}>
      <h2 style={title}>🔒 L'Enigme du coffre-fort</h2>
      <p style={introStyle}>
        « Une énigme ancienne repose sur quatre chiffres scellés. Inscrivez le code secret à quaternité chiffrée, et à chaque fausse porte franchie, l’ombre chuchotera si votre chiffre songe trop haut… ou trop bas. Que la providence éclaire votre route ! »
      </p>

      <input
        type="text"
        readOnly
        value={inputValue}
        placeholder="Code secret"
        style={inputStyle}
      />

      <div style={grid}>
        {DIGITS.map((digit) => (
          <button
            key={digit}
            onClick={() => handleButtonClick(digit)}
            disabled={enigme1}
            style={buttonStyle}
          >
            {digit}
          </button>
        ))}
      </div>

      <div style={resetContainer}>
        <button
          onClick={() => { setInputValue(''); setHint(''); setEnigme1(false); }}
          style={resetButton}
        >
          Réinitialiser
        </button>
      </div>

      <div style={hintContainer}>
        {!enigme1 && hint && <p style={hintText}>{hint}</p>}
        {enigme1 && <p style={successText}>Succès 🎉 ! Code correct.</p>}
      </div>
    </div>
  );
};
