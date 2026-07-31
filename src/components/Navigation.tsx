import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';

const links = [
  { to: '/', label: 'Home', emoji: '🏠' },
  { to: '/love-notes', label: 'Love Notes', emoji: '💌' },
  { to: '/gallery', label: 'Gallery', emoji: '📸' },
  { to: '/timeline', label: 'Timeline', emoji: '⏳' },
  { to: '/playlist', label: 'Playlist', emoji: '🎵' },
  { to: '/surprise', label: 'Surprise', emoji: '🎁' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Hamburger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-[60] lg:hidden w-11 h-11 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center border border-pink-200"
      >
        <motion.div
          animate={isOpen ? 'open' : 'closed'}
          className="flex flex-col gap-1.5"
        >
          <motion.span
            variants={{
              closed: { rotate: 0, y: 0 },
              open: { rotate: 45, y: 6 },
            }}
            className="w-5 h-0.5 bg-pink-500 block rounded-full"
          />
          <motion.span
            variants={{
              closed: { opacity: 1 },
              open: { opacity: 0 },
            }}
            className="w-5 h-0.5 bg-pink-500 block rounded-full"
          />
          <motion.span
            variants={{
              closed: { rotate: 0, y: 0 },
              open: { rotate: -45, y: -6 },
            }}
            className="w-5 h-0.5 bg-pink-500 block rounded-full"
          />
        </motion.div>
      </button>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex fixed top-0 left-0 right-0 z-40 justify-center py-3 px-4">
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex gap-1 bg-white/70 backdrop-blur-md rounded-full px-3 py-2 shadow-xl shadow-pink-200/30 border border-pink-100"
        >
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? 'text-white'
                    : 'text-gray-600 hover:text-pink-500'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="navPill"
                      className="absolute inset-0 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full shadow-md"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    <span>{link.emoji}</span>
                    {link.label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </motion.div>
      </nav>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={isOpen ? { x: 0, opacity: 1 } : { x: '100%', opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed inset-y-0 right-0 z-50 w-72 bg-white/95 backdrop-blur-xl shadow-2xl lg:hidden"
      >
        <div className="flex flex-col pt-24 px-6 gap-3">
          {links.map((link, i) => (
            <motion.div
              key={link.to}
              initial={{ x: 50, opacity: 0 }}
              animate={isOpen ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
              transition={{ delay: isOpen ? i * 0.08 : 0 }}
            >
              <NavLink
                to={link.to}
                end={link.to === '/'}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-5 py-3.5 rounded-2xl text-base font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-pink-300/30'
                      : 'text-gray-600 hover:bg-pink-50 hover:text-pink-500'
                  }`
                }
              >
                <span className="text-xl">{link.emoji}</span>
                {link.label}
              </NavLink>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  );
}
