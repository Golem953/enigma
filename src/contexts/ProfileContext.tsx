import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface interfaceProfileContext {
  enigme1: boolean;
  enigme2: boolean;
  enigme3: boolean;
  setEnigme1: (value: boolean) => void;
  setEnigme2: (value: boolean) => void;
  setEnigme3: (value: boolean) => void;
  reset: () => void;
}

const ProfileContext = createContext<interfaceProfileContext | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [enigme1, setEnigme1] = useState(false);
  const [enigme2, setEnigme2] = useState(false);
  const [enigme3, setEnigme3] = useState(false);

  const reset = () => {
    setEnigme1(false);
    setEnigme2(false);
    setEnigme3(false);
  };

  return (
    <ProfileContext.Provider value={{ enigme1, enigme2, enigme3, setEnigme1, setEnigme2, setEnigme3, reset }}>
      {children}
    </ProfileContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useProfileContext = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useContext void');
  }
  return context;
};

export { ProfileContext };
