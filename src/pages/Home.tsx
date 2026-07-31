import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const floatingEmojis = ['💕', '💖', '💗', '💝', '🌸', '✨', '💫', '🌹', '💘', '💞'];

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const girlfriendDay = new Date();
    girlfriendDay.setMonth(7); // August
    girlfriendDay.setDate(1);
    girlfriendDay.setHours(0, 0, 0, 0);

    if (girlfriendDay < new Date()) {
      girlfriendDay.setFullYear(girlfriendDay.getFullYear() + 1);
    }

    const timer = setInterval(() => {
      const now = new Date();
      const diff = girlfriendDay.getTime() - now.getTime();
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen pt-20 lg:pt-28 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-block mb-6"
          >
            <span className="text-7xl lg:text-8xl">💝</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-5xl lg:text-7xl font-extrabold mb-4"
          >
            <span className="bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500 bg-clip-text text-transparent">
              Happy Girlfriend
            </span>
            <br />
            <span className="bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-500 bg-clip-text text-transparent">
              Day!
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-lg lg:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed"
          >
            Celebrating the most amazing person who makes every day brighter, 
            every laugh louder, and every moment unforgettable. 💕
          </motion.p>
        </motion.div>

        {/* Floating Emojis */}
        <div className="relative h-32 mb-8 overflow-hidden">
          {floatingEmojis.map((emoji, i) => (
            <motion.span
              key={i}
              className="absolute text-2xl"
              initial={{
                x: Math.random() * 100 + '%',
                y: 100,
                opacity: 0,
              }}
              animate={{
                y: [100, -20],
                opacity: [0, 1, 1, 0],
                x: [
                  Math.random() * 100 + '%',
                  Math.random() * 100 + '%',
                  Math.random() * 100 + '%',
                ],
              }}
              transition={{
                duration: Math.random() * 3 + 4,
                delay: Math.random() * 2,
                repeat: Infinity,
                repeatDelay: Math.random() * 3,
              }}
            >
              {emoji}
            </motion.span>
          ))}
        </div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-xl shadow-pink-200/30 border border-pink-100 mb-12"
        >
          <h3 className="text-center text-gray-400 text-sm uppercase tracking-widest mb-6">
            Countdown to Next Girlfriend Day
          </h3>
          <div className="flex justify-center gap-4 lg:gap-6">
            {[
              { value: timeLeft.days, label: 'Days' },
              { value: timeLeft.hours, label: 'Hours' },
              { value: timeLeft.minutes, label: 'Minutes' },
              { value: timeLeft.seconds, label: 'Seconds' },
            ].map((item) => (
              <motion.div
                key={item.label}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-rose-500 to-pink-500 rounded-2xl p-4 lg:p-6 shadow-lg shadow-pink-300/30 text-center min-w-[70px] lg:min-w-[100px]"
              >
                <motion.span
                  key={item.value}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="block text-3xl lg:text-5xl font-bold text-white"
                >
                  {String(item.value).padStart(2, '0')}
                </motion.span>
                <span className="text-pink-100 text-xs lg:text-sm font-medium uppercase tracking-wide">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {[
            { to: '/love-notes', emoji: '💌', title: 'Love Notes', desc: 'Sweet messages', color: 'from-rose-400 to-pink-400', shadow: 'shadow-rose-200' },
            { to: '/gallery', emoji: '📸', title: 'Gallery', desc: 'Our memories', color: 'from-pink-400 to-fuchsia-400', shadow: 'shadow-pink-200' },
            { to: '/timeline', emoji: '⏳', title: 'Timeline', desc: 'Our journey', color: 'from-fuchsia-400 to-purple-400', shadow: 'shadow-fuchsia-200' },
            { to: '/playlist', emoji: '🎵', title: 'Playlist', desc: 'Our songs', color: 'from-purple-400 to-violet-400', shadow: 'shadow-purple-200' },
            { to: '/surprise', emoji: '🎁', title: 'Surprise', desc: 'Something special', color: 'from-violet-400 to-indigo-400', shadow: 'shadow-violet-200' },
          ].map((card, i) => (
            <motion.div
              key={card.to}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to={card.to}
                className={`block bg-gradient-to-br ${card.color} rounded-2xl p-6 shadow-lg ${card.shadow} text-white text-center h-full transition-shadow hover:shadow-xl`}
              >
                <span className="text-4xl mb-3 block">{card.emoji}</span>
                <h4 className="font-semibold text-lg">{card.title}</h4>
                <p className="text-white/70 text-sm mt-1">{card.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 italic text-lg">
            "Every love story is beautiful, but ours is my favorite."
          </p>
          <div className="flex justify-center gap-1 mt-4">
            {[...Array(5)].map((_, i) => (
              <motion.span
                key={i}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{
                  duration: 1,
                  delay: i * 0.2,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
                className="text-xl"
              >
                ⭐
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
