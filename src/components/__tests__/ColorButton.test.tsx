import React from 'react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ColorButton } from '../ColorButton';
import * as ProfileContext from '../../contexts/ProfileContext';

describe('ColorButton Component (TDD)', () => {
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

  test('renders all color buttons, initial codes empty and Var3 false', () => {
    render(<ColorButton />);
    ['Jaune', 'Bleu', 'Rouge', 'Vert', 'Orange'].forEach((label) => {
      expect(screen.getByRole('button', { name: label })).toBeInTheDocument();
    });
    expect(screen.getByText(/Codes:/)).toHaveTextContent('Codes:');
    expect(screen.getByText(/Var3:/)).toHaveTextContent('Var3: false');
    expect(setEnigme3Mock).not.toHaveBeenCalled();
  });

  test("clicking wrong sequence calls setEnigme3(false) on each click", async () => {
    render(<ColorButton />);
    const user = userEvent.setup();
    const rouge = screen.getByRole('button', { name: 'Rouge' });
    const orange = screen.getByRole('button', { name: 'Orange' });
    const jaune = screen.getByRole('button', { name: 'Jaune' });

    // Wrong order: Rouge -> Orange -> Jaune
    await user.click(rouge);
    await user.click(orange);
    await user.click(jaune);

    // Component calls setEnigme3(false) on each non-matching click
    expect(setEnigme3Mock).toHaveBeenCalledTimes(3);
    setEnigme3Mock.mock.calls.forEach((call) => {
      expect(call[0]).toBe(false);
    });
    expect(screen.getByText(/Var3:/)).toHaveTextContent('Var3: false');
  });

  test('correct sequence Rouge -> Jaune -> Orange triggers setEnigme3 and updates codes', async () => {
    render(<ColorButton />);
    const user = userEvent.setup();
    const rouge = screen.getByRole('button', { name: 'Rouge' });
    const jaune = screen.getByRole('button', { name: 'Jaune' });
    const orange = screen.getByRole('button', { name: 'Orange' });

    await user.click(rouge);
    await user.click(jaune);
    await user.click(orange);

    expect(setEnigme3Mock).toHaveBeenCalledWith(true);
    expect(screen.getByText(/Codes:/)).toHaveTextContent('Codes: Ro, Ja, Or');
    // The context mock is static, so Var3 UI won't update in this test environment
  });
});