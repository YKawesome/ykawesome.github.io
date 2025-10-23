import { motion } from 'framer-motion';
import { useAchievements } from '../../context/AchievementsContext';

export default function Achievements() {
  const { achievements } = useAchievements();
  const unlocked = achievements.filter(a => a.unlocked).sort((a,b)=> a.title.localeCompare(b.title));
  const locked = achievements.filter(a => !a.unlocked).sort((a,b)=> a.title.localeCompare(b.title));
  const total = achievements.length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="min-h-screen bg-base-100"
    >
      <div className="hero min-h-[30vh]">
        <div className="hero-overlay bg-opacity-70" />
        <div className="text-center hero-content text-neutral-content">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">achievements</h1>
            <p className="mt-4 text-lg opacity-90">you must be fun &gt;:)</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl px-4 py-12 mx-auto sm:px-6 space-y-14">
        <div>
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="text-xl font-semibold tracking-tight">Unlocked ({unlocked.length}/{total})</h2>
            {unlocked.length === total && <span className="badge badge-accent">All Complete!</span>}
          </div>
          {unlocked.length === 0 ? (
            <p className="text-sm opacity-60">No achievements yet—explore the site to find some.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {unlocked.map(a => (
                <div key={a.id} className="overflow-hidden border shadow-xl card border-base-300/40 bg-base-200/50 backdrop-blur rounded-xl">
                  <div className="card-body">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="flex-1 text-lg card-title text-base-content">{a.title}</h3>
                      <span className="badge badge-success badge-outline">Unlocked</span>
                    </div>
                    <p className="text-sm leading-relaxed opacity-80">{a.description}</p>
                    {a.unlockedAt && (
                      <p className="mt-2 text-xs opacity-60">{new Date(a.unlockedAt).toLocaleString()}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="text-xl font-semibold tracking-tight">Locked ({locked.length})</h2>
          </div>
          {locked.length === 0 ? (
            <p className="text-sm opacity-60">Nothing locked—nice work!</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {locked.map(a => (
                <div key={a.id} className="overflow-hidden border shadow-xl card border-base-300/30 bg-base-200/30 backdrop-blur rounded-xl opacity-60">
                  <div className="card-body">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="flex-1 text-lg card-title text-base-content">{a.title}</h3>
                      <span className="badge badge-ghost">Locked</span>
                    </div>
                    <p className="text-sm italic select-none opacity-40">???</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-12 not-prose">
          <details className="border collapse collapse-arrow bg-base-200/40 border-base-300 rounded-xl">
            <summary className="font-semibold collapse-title">How this works</summary>
            <div className="text-sm leading-relaxed collapse-content space-y-3">
              <p>Achievements are stored locally in your browser. Clearing site data or using another device will reset them (for now).</p>
              <p>Want to suggest one? Ping me :)</p>
            </div>
          </details>
        </div>
      </div>
    </motion.div>
  );
}
