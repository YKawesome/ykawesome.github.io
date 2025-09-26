import { motion } from 'framer-motion';
import { images } from '../../../utils/preloadimages';

export default function AntlogicDesign() {
  const hero = images['antlogic.png'];
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.25}} className="bg-base-100 min-h-screen">
      <div className="hero min-h-[40vh]" style={{ backgroundImage: hero ? `url(${hero})` : undefined }}>
        <div className="hero-overlay bg-opacity-70" />
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold">Antlogic: Design Notes</h1>
            <p className="mt-4 opacity-90">Exploring heuristics and puzzle feel.</p>
          </div>
        </div>
      </div>

      <article className="prose prose-invert max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <h2>Level Philosophy</h2>
        <p>Early levels teach movement constraints one at a time. Later levels layer combinational reasoning.</p>
        <h2>Heuristics</h2>
        <p>Path scoring used weighted turn penalties + goal proximity. Simpler than A* but good enough for scale.</p>
        <h2>UI Polish</h2>
        <p>Subtle motion + immediate feedback boosted retention significantly over a static grid.</p>
      </article>
    </motion.div>
  );
}
