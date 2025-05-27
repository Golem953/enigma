import React from 'react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StrongBox } from '../StrongBox';
import * as ProfileContext from '../../contexts/ProfileContext';

describe('StrongBox Component', () => {
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

  test('renders input and initial Var2: false', () => {
    render(<StrongBox />);
    const input = screen.getByPlaceholderText('Entrez le code');
    expect(input).toBeInTheDocument();
    expect(screen.getByText('Var2: false')).toBeInTheDocument();
  });

  test('updates input value without calling setEnigme1 for incorrect code', async () => {
    render(<StrongBox />);
    const input = screen.getByPlaceholderText('Entrez le code');
    const user = userEvent.setup();

    await user.clear(input);
    await user.type(input, '1111');
    expect(input).toHaveValue('1111');
    expect(setEnigme1Mock).not.toHaveBeenCalled();
  });

  test('calls setEnigme1(true) when correct code is entered', async () => {
    render(<StrongBox />);
    const input = screen.getByPlaceholderText('Entrez le code');
    const user = userEvent.setup();

    await user.clear(input);
    await user.type(input, '1234');
    expect(setEnigme1Mock).toHaveBeenCalledTimes(1);
    expect(setEnigme1Mock).toHaveBeenCalledWith(true);
  });
}); 
