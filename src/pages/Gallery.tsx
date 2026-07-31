import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const photos = [
  { id: 1, emoji: '🌅', title: 'First Sunset Together', desc: 'The day we watched the most beautiful sunset and I knew you were the one.', color: 'from-amber-400 to-orange-400' },
  { id: 2, emoji: '🍽️', title: 'Our First Date', desc: 'That cozy little restaurant where we talked for hours and didn\'t want the night to end.', color: 'from-rose-400 to-pink-400' },
  { id: 3, emoji: '🏖️', title: 'Beach Getaway', desc: 'Walking barefoot on the sand, collecting shells, and making memories that last forever.', color: 'from-cyan-400 to-blue-400' },
  { id: 4, emoji: '🎂', title: 'Birthday Surprise', desc: 'The surprise party you threw for me — nobody had ever done anything so thoughtful.', color: 'from-purple-400 to-pink-400' },
  { id: 5, emoji: '🎄', title: 'Christmas Magic', desc: 'Decorating the tree together, hot cocoa, and the warmth of your arms around me.', color: 'from-green-400 to-emerald-400' },
  { id: 6, emoji: '✈️', title: 'Our Adventure', desc: 'That spontaneous road trip that turned into the best adventure of our lives.', color: 'from-violet-400 to-purple-400' },
  { id: 7, emoji: '🌧️', title: 'Rainy Day', desc: 'Dancing in the rain like nobody was watching — just you, me, and the storm.', color: 'from-blue-400 to-indigo-400' },
  { id: 8, emoji: '🎆', title: 'New Year\'s Kiss', desc: 'Fireworks in the sky and sparks in our hearts as we welcomed a new year together.', color: 'from-pink-400 to-rose-400' },
  { id: 9, emoji: '🌌', title: 'Stargazing Night', desc: 'Lying under the stars, sharing our dreams, and feeling like the universe brought us together.', color: 'from-indigo-400 to-violet-400' },
];

export default function Gallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const photo = photos.find((p) => p.id === selectedPhoto);

  return (
    <div className="min-h-screen pt-20 lg:pt-28 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.span
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-6xl block mb-4"
          >
            📸
          </motion.span>
          <h1 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-pink-500 to-fuchsia-500 bg-clip-text text-transparent mb-3">
            Our Gallery
          </h1>
          <p className="text-gray-400">Every picture tells our beautiful story 💕</p>
        </motion.div>

        {/* Masonry Grid */}
        <motion.div
          layout
          className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4"
        >
          {photos.map((pic, i) => (
            <motion.div
              key={pic.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              whileHover={{ scale: 1.02, y: -4 }}
              onClick={() => setSelectedPhoto(pic.id)}
              className={`break-inside-avoid rounded-2xl bg-gradient-to-br ${pic.color} p-6 cursor-pointer shadow-lg hover:shadow-xl transition-shadow`}
            >
              <div className="text-center text-white">
                <span className="text-6xl mb-4 block drop-shadow-lg">{pic.emoji}</span>
                <h3 className="text-xl font-bold mb-2">{pic.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{pic.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedPhoto && photo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
              className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                onClick={(e) => e.stopPropagation()}
                className={`bg-gradient-to-br ${photo.color} rounded-3xl p-10 max-w-lg w-full text-white text-center shadow-2xl`}
              >
                <span className="text-8xl mb-6 block drop-shadow-xl">{photo.emoji}</span>
                <h2 className="text-3xl font-bold mb-4">{photo.title}</h2>
                <p className="text-white/80 text-lg leading-relaxed mb-6">{photo.desc}</p>
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-6 py-2.5 rounded-full font-medium transition-all"
                >
                  Close ✨
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
