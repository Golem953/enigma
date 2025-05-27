import React, { useState } from 'react';
import { useProfileContext } from '../contexts/ProfileContext';

// Mot à deviner
const HIDDEN_WORD = 'MYSTERE';

// Styles inline
const container: React.CSSProperties = {
  padding: '24px',
  maxWidth: '480px',
  margin: '0 auto',
  background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)', // Fond mystérieux
  borderRadius: '16px',
  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  color: '#fff',
  textAlign: 'center',
};

const title: React.CSSProperties = {
  fontSize: '1.5rem',
  fontWeight: 700,
  marginBottom: '16px',
};

const intro: React.CSSProperties = {
  fontStyle: 'italic',
  marginBottom: '24px',
};

const form: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const inputStyle: React.CSSProperties = {
  padding: '12px 16px',
  marginBottom: '16px',
  borderRadius: '8px',
  border: 'none',
  fontSize: '1rem',
  color: '#1f2937',
  width: '100%',
  boxSizing: 'border-box',
};

const buttonStyle: React.CSSProperties = {
  padding: '12px 24px',
  backgroundColor: '#facc15',
  border: 'none',
  borderRadius: '8px',
  fontSize: '1rem',
  fontWeight: 600,
  cursor: 'pointer',
};

const hintBox: React.CSSProperties = {
  marginTop: '24px',
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  padding: '16px',
  borderRadius: '8px',
};

const statusStyle: React.CSSProperties = {
  marginTop: '16px',
  color: '#bbf7d0',
  fontWeight: 700,
};

export const HiddenWord: React.FC = () => {
  const { setEnigme2 } = useProfileContext();
  const [inputValue, setInputValue] = useState('');
  const [hintIndex, setHintIndex] = useState(0);
  const [hint, setHint] = useState('Bienvenue, jeune aventurier...');
  const [status, setStatus] = useState('');

  // Histoire et indices progressifs
  const hints = [
    "🕯️ Dans un vieux grimoire, on lit que le mot commence par 'M'.",
    '🔮 Il évoque ce qui reste caché derrière le visible.',
    "📜 Il se termine par 'E' et compte 7 lettres.",
    "🗝️ C'est la clé pour lever le voile du secret !",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.toUpperCase() === HIDDEN_WORD) {
      setStatus('🎉 Bravo ! Vous avez trouvé le mot.');
      setHint('');
      setEnigme2(true);
    } else {
      if (hintIndex < hints.length) {
        setHint(hints[hintIndex]);
        setHintIndex(hintIndex + 1);
      } else {
        setHint("🤔 Plus d'indices... Réessayez !");
      }
      setStatus('');
      setInputValue('');
    }
  };

  return (
    <div style={container}>
      <h2 style={title}>L'Énigme du Grimoire</h2>
      <p style={intro}>
        « Une légende parle d'un mot oublié, gardé par l'obscurité. Oserez-vous percer son mystère ? »
      </p>
      <form onSubmit={handleSubmit} style={form}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Entrez votre réponse"
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>
          Valider
        </button>
      </form>

      {hint && <p style={hintBox}>{hint}</p>}
      {status && <p style={statusStyle}>{status}</p>}
    </div>
  );
};
