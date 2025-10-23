import { motion } from 'framer-motion';
import { images } from '../../../utils/preloadimages';

export default function CheckersAIMinimax() {
  const hero = images['checkersai.png'];
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.25}} className="min-h-screen bg-base-100">
      <div className="hero min-h-[40vh]" style={{ backgroundImage: hero ? `url(${hero})` : undefined }}>
        <div className="hero-overlay bg-opacity-70" />
        <div className="text-center hero-content text-neutral-content">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold">Checkers AI Minimax</h1>
            <p className="mt-4 opacity-90">Designing a pruning-aware evaluation.</p>
          </div>
        </div>
      </div>

      <article className="max-w-3xl px-4 py-10 mx-auto prose prose-invert sm:px-6">
        <h2>Eval Function</h2>
        <p>Weighted piece counts, king value, center control, and mobility heuristics.</p>
        <h2>Pruning Strategy</h2>
        <p>Alpha-beta plus move ordering based on captures first reduced branching dramatically.</p>
        <h2>Future</h2>
        <p>Transposition tables + iterative deepening would further improve mid-game strength.</p>
      </article>
    </motion.div>
  );
}
