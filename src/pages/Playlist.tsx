import { motion } from 'framer-motion';
import { useState } from 'react';

const songs = [
  {
    id: 1,
    title: 'Perfect',
    artist: 'Ed Sheeran',
    reason: 'Because you are perfect to me in every single way.',
    emoji: '💃',
    color: 'from-rose-400 to-pink-400',
  },
  {
    id: 2,
    title: 'All of Me',
    artist: 'John Legend',
    reason: 'I give you all of me, and you give me all of you.',
    emoji: '🎹',
    color: 'from-pink-400 to-fuchsia-400',
  },
  {
    id: 3,
    title: 'Can\'t Help Falling in Love',
    artist: 'Elvis Presley',
    reason: 'Some things are meant to be — like us.',
    emoji: '🎸',
    color: 'from-fuchsia-400 to-purple-400',
  },
  {
    id: 4,
    title: 'Just the Way You Are',
    artist: 'Bruno Mars',
    reason: 'You are amazing just the way you are. Don\'t ever change.',
    emoji: '🎤',
    color: 'from-purple-400 to-violet-400',
  },
  {
    id: 5,
    title: 'At Last',
    artist: 'Etta James',
    reason: 'At last, my love has come along. My lonely days are over.',
    emoji: '🎺',
    color: 'from-violet-400 to-indigo-400',
  },
  {
    id: 6,
    title: 'Lover',
    artist: 'Taylor Swift',
    reason: 'Can I go where you go? Can we always be this close?',
    emoji: '🎵',
    color: 'from-indigo-400 to-blue-400',
  },
  {
    id: 7,
    title: 'Thinking Out Loud',
    artist: 'Ed Sheeran',
    reason: 'I\'ll be loving you till we\'re 70 and beyond.',
    emoji: '🕺',
    color: 'from-rose-400 to-amber-400',
  },
  {
    id: 8,
    title: 'You Are the Reason',
    artist: 'Calum Scott',
    reason: 'You are the reason I believe in love.',
    emoji: '💖',
    color: 'from-pink-400 to-rose-400',
  },
];

export default function Playlist() {
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [volume, setVolume] = useState<number>(75);

  return (
    <div className="min-h-screen pt-20 lg:pt-28 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
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
            🎵
          </motion.span>
          <h1 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-purple-500 to-violet-500 bg-clip-text text-transparent mb-3">
            Our Playlist
          </h1>
          <p className="text-gray-400">Songs that remind me of you 💕</p>
        </motion.div>

        {/* Now Playing */}
        {playingId && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl shadow-pink-200/30 border border-pink-100 mb-8"
          >
            <div className="flex items-center gap-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                className={`w-24 h-24 rounded-full bg-gradient-to-br ${songs.find(s => s.id === playingId)?.color} flex items-center justify-center text-5xl shadow-lg flex-shrink-0`}
              >
                💿
              </motion.div>
              <div className="flex-1">
                <p className="text-xs text-pink-500 font-medium uppercase tracking-widest mb-1">Now Playing</p>
                <h3 className="text-2xl font-bold text-gray-800">
                  {songs.find(s => s.id === playingId)?.title}
                </h3>
                <p className="text-gray-400">{songs.find(s => s.id === playingId)?.artist}</p>
                <div className="mt-4 flex items-center gap-3">
                  <span className="text-gray-400 text-sm">🔈</span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="flex-1 h-1.5 rounded-full appearance-none bg-pink-200 accent-pink-500 cursor-pointer"
                  />
                  <span className="text-gray-400 text-sm">🔊</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Song List */}
        <div className="space-y-3">
          {songs.map((song, i) => {
            const isPlaying = playingId === song.id;
            return (
              <motion.div
                key={song.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setPlayingId(isPlaying ? null : song.id)}
                className={`cursor-pointer rounded-2xl p-5 transition-all duration-300 ${
                  isPlaying
                    ? `bg-gradient-to-r ${song.color} text-white shadow-lg`
                    : 'bg-white/60 hover:bg-white/80 shadow-sm hover:shadow-md border border-pink-50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <motion.div
                    animate={isPlaying ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 1, repeat: Infinity }}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${
                      isPlaying ? 'bg-white/20' : `bg-gradient-to-br ${song.color} bg-opacity-20`
                    }`}
                  >
                    {isPlaying ? (
                      <span className="flex gap-0.5">
                        <motion.span animate={{ height: [8, 20, 8] }} transition={{ duration: 1, repeat: Infinity }} className="w-1 bg-white rounded-full block" />
                        <motion.span animate={{ height: [20, 8, 20] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} className="w-1 bg-white rounded-full block" />
                        <motion.span animate={{ height: [10, 16, 10] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} className="w-1 bg-white rounded-full block" />
                      </span>
                    ) : (
                      song.emoji
                    )}
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-semibold truncate ${isPlaying ? 'text-white' : 'text-gray-800'}`}>
                      {song.title}
                    </h4>
                    <p className={`text-sm truncate ${isPlaying ? 'text-white/70' : 'text-gray-400'}`}>
                      {song.artist}
                    </p>
                  </div>
                  <span className={`text-sm ${isPlaying ? 'text-white' : 'text-pink-400'}`}>
                    {isPlaying ? '🎧' : '▶️'}
                  </span>
                </div>
                {isPlaying && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="text-white/80 text-sm mt-3 italic border-t border-white/20 pt-3"
                  >
                    "{song.reason}"
                  </motion.p>
                )}
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-12"
        >
          <div className="flex justify-center gap-2 flex-wrap">
            {['🎶', '💕', '🎵', '💗', '🎼', '💖', '🎤', '💝'].map((emoji, i) => (
              <motion.span
                key={i}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 1.5, delay: i * 0.15, repeat: Infinity }}
                className="text-2xl"
              >
                {emoji}
              </motion.span>
            ))}
          </div>
          <p className="text-gray-400 mt-4 italic">
            "Music is what feelings sound like, and you are my favorite song."
          </p>
        </motion.div>
      </div>
    </div>
  );
}
