import React from 'react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HiddenWord } from '../HiddenWord';
import * as ProfileContext from '../../contexts/ProfileContext';

describe('HiddenWord Component', () => {
  let setEnigme1Mock: ReturnType<typeof vi.fn>;
  let setEnigme2Mock: ReturnType<typeof vi.fn>;
  let setEnigme3Mock: ReturnType<typeof vi.fn>;
  let resetMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    setEnigme1Mock = vi.fn();
    setEnigme2Mock = vi.fn();
    setEnigme3Mock = vi.fn();
    resetMock = vi.fn();

    vi.spyOn(ProfileContext, 'useProfileContext').mockReturnValue({
      enigme1: false,
      enigme2: false,
      enigme3: false,
      setEnigme1: setEnigme1Mock,
      setEnigme2: setEnigme2Mock,
      setEnigme3: setEnigme3Mock,
      reset: resetMock,
    });
  });

  test('renders input and initial Var1: false', () => {
    render(<HiddenWord />);
    const input = screen.getByPlaceholderText('Entrez le code');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('');
    expect(screen.getByText('Var1: false')).toBeInTheDocument();
    expect(setEnigme2Mock).not.toHaveBeenCalled();
  });

  test("typing wrong code doesn't call setEnigme2", async () => {
    render(<HiddenWord />);
    const input = screen.getByPlaceholderText('Entrez le code');
    const user = userEvent.setup();

    await user.clear(input);
    await user.type(input, 'wrong');

    expect(input).toHaveValue('wrong');
    expect(screen.getByText('Var1: false')).toBeInTheDocument();
    expect(setEnigme2Mock).not.toHaveBeenCalled();
  });

  test('typing "test" calls setEnigme2(true)', async () => {
    render(<HiddenWord />);
    const input = screen.getByPlaceholderText('Entrez le code');
    const user = userEvent.setup();

    await user.clear(input);
    await user.type(input, 'test');

    expect(setEnigme2Mock).toHaveBeenCalledTimes(1);
    expect(setEnigme2Mock).toHaveBeenCalledWith(true);
  });
});