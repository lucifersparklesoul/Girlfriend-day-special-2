import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const milestones = [
  {
    date: 'The Day We Met',
    subtitle: 'Where it all began',
    description: 'I remember the exact moment our eyes met. Time stood still, and somehow I knew my life was about to change forever. The universe conspired to bring us together.',
    emoji: '👀',
    color: 'bg-rose-500',
    iconBg: 'from-rose-400 to-pink-400',
  },
  {
    date: 'First Date',
    subtitle: 'Butterflies & Smiles',
    description: 'Nervous excitement, endless conversations, and the feeling that we had known each other for lifetimes. That night, I drove home with the biggest smile on my face.',
    emoji: '🌹',
    color: 'bg-pink-500',
    iconBg: 'from-pink-400 to-fuchsia-400',
  },
  {
    date: 'First "I Love You"',
    subtitle: 'Hearts connected',
    description: 'Those three words changed everything. Saying them felt like the most natural thing in the world, and hearing them back made my heart explode with joy.',
    emoji: '💕',
    color: 'bg-fuchsia-500',
    iconBg: 'from-fuchsia-400 to-purple-400',
  },
  {
    date: 'Our First Trip',
    subtitle: 'Adventure together',
    description: 'Exploring new places, creating inside jokes, and discovering that traveling with you is my favorite thing. Home isn\'t a place — it\'s wherever you are.',
    emoji: '✈️',
    color: 'bg-purple-500',
    iconBg: 'from-purple-400 to-violet-400',
  },
  {
    date: 'Meeting the Families',
    subtitle: 'Becoming one',
    description: 'Watching you fit so perfectly into my world — and me into yours. Our families saw what we already knew: we belong together.',
    emoji: '👨‍👩‍👧‍👦',
    color: 'bg-violet-500',
    iconBg: 'from-violet-400 to-indigo-400',
  },
  {
    date: 'Today & Always',
    subtitle: 'Forever & ever',
    description: 'Every day with you is a new milestone. Every laugh, every hug, every "good morning" text — they all add up to the most beautiful love story I could ever imagine.',
    emoji: '💍',
    color: 'bg-indigo-500',
    iconBg: 'from-indigo-400 to-blue-400',
  },
];

function TimelineItem({ milestone, index }: { milestone: typeof milestones[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className="relative flex items-center mb-12 lg:mb-16">
      {/* Desktop: alternating layout */}
      <div className={`hidden lg:flex w-full items-center ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
        <motion.div
          initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-5/12"
        >
          <div className={`bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-pink-100 ${isLeft ? 'text-right' : 'text-left'}`}>
            <h3 className="text-xl font-bold text-gray-800">{milestone.date}</h3>
            <p className="text-pink-500 font-medium text-sm mb-3">{milestone.subtitle}</p>
            <p className="text-gray-500 text-sm leading-relaxed">{milestone.description}</p>
          </div>
        </motion.div>

        <div className="w-2/12 flex justify-center relative">
          <div className="w-1 h-full bg-gradient-to-b from-rose-300 to-indigo-300 absolute rounded-full" />
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
            className={`relative z-10 w-16 h-16 rounded-full bg-gradient-to-br ${milestone.iconBg} flex items-center justify-center text-2xl shadow-lg`}
          >
            {milestone.emoji}
          </motion.div>
        </div>

        <div className="w-5/12" />
      </div>

      {/* Mobile: all left */}
      <div className="flex lg:hidden w-full">
        <div className="w-12 flex-shrink-0 flex flex-col items-center mr-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ type: 'spring', stiffness: 300 }}
            className={`w-12 h-12 rounded-full bg-gradient-to-br ${milestone.iconBg} flex items-center justify-center text-xl shadow-lg z-10`}
          >
            {milestone.emoji}
          </motion.div>
          {index < milestones.length - 1 && (
            <div className="w-0.5 h-full bg-gradient-to-b from-rose-300 to-indigo-300 mt-2 rounded-full" />
          )}
        </div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1 bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-pink-100 mb-4"
        >
          <h3 className="text-lg font-bold text-gray-800">{milestone.date}</h3>
          <p className="text-pink-500 font-medium text-sm mb-2">{milestone.subtitle}</p>
          <p className="text-gray-500 text-sm leading-relaxed">{milestone.description}</p>
        </motion.div>
      </div>
    </div>
  );
}

export default function Timeline() {
  return (
    <div className="min-h-screen pt-20 lg:pt-28 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.span
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-6xl block mb-4"
          >
            ⏳
          </motion.span>
          <h1 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-fuchsia-500 to-purple-500 bg-clip-text text-transparent mb-3">
            Our Timeline
          </h1>
          <p className="text-gray-400">The story of us, written in the stars ✨</p>
        </motion.div>

        <div className="relative">
          {milestones.map((milestone, i) => (
            <TimelineItem key={i} milestone={milestone} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12 bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-xl shadow-pink-200/30 border border-pink-100"
        >
          <span className="text-5xl block mb-4">💫</span>
          <p className="text-gray-600 text-lg leading-relaxed">
            And this is just the beginning... The best chapters are yet to be written.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
