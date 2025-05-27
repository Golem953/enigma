import React, { useState, useEffect } from 'react';
import { useProfileContext } from '../contexts/ProfileContext';

interface ColorOption {
  label: string;
  code: string;
  hex: string;
}

const sequenceColors: ColorOption[] = [
  { label: 'Vert', code: 'Vert', hex: '#48bb78' },
  { label: 'Jaune', code: 'Jaune', hex: '#faf089' },
  { label: 'Orange', code: 'Orange', hex: '#ed8936' },
];
const extraColors: ColorOption[] = [
  { label: 'Rouge', code: 'Rouge', hex: '#f56565' },
  { label: 'Bleu', code: 'Bleu', hex: '#4299e1' },
  { label: 'Violet', code: 'Violet', hex: '#9f7aea' },
];
const allColors = [...sequenceColors, ...extraColors];

type ShuffleFn = <T>(array: T[]) => T[];
const shuffleArray: ShuffleFn = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export const ColorButton: React.FC = () => {
  const { enigme3, setEnigme3 } = useProfileContext();
  const [inputSeq, setInputSeq] = useState<string[]>([]);
  const [hints, setHints] = useState<string>('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [shuffledColors, setShuffledColors] = useState<ColorOption[]>(() => shuffleArray(allColors));

  const instructions =
    'Dans le halo sacré du cercle, une séquence de glyphes anciennes surgit. Répliquez son ordre en effleurant les boutons correspondants ; et si votre main dévie, l’ombre vous murmurera votre erreur. Que votre esprit perce le secret !';
  const titleText = 'Énigme 3 : Séquence Couleurs';
  const correctSequence = sequenceColors.map((c) => c.code);

  useEffect(() => {
    setInputSeq([]);
    setEnigme3(false);
    setHints('');
    setIsAnimating(true);
  }, [setEnigme3]);

  const handleAnimationEnd = () => setIsAnimating(false);

  const handleButtonClick = (color: ColorOption) => {
    const newSeq = [...inputSeq, color.code];
    setInputSeq(newSeq);
    setHints('');

    if (newSeq.length === correctSequence.length) {
      const isCorrect = newSeq.every((code, idx) => code === correctSequence[idx]);

      if (isCorrect) {
        setEnigme3(true);
        setHints('Bravo, vous avez trouvé la séquence complète ! 🎉');
      } else {
        setEnigme3(false);
        setHints('Ce n’est pas bon, réessayez.');
        const keepFirst = newSeq[0] === correctSequence[0];
        const keepSecond = newSeq[1] === correctSequence[1];
        if (keepSecond) setInputSeq([newSeq[0], newSeq[1]]);
        else if (keepFirst) setInputSeq([newSeq[0]]);
        else setInputSeq([]);
      }
    }
  };

  const replaySequence = () => {
    setInputSeq([]);
    setEnigme3(false);
    setHints('');
    setIsAnimating(false);
    setShuffledColors(shuffleArray(allColors));
    requestAnimationFrame(() => setIsAnimating(true));
  };

  // Affichage direct de l'historique des clics, y compris la 3ème couleur sélectionnée
  const displaySeq = inputSeq;

  // Styles
  const container: React.CSSProperties = {
    padding: '32px',
    maxWidth: '540px',
    margin: '0 auto',
    textAlign: 'center',
    backgroundColor: '#1a1a2e',
    color: '#f0f0f5',
    boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
    borderRadius: '16px',
    minHeight: '560px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  };
  const titleStyle: React.CSSProperties = {
    fontSize: '1.75rem',
    fontWeight: 700,
    marginBottom: '12px',
  };
  const introStyle: React.CSSProperties = {
    fontStyle: 'italic',
    color: '#A0AEC0',
    marginBottom: '24px',
  };
  const circle: React.CSSProperties = {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    border: '4px solid #ccc',
    margin: '0 auto 24px',
    backgroundColor: '#fff',
  };
  const grid: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    margin: '0 auto 24px',
    maxWidth: '320px',
  };
  const buttonStyle: React.CSSProperties = {
    color: '#fff',
    fontWeight: 600,
    padding: '12px 0',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'transform 0.1s',
  };
  const replayStyle: React.CSSProperties = {
    ...buttonStyle,
    width: '180px',
    backgroundColor: '#555',
    margin: '0 auto 16px',
  };
  const feedbackContainer: React.CSSProperties = {
    minHeight: '72px',
    marginTop: '8px',
  };
  const statusStyle: React.CSSProperties = {
    fontWeight: 600,
    marginTop: '8px',
    fontSize: '1rem',
  };
  const hintStyle: React.CSSProperties = {
    fontStyle: 'italic',
    marginTop: '8px',
    color: '#faf089',
  };

  return (
    <div style={container}>
      <div>
        <h2 style={titleStyle}>{titleText}</h2>
        <p style={introStyle}>{instructions}</p>
      </div>

      <style>{`
        @keyframes showSeq {
          0%   { background-color: ${sequenceColors[0].hex}; }
          33%  { background-color: ${sequenceColors[1].hex}; }
          66%  { background-color: ${sequenceColors[2].hex}; }
          67%  { background-color: #fff; }
          100% { background-color: #fff; }
        }
      `}</style>

      <div>
        <div
          style={{ ...circle, animation: isAnimating ? 'showSeq 3s ease-in-out infinite' : 'none' }}
          onAnimationEnd={handleAnimationEnd}
        />

        <div style={grid}>
          {shuffledColors.map((color) => {
            const isSelected = inputSeq.includes(color.code);
            return (
              <button
                key={color.code}
                onClick={() => handleButtonClick(color)}
                style={{
                  ...buttonStyle,
                  backgroundColor: color.hex,
                  border: isSelected ? '4px solid #faf089' : 'none',
                  transform: isSelected ? 'scale(1.05)' : 'none',
                }}
              >
                {color.label}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <button onClick={replaySequence} style={replayStyle}>
          Réinitialiser la sélection
        </button>
        <div style={feedbackContainer}>
          <div>
            Saisie: <span>{displaySeq.join(' - ')}</span>
          </div>
          <div style={statusStyle}>{enigme3 ? 'Succès 🎉' : ''}</div>
          <div style={hintStyle}>{hints}</div>
        </div>
      </div>
    </div>
  );
};
