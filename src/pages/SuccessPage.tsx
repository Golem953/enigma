import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfileContext } from '../contexts/ProfileContext';

export const SuccessPage: React.FC = () => {
  const { reset } = useProfileContext();
  const navigate = useNavigate();

  const handleRestart = () => {
    reset();
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Victoire Éclatante !</h1>
      <p style={styles.message}>
        Vous avez triomphé de chaque défi : déverrouillé le coffre mystérieux, déchiffré le mot caché
        et révélé l'ordre sacré des couleurs. Votre perspicacité a illuminé l’obscurité.
      </p>
      <p style={styles.subMessage}>
        Portez désormais fièrement ce savoir nouvellement acquis, et poursuivez votre quête
        avec la même ardeur.
      </p>
      <button style={styles.button} onClick={handleRestart}>
        Recommencer l'aventure
      </button>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, rgba(43,88,118,0.5) 0%, rgba(78,67,118,0.5) 100%)',
    color: '#fff',
    textAlign: 'center',
    margin: 0,
    padding: 0,
  },
  title: {
    fontSize: '3rem',
    marginBottom: '16px',
  },
  message: {
    fontSize: '1.25rem',
    lineHeight: 1.5,
    marginBottom: '12px',
  },
  subMessage: {
    fontStyle: 'italic',
    opacity: 0.85,
    marginBottom: '32px',
  },
  button: {
    padding: '12px 24px',
    fontSize: '1rem',
    fontWeight: 600,
    backgroundColor: 'rgba(250,240,137,0.9)',
    color: '#2b5876',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    transition: 'transform 0.1s',
  },
};
