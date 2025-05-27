import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { ProfileProvider, useProfileContext } from '../ProfileContext';

describe('MyBooleanContext', () => {
  const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <ProfileProvider>{children}</ProfileProvider>
  );

  test('valeurs initiales à false', () => {
    const { result } = renderHook(() => useProfileContext(), { wrapper });

    expect(result.current.enigme1).toBe(false);
    expect(result.current.enigme2).toBe(false);
    expect(result.current.enigme3).toBe(false);
  });

  test('setVar1 change var1 à true', () => {
    const { result } = renderHook(() => useProfileContext(), { wrapper });

    act(() => {
      result.current.setEnigme1(true);
    });

    expect(result.current.enigme1).toBe(true);
  });

  test('reset remet toutes les variables à false', () => {
    const { result } = renderHook(() => useProfileContext(), { wrapper });

    act(() => {
      result.current.setEnigme1(true);
      result.current.setEnigme2(true);
      result.current.setEnigme3(true);
    });

    expect(result.current.enigme1).toBe(true);
    expect(result.current.enigme2).toBe(true);
    expect(result.current.enigme3).toBe(true);

    act(() => {
      result.current.reset();
    });

    expect(result.current.enigme1).toBe(false);
    expect(result.current.enigme2).toBe(false);
    expect(result.current.enigme3).toBe(false);
  });
});
