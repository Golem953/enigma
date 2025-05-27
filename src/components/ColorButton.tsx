import React, { useState, useEffect } from 'react';
import { useProfileContext } from '../contexts/ProfileContext';

export const ColorButton: React.FC = () => {
  const { enigme3, setEnigme3 } = useProfileContext();
  const [codes, setCodes] = useState<string[]>([]);

  useEffect(() => {
    // Reset codes on mount
    setCodes([]);
  }, []);

  const handleColorClick = (label: string): void => {
    const code = label.slice(0, 2);

    setCodes((prev: string[]) => {
      const newCodes = [...prev, code].slice(-3);

      // Sequence: Rouge -> Jaune -> Orange
      if (
        newCodes.length === 3 &&
        newCodes[0] === 'Ro' &&
        newCodes[1] === 'Ja' &&
        newCodes[2] === 'Or'
      ) {
        setEnigme3(true);
      }else{
        setEnigme3(false)
      }

      return newCodes;
    });
  };

  interface Color {
    label: string;
    css: string;
  }

  const colors: Color[] = [
    { label: 'Jaune', css: 'yellow' },
    { label: 'Bleu', css: 'blue' },
    { label: 'Rouge', css: 'red' },
    { label: 'Vert', css: 'green' },
    { label: 'Orange', css: 'orange' },
  ];

  return (
    <div className="p-4">
      <div className="flex space-x-2 mb-4">
        {colors.map((color) => (
          <button
            key={color.label}
            onClick={() => handleColorClick(color.label)}
            style={{ backgroundColor: color.css, color: '#fff' }}
            className="px-4 py-2 rounded"
          >
            {color.label}
          </button>
        ))}
      </div>

      <p className="mb-2">
        Codes: <span className="font-semibold">{codes.join(', ')}</span>
      </p>
      <p>
        Var3: <span className="font-semibold">{enigme3 ? 'true' : 'false'}</span>
      </p>
    </div>
  );
};
