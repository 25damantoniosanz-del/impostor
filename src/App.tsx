import React, { useState, useEffect } from 'react';
import { useGameStore } from './store';
import { getRandomWord, categories } from './words';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Eye, EyeOff, Play, RotateCcw, UserPlus, X } from 'lucide-react';
import clsx from 'clsx';

// --- Components ---

const MenuScreen = () => {
    const setStatus = useGameStore(s => s.setStatus);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center justify-center h-full space-y-8 p-6"
        >
            <div className="text-center space-y-2">
                <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-pink-500">
                    IMPOSTOR
                </h1>
                <p className="text-gray-400">Find the spy among us</p>
            </div>

            <button
                onClick={() => setStatus('setup')}
                className="w-full max-w-xs py-4 px-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-xl shadow-lg shadow-indigo-500/30 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
            >
                <Play size={24} />
                New Game
            </button>
        </motion.div>
    );
};

const SetupScreen = () => {
    const startGame = useGameStore(s => s.startGame);
    const setStatus = useGameStore(s => s.setStatus);

    const [players, setPlayers] = useState<string[]>(['Player 1', 'Player 2', 'Player 3']);
    const [impostorCount, setImpostorCount] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState<keyof typeof categories>('General');

    const addPlayer = () => {
        setPlayers([...players, `Player ${players.length + 1}`]);
    };

    const removePlayer = (index: number) => {
        if (players.length > 3) {
            setPlayers(players.filter((_, i) => i !== index));
        }
    };

    const handleStart = () => {
        const word = getRandomWord(selectedCategory);
        startGame(players, impostorCount, word);
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col h-full p-6 space-y-6 overflow-y-auto"
        >
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Setup Game</h2>
                <button onClick={() => setStatus('menu')} className="text-gray-400 hover:text-white">
                    <X size={24} />
                </button>
            </div>

            <div className="space-y-4">
                <label className="text-sm font-medium text-gray-400 uppercase tracking-wider">Players</label>
                <div className="space-y-2">
                    {players.map((player, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                            <input
                                value={player}
                                onChange={(e) => {
                                    const newPlayers = [...players];
                                    newPlayers[idx] = e.target.value;
                                    setPlayers(newPlayers);
                                }}
                                className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                            />
                            {players.length > 3 && (
                                <button onClick={() => removePlayer(idx)} className="p-3 text-red-400 hover:bg-gray-800 rounded-xl">
                                    <X size={20} />
                                </button>
                            )}
                        </div>
                    ))}
                    <button
                        onClick={addPlayer}
                        className="w-full py-3 border-2 border-dashed border-gray-700 text-gray-400 rounded-xl hover:border-indigo-500 hover:text-indigo-400 transition-colors flex items-center justify-center gap-2"
                    >
                        <UserPlus size={20} />
                        Add Player
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                <label className="text-sm font-medium text-gray-400 uppercase tracking-wider">Settings</label>
                <div className="bg-gray-800 rounded-xl p-4 space-y-4">
                    <div className="flex justify-between items-center">
                        <span>Impostors</span>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setImpostorCount(Math.max(1, impostorCount - 1))}
                                className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center"
                            >-</button>
                            <span className="font-bold w-4 text-center">{impostorCount}</span>
                            <button
                                onClick={() => setImpostorCount(Math.min(players.length - 1, impostorCount + 1))}
                                className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center"
                            >+</button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <span>Category</span>
                        <div className="grid grid-cols-2 gap-2">
                            {(Object.keys(categories) as Array<keyof typeof categories>).map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={clsx(
                                        "py-2 px-3 rounded-lg text-sm transition-colors",
                                        selectedCategory === cat
                                            ? "bg-indigo-600 text-white"
                                            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                    )}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-4">
                <button
                    onClick={handleStart}
                    className="w-full py-4 bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-2xl font-bold text-xl shadow-lg shadow-indigo-500/20 active:scale-95 transition-transform"
                >
                    Start Game
                </button>
            </div>
        </motion.div>
    );
};

const PassScreen = () => {
    const currentPlayerIndex = useGameStore(s => s.currentPlayerIndex);
    const players = useGameStore(s => s.players);
    const setStatus = useGameStore(s => s.setStatus);

    const currentPlayer = players[currentPlayerIndex];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="flex flex-col items-center justify-center h-full p-8 text-center space-y-8"
        >
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-4 animate-bounce">
                <Users size={40} className="text-indigo-400" />
            </div>

            <div className="space-y-2">
                <p className="text-gray-400 text-lg">Pass the phone to</p>
                <h2 className="text-4xl font-bold text-white">{currentPlayer.name}</h2>
            </div>

            <button
                onClick={() => setStatus('reveal')}
                className="w-full max-w-xs py-4 bg-gray-800 border border-gray-700 hover:bg-gray-700 text-white rounded-2xl font-bold text-lg transition-all"
            >
                I am {currentPlayer.name}
            </button>
        </motion.div>
    );
};

const RevealScreen = () => {
    const currentPlayerIndex = useGameStore(s => s.currentPlayerIndex);
    const players = useGameStore(s => s.players);
    const nextPlayer = useGameStore(s => s.nextPlayer);

    const currentPlayer = players[currentPlayerIndex];
    const [isRevealed, setIsRevealed] = useState(false);

    return (
        <div className="flex flex-col items-center justify-center h-full p-6 text-center select-none">
            <h3 className="text-xl text-gray-400 mb-8">{currentPlayer.name}'s Role</h3>

            <div
                className="relative w-full max-w-xs aspect-[3/4] bg-gray-800 rounded-3xl overflow-hidden shadow-2xl touch-none"
                onPointerDown={() => setIsRevealed(true)}
                onPointerUp={() => setIsRevealed(false)}
                onPointerLeave={() => setIsRevealed(false)}
                onTouchStart={() => setIsRevealed(true)}
                onTouchEnd={() => setIsRevealed(false)}
            >
                {/* Hidden Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gray-900">
                    <p className="text-gray-500 mb-4">Your secret word is:</p>
                    <h2 className={clsx(
                        "text-4xl font-bold break-words",
                        currentPlayer.role === 'impostor' ? "text-red-500" : "text-indigo-400"
                    )}>
                        {currentPlayer.word}
                    </h2>
                    {currentPlayer.role === 'impostor' && (
                        <p className="mt-4 text-sm text-red-400">Try to blend in!</p>
                    )}
                </div>

                {/* Cover / Overlay */}
                <motion.div
                    animate={{ opacity: isRevealed ? 0 : 1 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700 flex flex-col items-center justify-center p-6 cursor-pointer"
                >
                    <EyeOff size={64} className="text-white/50 mb-4" />
                    <p className="text-white font-bold text-xl">HOLD TO REVEAL</p>
                    <p className="text-white/60 text-sm mt-2">Don't let others see!</p>
                </motion.div>
            </div>

            <button
                onClick={nextPlayer}
                className="mt-8 px-8 py-3 bg-gray-800 text-white rounded-xl font-medium hover:bg-gray-700 transition-colors"
            >
                Done
            </button>
        </div>
    );
};

const PlayingScreen = () => {
    const resetGame = useGameStore(s => s.resetGame);
    const players = useGameStore(s => s.players);
    const commonWord = useGameStore(s => s.commonWord);

    const [showWord, setShowWord] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col h-full p-6"
        >
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center animate-pulse-slow">
                    <span className="text-4xl">🤔</span>
                </div>

                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Discuss!</h2>
                    <p className="text-gray-400">Ask questions and find the impostor.</p>
                </div>

                <div className="bg-gray-800 p-6 rounded-2xl w-full max-w-sm">
                    <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-4">Players</h3>
                    <div className="flex flex-wrap gap-2 justify-center">
                        {players.map(p => (
                            <span key={p.id} className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                                {p.name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                {showWord && (
                    <div className="p-4 bg-gray-800 rounded-xl text-center">
                        <p className="text-gray-500 text-sm">The word was:</p>
                        <p className="text-xl font-bold text-indigo-400">{commonWord}</p>
                    </div>
                )}

                <button
                    onClick={() => setShowWord(!showWord)}
                    className="w-full py-3 bg-gray-800 text-gray-300 rounded-xl font-medium"
                >
                    {showWord ? 'Hide Word' : 'Show Word (Game Over)'}
                </button>

                <button
                    onClick={resetGame}
                    className="w-full py-4 bg-red-600 text-white rounded-xl font-bold shadow-lg shadow-red-500/20"
                >
                    End Game
                </button>
            </div>
        </motion.div>
    );
};

// --- Main App ---

function App() {
    const status = useGameStore(s => s.status);

    return (
        <div className="h-screen w-full bg-gray-900 text-white overflow-hidden font-sans">
            <AnimatePresence mode="wait">
                {status === 'menu' && <MenuScreen key="menu" />}
                {status === 'setup' && <SetupScreen key="setup" />}
                {status === 'pass' && <PassScreen key="pass" />}
                {status === 'reveal' && <RevealScreen key="reveal" />}
                {status === 'playing' && <PlayingScreen key="playing" />}
            </AnimatePresence>
        </div>
    );
}

export default App;
