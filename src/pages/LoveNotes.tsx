import { motion } from 'framer-motion';
import { useState } from 'react';

const loveNotes = [
  {
    id: 1,
    title: 'Your Smile',
    content: 'Your smile lights up my world in ways you cannot imagine. It\'s the first thing I think about when I wake up and the last thing before I fall asleep.',
    emoji: '😊',
    color: 'from-rose-400 to-pink-400',
    bgLight: 'bg-rose-50',
  },
  {
    id: 2,
    title: 'Your Kindness',
    content: 'The way you care for everyone around you, the way your heart is so full of love and compassion — it makes me fall in love with you more every single day.',
    emoji: '💗',
    color: 'from-pink-400 to-fuchsia-400',
    bgLight: 'bg-pink-50',
  },
  {
    id: 3,
    title: 'Your Strength',
    content: 'You are the strongest person I know. You face every challenge with grace and courage, and you inspire me to be a better person.',
    emoji: '💪',
    color: 'from-fuchsia-400 to-purple-400',
    bgLight: 'bg-fuchsia-50',
  },
  {
    id: 4,
    title: 'Your Laugh',
    content: 'Your laugh is my favorite sound in the universe. It\'s contagious, it\'s beautiful, and it reminds me how lucky I am to have you in my life.',
    emoji: '😂',
    color: 'from-purple-400 to-violet-400',
    bgLight: 'bg-purple-50',
  },
  {
    id: 5,
    title: 'Our Future',
    content: 'Every day with you feels like a dream I never want to wake up from. I can\'t wait to create more memories, share more laughs, and build our future together.',
    emoji: '🌟',
    color: 'from-violet-400 to-indigo-400',
    bgLight: 'bg-violet-50',
  },
  {
    id: 6,
    title: 'My Promise',
    content: 'I promise to always be by your side, to support your dreams, to make you laugh when you\'re sad, and to love you more with each passing day.',
    emoji: '🤞',
    color: 'from-rose-500 to-rose-400',
    bgLight: 'bg-rose-50',
  },
];

export default function LoveNotes() {
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  const toggleCard = (id: number) => {
    setFlippedCards((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen pt-20 lg:pt-28 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.span
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-6xl block mb-4"
          >
            💌
          </motion.span>
          <h1 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent mb-3">
            Love Notes
          </h1>
          <p className="text-gray-400">Click each card to reveal a special message 💕</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loveNotes.map((note, i) => {
            const isFlipped = flippedCards.includes(note.id);
            return (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                onClick={() => toggleCard(note.id)}
                className="cursor-pointer perspective-1000"
                style={{ perspective: '1000px' }}
              >
                <motion.div
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}
                  className="relative w-full h-64"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Front */}
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${note.color} p-6 flex flex-col items-center justify-center text-white shadow-xl cursor-pointer`}
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <span className="text-5xl mb-4">{note.emoji}</span>
                    <h3 className="text-2xl font-bold">{note.title}</h3>
                    <p className="text-white/60 text-sm mt-2">Tap to open 💝</p>
                  </div>

                  {/* Back */}
                  <div
                    className={`absolute inset-0 rounded-2xl bg-white p-6 flex flex-col items-center justify-center text-center shadow-xl border border-pink-100`}
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                  >
                    <span className="text-3xl mb-3">{note.emoji}</span>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{note.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{note.content}</p>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Love Letter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 bg-white/70 backdrop-blur-md rounded-3xl p-8 lg:p-12 shadow-xl shadow-pink-200/30 border border-pink-100"
        >
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-5xl mb-4 block">💌</span>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent mb-6">
              My Dearest Love,
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                On this special Girlfriend Day, I want you to know just how much you mean to me.
                You are the sunshine that brightens my darkest days and the calm in my storm.
              </p>
              <p>
                Every moment with you is a treasure — from the big adventures to the quiet
                evenings spent just being together. You've shown me what true love really is.
              </p>
              <p>
                Thank you for being you — perfectly imperfect, wonderfully unique, and
                absolutely the best thing that ever happened to me.
              </p>
              <p className="font-semibold text-pink-500 text-lg">
                Happy Girlfriend Day, my love! 💕
              </p>
              <p className="text-gray-400 italic">Forever yours ❤️</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
