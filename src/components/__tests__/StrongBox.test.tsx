import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React, { useState } from 'react';
import { StrongBox } from '../StrongBox';
import { ProfileContext } from '../../contexts/ProfileContext'; // après export de ProfileContext

const FakeProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [enigme1, setEnigme1] = useState(false);
  const [enigme2, setEnigme2] = useState(false);
  const [enigme3, setEnigme3] = useState(false);

  const reset = vi.fn(); // mock ou une vraie logique selon le test

  return (
    <ProfileContext.Provider
      value={{
        enigme1,
        enigme2,
        enigme3,
        setEnigme1,
        setEnigme2,
        setEnigme3,
        reset,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

const renderWithProvider = () =>
  render(
    <FakeProfileProvider>
      <StrongBox />
    </FakeProfileProvider>
  );

// Exemples de tests ci-dessous
describe('StrongBox', () => {
  it('affiche le titre', () => {
    renderWithProvider();
    expect(screen.getByText("🔒 L'Enigme du coffre-fort")).toBeInTheDocument();
  });

  it('accepte le bon code', () => {
    renderWithProvider();
    ['1', '2', '3', '4'].forEach((d) => fireEvent.click(screen.getByText(d)));
    expect(screen.getByText('Succès 🎉 ! Code correct.')).toBeInTheDocument();
  });

  it('affiche un indice si chiffre incorrect', () => {
    renderWithProvider();
    fireEvent.click(screen.getByText('5')); // 5 > 1
    expect(screen.getByText(/plus grand/)).toBeInTheDocument();
  });

  it('réinitialise le jeu', () => {
    renderWithProvider();
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('Réinitialiser'));
    expect(screen.getByPlaceholderText('Code secret')).toHaveValue('');
  });
});
