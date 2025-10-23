import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

// Shape of an achievement
// id: string
// title: string
// description: string
// unlocked: bool
// unlockedAt: ISO string | null

const AchievementsContext = createContext(null);

const STORAGE_KEY = 'yk-achievements-v1';

const initialAchievements = [
  {
    id: 'first-visit',
    title: 'first visit',
    description: 'you found the achievements page :D',
    unlocked: false,
    unlockedAt: null,
  },
  {
    id: 'secret-click',
    title: 'yk go spinnn',
    description: 'you clicked the yk logo and it went spinnn',
    unlocked: false,
    unlockedAt: null,
  },
  {
    id: 'night-owl',
    title: 'night owl',
    description: 'visited after midnight. go to bed bruh',
    unlocked: false,
    unlockedAt: null,
  },
  {
    id: 'emoji-master',
    title: 'yak lover',
    description: 'cycled through every yak emoji in the hero.',
    unlocked: false,
    unlockedAt: null,
  },
];

function loadAchievements() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialAchievements;
    const parsed = JSON.parse(raw);
    // merge with any new achievements added later
    const map = new Map(parsed.map(a => [a.id, a]));
    return initialAchievements.map(def => map.get(def.id) || def);
  } catch (e) {
    console.warn('Failed to parse achievements, resetting', e);
    return initialAchievements;
  }
}

export function AchievementsProvider({ children }) {
  const [achievements, setAchievements] = useState(() => loadAchievements());
  const [justUnlocked, setJustUnlocked] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(achievements));
  }, [achievements]);

  const unlock = useCallback((id) => {
    setAchievements(prev => prev.map(a => {
      if (a.id === id && !a.unlocked) {
        const updated = { ...a, unlocked: true, unlockedAt: new Date().toISOString() };
        setJustUnlocked(updated);
        return updated;
      }
      return a;
    }));
  }, []);

  // Auto unlock first-visit on mount of provider (first render in session)
  useEffect(() => {
    unlock('first-visit');
  }, [unlock]);

  useEffect(() => {
    if (!justUnlocked) return;
    const t = setTimeout(() => setJustUnlocked(null), 4000);
    return () => clearTimeout(t);
  }, [justUnlocked]);

  return (
    <AchievementsContext.Provider value={{ achievements, unlock }}>
      {children}
      {justUnlocked && (
        <div className="z-50 toast toast-center">
          <div className="shadow-lg alert alert-success">
            <span>
              Achievement Unlocked: <strong>{justUnlocked.title}</strong>
            </span>
          </div>
        </div>
      )}
    </AchievementsContext.Provider>
  );
}

AchievementsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useAchievements() {
  const ctx = useContext(AchievementsContext);
  if (!ctx) throw new Error('useAchievements must be used within AchievementsProvider');
  return ctx;
}
