import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React, { useState } from 'react';
import { HiddenWord } from '../HiddenWord';
import { ProfileContext } from '../../contexts/ProfileContext'; // <- nécessite l’export de ProfileContext

// Faux provider pour injecter le contexte
const FakeProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [enigme1, setEnigme1] = useState(false);
  const [enigme2, setEnigme2] = useState(false);
  const [enigme3, setEnigme3] = useState(false);
  const reset = vi.fn();

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
      <HiddenWord />
    </FakeProfileProvider>
  );

describe('HiddenWord', () => {
  it('affiche le titre et le champ', () => {
    renderWithProvider();
    expect(screen.getByText("L'Énigme du Grimoire")).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Entrez votre réponse')).toBeInTheDocument();
  });

  it('affiche les indices progressivement après des erreurs', () => {
    renderWithProvider();
    const input = screen.getByPlaceholderText('Entrez votre réponse') as HTMLInputElement;
    const button = screen.getByText('Valider');

    fireEvent.change(input, { target: { value: 'mauvais' } });
    fireEvent.click(button);
    expect(screen.getByText(/commence par 'M'/)).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'autre' } });
    fireEvent.click(button);
    expect(screen.getByText(/reste caché/)).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'encore' } });
    fireEvent.click(button);
    expect(screen.getByText(/compte 7 lettres/)).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'fail' } });
    fireEvent.click(button);
    expect(screen.getByText(/clé pour lever le voile/)).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'nope' } });
    fireEvent.click(button);
    expect(screen.getByText(/Plus d'indices/)).toBeInTheDocument();
  });

  it('valide la bonne réponse et affiche le succès', () => {
    renderWithProvider();
    const input = screen.getByPlaceholderText('Entrez votre réponse');
    const button = screen.getByText('Valider');

    fireEvent.change(input, { target: { value: 'MYSTERE' } });
    fireEvent.click(button);

    expect(screen.getByText(/🎉 Bravo/)).toBeInTheDocument();
    expect(screen.queryByText(/indice/)).not.toBeInTheDocument(); // plus d'indices
  });
});
