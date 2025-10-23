import { motion } from 'framer-motion';
import { images } from '../../../utils/preloadimages';

export default function HexamazeNotes() {
  const hero = images['hexamaze.png'];
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.25}} className="min-h-screen bg-base-100">
      <div className="hero min-h-[40vh]" style={{ backgroundImage: hero ? `url(${hero})` : undefined }}>
        <div className="hero-overlay bg-opacity-70" />
        <div className="text-center hero-content text-neutral-content">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold">Hexamaze Notes</h1>
            <p className="mt-4 opacity-90">Strategies and grid mental models.</p>
          </div>
        </div>
      </div>

      <article className="max-w-3xl px-4 py-10 mx-auto prose prose-invert sm:px-6">
        <h2>Visualization</h2>
        <p>Consistent axial coordinate mapping made mental rotation faster.</p>
        <h2>Pattern Recognition</h2>
        <p>Classifying junction motifs reduced dead-end exploration drastically.</p>
        <h2>Practice</h2>
        <p>10 minute daily solves improved recall more than long weekend sessions.</p>
      </article>
    </motion.div>
  );
}
