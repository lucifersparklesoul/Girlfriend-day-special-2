import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const promises = [
  'I promise to always make you laugh when you\'re feeling down 😂',
  'I promise to be your biggest cheerleader in everything you do 📣',
  'I promise to save the last bite of dessert for you 🍰',
  'I promise to always hold your hand, no matter what 🤝',
  'I promise to watch your favorite movies, even the ones I\'ve seen a hundred times 🎬',
  'I promise to always kiss you goodnight and good morning 💋',
  'I promise to be your safe space when the world feels heavy 🏠',
  'I promise to grow old and grey with you, and love every wrinkle 👴👵',
  'I promise to always say "I love you" before we sleep 💕',
  'I promise to choose you, every single day, forever ♾️',
];

const reasons = [
  'Because your smile can light up the darkest room ✨',
  'Because you laugh at my terrible jokes 😄',
  'Because you give the warmest hugs 🤗',
  'Because you make even ordinary moments magical 🪄',
  'Because your eyes sparkle when you talk about your dreams 💫',
  'Because you sing in the shower and it\'s adorable 🚿',
  'Because you always know how to cheer me up 🌈',
  'Because you\'re beautiful inside and out 🌹',
  'Because you are my favorite person to do nothing with 🛋️',
  'Because you make me want to be a better person ❤️',
];

export default function Surprise() {
  const [currentPromise, setCurrentPromise] = useState(0);
  const [currentReason, setCurrentReason] = useState(0);
  const [showGift, setShowGift] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [giftOpened, setGiftOpened] = useState(false);

  const handleOpenGift = () => {
    setShowGift(true);
    setConfetti(true);
    setTimeout(() => {
      setGiftOpened(true);
      setConfetti(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-20 lg:pt-28 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.span
            animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-7xl block mb-4 cursor-pointer"
            onClick={() => setConfetti(!confetti)}
          >
            🎁
          </motion.span>
          <h1 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent mb-3">
            A Special Surprise
          </h1>
          <p className="text-gray-400">Just for you, my love 💝</p>
        </motion.div>

        {/* Confetti Effect */}
        <AnimatePresence>
          {confetti && (
            <div className="fixed inset-0 pointer-events-none z-50">
              {[...Array(60)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{
                    x: '50vw',
                    y: '50vh',
                    scale: 0,
                    opacity: 1,
                  }}
                  animate={{
                    x: `${Math.random() * 100}vw`,
                    y: `${Math.random() * 100}vh`,
                    scale: Math.random() * 1.5 + 0.5,
                    opacity: 0,
                    rotate: Math.random() * 720,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: Math.random() * 2 + 2,
                    ease: 'easeOut',
                  }}
                  className="absolute text-2xl"
                  style={{
                    left: 0,
                    top: 0,
                  }}
                >
                  {['🎉', '💖', '✨', '💕', '🎊', '💗', '🌟', '💝', '🎀', '💘'][i % 10]}
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* Gift Box */}
        {!giftOpened ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-12"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenGift}
              className="inline-block cursor-pointer"
            >
              <motion.div
                animate={
                  showGift
                    ? { rotate: [0, 10, -10, 10, -10, 0], scale: [1, 1.2, 0.8, 1.2, 1] }
                    : { y: [0, -10, 0] }
                }
                transition={
                  showGift
                    ? { duration: 1.5 }
                    : { duration: 2, repeat: Infinity, ease: 'easeInOut' }
                }
              >
                <div className="relative">
                  <div className="text-9xl">🎁</div>
                  {!showGift && (
                    <motion.div
                      animate={{ scale: [1, 0.8, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="absolute -top-2 -right-2 text-3xl"
                    >
                      ✨
                    </motion.div>
                  )}
                </div>
              </motion.div>
              <p className="text-pink-500 font-medium mt-4 animate-pulse">
                {showGift ? 'Opening...' : 'Tap to open your gift!'}
              </p>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Promises */}
            <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-xl shadow-pink-200/30 border border-pink-100">
              <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent mb-6">
                💍 My Promises to You
              </h2>
              <div className="relative h-24 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentPromise}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="text-gray-700 text-lg text-center font-medium"
                  >
                    {promises[currentPromise]}
                  </motion.p>
                </AnimatePresence>
              </div>
              <div className="flex justify-center gap-4 mt-4">
                <button
                  onClick={() =>
                    setCurrentPromise((prev) =>
                      prev === 0 ? promises.length - 1 : prev - 1
                    )
                  }
                  className="w-10 h-10 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-500 flex items-center justify-center transition-colors"
                >
                  ←
                </button>
                <span className="flex items-center text-sm text-gray-400">
                  {currentPromise + 1} / {promises.length}
                </span>
                <button
                  onClick={() =>
                    setCurrentPromise((prev) =>
                      prev === promises.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="w-10 h-10 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-500 flex items-center justify-center transition-colors"
                >
                  →
                </button>
              </div>
            </div>

            {/* Reasons */}
            <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-xl shadow-pink-200/30 border border-pink-100">
              <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-fuchsia-500 to-purple-500 bg-clip-text text-transparent mb-6">
                💗 Why I Love You
              </h2>
              <div className="relative h-24 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentReason}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4 }}
                    className="text-gray-700 text-lg text-center font-medium"
                  >
                    {reasons[currentReason]}
                  </motion.p>
                </AnimatePresence>
              </div>
              <div className="flex justify-center gap-4 mt-4">
                <button
                  onClick={() =>
                    setCurrentReason((prev) =>
                      prev === 0 ? reasons.length - 1 : prev - 1
                    )
                  }
                  className="w-10 h-10 rounded-full bg-purple-100 hover:bg-purple-200 text-purple-500 flex items-center justify-center transition-colors"
                >
                  ←
                </button>
                <span className="flex items-center text-sm text-gray-400">
                  {currentReason + 1} / {reasons.length}
                </span>
                <button
                  onClick={() =>
                    setCurrentReason((prev) =>
                      prev === reasons.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="w-10 h-10 rounded-full bg-purple-100 hover:bg-purple-200 text-purple-500 flex items-center justify-center transition-colors"
                >
                  →
                </button>
              </div>
            </div>

            {/* Love Voucher */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500 rounded-3xl p-8 text-white text-center shadow-xl shadow-pink-300/30"
            >
              <span className="text-5xl block mb-4">🎫</span>
              <h3 className="text-2xl font-bold mb-3">Love Voucher</h3>
              <p className="text-white/80 text-lg mb-4">
                This voucher entitles the bearer to:
              </p>
              <div className="space-y-2 text-white/90">
                <p>✨ Unlimited hugs & kisses</p>
                <p>🍽️ One romantic dinner date</p>
                <p>🎬 Movie night of your choice</p>
                <p>💆 A relaxing massage</p>
                <p>🌟 And infinite love, forever</p>
              </div>
              <p className="text-white/60 text-sm mt-4 italic">
                * No expiration date. Valid for eternity.
              </p>
            </motion.div>

            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setGiftOpened(false);
                  setShowGift(false);
                  setConfetti(true);
                  setTimeout(() => setConfetti(false), 2000);
                }}
                className="bg-white/80 backdrop-blur-sm px-8 py-3 rounded-full font-medium text-pink-500 shadow-lg border border-pink-200 hover:bg-white transition-colors"
              >
                Open Gift Again 🎁
              </motion.button>
            </div>
          </motion.div>
        )}

        {!giftOpened && !showGift && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-8"
          >
            <p className="text-gray-400 italic">
              The best gifts aren't wrapped in paper — they're wrapped in love 💕
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
