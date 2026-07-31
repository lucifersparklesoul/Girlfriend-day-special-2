import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';

interface LockScreenProps {
  onUnlock: () => void;
}

const CORRECT_PIN = '1431';

export default function LockScreen({ onUnlock }: LockScreenProps) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [, setShake] = useState(false);

  const handleKeyPress = useCallback(
    (digit: string) => {
      if (pin.length >= 4) return;

      const newPin = pin + digit;
      setPin(newPin);

      if (newPin.length === 4) {
        if (newPin === CORRECT_PIN) {
          // Success animation
          setTimeout(() => {
            onUnlock();
          }, 600);
        } else {
          setError(true);
          setShake(true);
          setTimeout(() => {
            setPin('');
            setError(false);
            setShake(false);
          }, 800);
        }
      }
    },
    [pin, onUnlock]
  );

  const handleDelete = () => {
    if (pin.length > 0) {
      setPin(pin.slice(0, -1));
    }
  };

  const handleClear = () => {
    setPin('');
    setError(false);
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') {
        handleKeyPress(e.key);
      } else if (e.key === 'Backspace') {
        handleDelete();
      } else if (e.key === 'Escape') {
        handleClear();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyPress]);

  const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'delete'];

  return (
    <div className="fixed inset-0 z-[100] bg-gradient-to-br from-rose-100 via-pink-50 to-fuchsia-100 flex items-center justify-center">
      {/* Background animated hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute text-lg"
            initial={{
              x: Math.random() * 100 + '%',
              y: -20,
              opacity: 0,
            }}
            animate={{
              y: '110vh',
              opacity: [0, 0.2, 0.2, 0],
              x: [
                Math.random() * 100 + '%',
                Math.random() * 100 + '%',
                Math.random() * 100 + '%',
              ],
            }}
            transition={{
              duration: Math.random() * 6 + 8,
              delay: Math.random() * 5,
              repeat: Infinity,
            }}
          >
            {['💕', '❤️', '💗', '💖', '💝', '🌸', '✨'][i % 7]}
          </motion.span>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        {/* Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-pink-300/30 border border-pink-100 p-8 lg:p-10">
          {/* Lock Icon */}
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 shadow-lg shadow-pink-300/30">
              <motion.span
                animate={error ? { rotate: [0, -15, 15, -15, 15, 0] } : {}}
                transition={{ duration: 0.5 }}
                className="text-5xl"
              >
                {error ? '🔒' : '🔐'}
              </motion.span>
            </div>
          </motion.div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl lg:text-3xl font-extrabold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent mb-2">
              Welcome Back, Love 💕
            </h1>
            <p className="text-gray-400 text-sm">
              Enter your secret PIN to unlock
            </p>
          </div>

          {/* PIN Dots */}
          <div className="flex justify-center gap-4 mb-8">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                animate={
                  error
                    ? {
                        x: [0, -8, 8, -8, 8, 0],
                      }
                    : {}
                }
                transition={{ duration: 0.5 }}
                className={`w-5 h-5 rounded-full border-2 transition-all duration-300 ${
                  i < pin.length
                    ? error
                      ? 'border-red-400 bg-red-400'
                      : 'border-pink-500 bg-pink-500 shadow-md shadow-pink-300'
                    : 'border-pink-200 bg-transparent'
                }`}
              >
                {i < pin.length && !error && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-full h-full rounded-full bg-pink-500"
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* Success State */}
          <AnimatePresence>
            {pin.length === 4 && !error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center mb-6"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-3xl inline-block"
                >
                  ✨
                </motion.span>
                <p className="text-pink-500 font-medium mt-1 animate-pulse">
                  Unlocking...
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error State */}
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center text-red-400 font-medium mb-4"
              >
                Wrong PIN. Try again! 💔
              </motion.p>
            )}
          </AnimatePresence>

          {/* Keypad */}
          <div className="grid grid-cols-3 gap-3">
            {digits.map((digit) => {
              if (digit === '') {
                return <div key="empty" />;
              }

              if (digit === 'delete') {
                return (
                  <motion.button
                    key="delete"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleDelete}
                    className="h-14 rounded-2xl flex items-center justify-center text-gray-400 hover:text-pink-500 hover:bg-pink-50 transition-all duration-200"
                  >
                    <svg
                      className="w-7 h-7"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 14l4-4m0 4l-4-4"
                      />
                    </svg>
                  </motion.button>
                );
              }

              return (
                <motion.button
                  key={digit}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleKeyPress(digit)}
                  className="h-14 rounded-2xl bg-white/60 hover:bg-pink-50 border border-pink-100 flex items-center justify-center text-xl font-bold text-gray-700 hover:text-pink-500 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  {digit}
                </motion.button>
              );
            })}
          </div>

          {/* Clear Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleClear}
            className="w-full mt-4 py-3 rounded-2xl text-sm text-gray-400 hover:text-pink-500 hover:bg-pink-50 transition-all duration-200"
          >
            Clear
          </motion.button>
        </div>

        {/* Hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-center text-gray-400 text-xs mt-6"
        >
          💡 Hint: It's a special date
        </motion.p>
      </motion.div>
    </div>
  );
}
