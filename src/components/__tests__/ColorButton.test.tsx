import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React, { useState } from 'react';
import { ColorButton } from '../ColorButton';
import { ProfileContext } from '../../contexts/ProfileContext'; // Assure-toi que c'est exporté

// Faux contexte pour les tests
const FakeProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [enigme1, setEnigme1] = useState(false);
  const [enigme2, setEnigme2] = useState(false);
  const [enigme3, setEnigme3] = useState(false);
  const reset = vi.fn();

  return (
    <ProfileContext.Provider value={{
      enigme1,
      enigme2,
      enigme3,
      setEnigme1,
      setEnigme2,
      setEnigme3,
      reset,
    }}>
      {children}
    </ProfileContext.Provider>
  );
};

const renderWithProvider = () =>
  render(
    <FakeProfileProvider>
      <ColorButton />
    </FakeProfileProvider>
  );

describe('ColorButton', () => {
  it('affiche le titre et les instructions', () => {
    renderWithProvider();
    expect(screen.getByText(/Énigme 3/)).toBeInTheDocument();
    expect(screen.getByText(/Répliquez son ordre/)).toBeInTheDocument();
  });

  it('affiche "Succès 🎉" si bonne séquence est saisie', () => {
    renderWithProvider();

    const correctColors = ['Vert', 'Jaune', 'Orange'];

    // Sélection des bonnes couleurs en fonction des labels (ordre non garanti dans le DOM)
    correctColors.forEach(label => {
      const button = screen.getAllByText(label).find(btn => btn.tagName === 'BUTTON');
      expect(button).toBeTruthy();
      fireEvent.click(button!);
    });

    expect(screen.getByText('Succès 🎉')).toBeInTheDocument();
    expect(screen.getByText(/Bravo, vous avez trouvé/)).toBeInTheDocument();
  });

  it('affiche un message d’erreur si mauvaise séquence', () => {
    renderWithProvider();

    const wrongColors = ['Rouge', 'Bleu', 'Violet'];

    wrongColors.forEach(label => {
      const button = screen.getAllByText(label).find(btn => btn.tagName === 'BUTTON');
      expect(button).toBeTruthy();
      fireEvent.click(button!);
    });

    expect(screen.getByText(/Ce n’est pas bon/)).toBeInTheDocument();
    expect(screen.queryByText('Succès 🎉')).not.toBeInTheDocument();
  });

  it('réinitialise la sélection', () => {
    renderWithProvider();

    const buttonVert = screen.getAllByText('Vert').find(btn => btn.tagName === 'BUTTON');
    fireEvent.click(buttonVert!);
    const saisieContainer = screen.getByText('Saisie:').parentElement!;
expect(saisieContainer.textContent).toContain('Vert');

    fireEvent.click(screen.getByText(/Réinitialiser la sélection/));
    expect(screen.getByText(/Saisie:/).textContent).toBe('Saisie: ');
  });
});
