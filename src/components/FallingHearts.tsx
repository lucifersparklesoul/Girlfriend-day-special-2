import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Heart {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  rotation: number;
}

export default function FallingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);
  let nextId = 0;

  const createHeart = useCallback((): Heart => {
    return {
      id: nextId++,
      x: Math.random() * 100,
      size: Math.random() * 20 + 10,
      duration: Math.random() * 3 + 4,
      delay: Math.random() * 2,
      opacity: Math.random() * 0.4 + 0.1,
      rotation: Math.random() * 360,
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const heart = createHeart();
      setHearts(prev => {
        const filtered = prev.filter(h => h.id > heart.id - 30);
        return [...filtered, heart];
      });
    }, 400);

    return () => clearInterval(interval);
  }, [createHeart]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ y: '-10vh', x: `${heart.x}vw`, opacity: 0, rotate: 0 }}
            animate={{
              y: '110vh',
              opacity: [0, heart.opacity, heart.opacity, 0],
              rotate: heart.rotation,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: heart.duration,
              delay: heart.delay,
              ease: 'linear',
            }}
            className="absolute"
            style={{ left: `${heart.x}%` }}
          >
            <span
              style={{ fontSize: `${heart.size}px` }}
              className="select-none"
            >
              {['💕', '❤️', '💗', '💖', '💝', '💘', '🌸', '✨'][Math.floor(Math.random() * 8)]}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
