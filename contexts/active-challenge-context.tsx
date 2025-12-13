"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { Challenge } from "@/lib/challenges/data";

type ActiveChallengeContextType = {
  activeChallenge: Challenge | null;
  setActiveChallenge: (challenge: Challenge) => void;
  clearActiveChallenge: () => void;
};

const ActiveChallengeContext = createContext<ActiveChallengeContextType | null>(
  null
);

const STORAGE_KEY = "active-challenge";

export function ActiveChallengeProvider({ children }: { children: ReactNode }) {
  const [activeChallenge, setActiveChallengeState] = useState<Challenge | null>(
    null
  );
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setActiveChallengeState(parsed);
      }
    } catch {
      // Ignore parse errors
    }
    setIsHydrated(true);
  }, []);

  // Persist to localStorage when active challenge changes
  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    if (activeChallenge) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(activeChallenge));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [activeChallenge, isHydrated]);

  const setActiveChallenge = useCallback((challenge: Challenge) => {
    setActiveChallengeState(challenge);
  }, []);

  const clearActiveChallenge = useCallback(() => {
    setActiveChallengeState(null);
  }, []);

  return (
    <ActiveChallengeContext.Provider
      value={{
        activeChallenge,
        setActiveChallenge,
        clearActiveChallenge,
      }}
    >
      {children}
    </ActiveChallengeContext.Provider>
  );
}

export function useActiveChallenge() {
  const context = useContext(ActiveChallengeContext);
  if (!context) {
    throw new Error(
      "useActiveChallenge must be used within an ActiveChallengeProvider"
    );
  }
  return context;
}
