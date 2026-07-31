import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import LoveNotes from './pages/LoveNotes';
import Gallery from './pages/Gallery';
import Timeline from './pages/Timeline';
import Playlist from './pages/Playlist';
import Surprise from './pages/Surprise';
import Navigation from './components/Navigation';
import FallingHearts from './components/FallingHearts';
import LockScreen from './components/LockScreen';

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Check if already unlocked in this session
  useEffect(() => {
    const unlocked = sessionStorage.getItem('gf_day_unlocked');
    if (unlocked === 'true') {
      setIsUnlocked(true);
    }
  }, []);

  const handleUnlock = () => {
    sessionStorage.setItem('gf_day_unlocked', 'true');
    setIsUnlocked(true);
  };

  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          <LockScreen key="lock" onUnlock={handleUnlock} />
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50"
          >
            <FallingHearts />
            <Navigation />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/love-notes" element={<LoveNotes />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/timeline" element={<Timeline />} />
              <Route path="/playlist" element={<Playlist />} />
              <Route path="/surprise" element={<Surprise />} />
            </Routes>
          </motion.div>
        )}
      </AnimatePresence>
    </BrowserRouter>
  );
}
