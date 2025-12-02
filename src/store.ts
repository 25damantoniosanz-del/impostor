import { create } from 'zustand';

export type Role = 'civilian' | 'impostor';

export interface Player {
    id: string;
    name: string;
    role: Role;
    word: string;
}

export type GameStatus = 'menu' | 'setup' | 'pass' | 'reveal' | 'playing' | 'voting' | 'finished';

interface GameState {
    status: GameStatus;
    players: Player[];
    currentPlayerIndex: number;
    impostorCount: number;
    commonWord: string;

    // Actions
    setStatus: (status: GameStatus) => void;
    setPlayers: (players: Player[]) => void;
    startGame: (playerNames: string[], impostorCount: number, word: string) => void;
    nextPlayer: () => void;
    resetGame: () => void;
}

export const useGameStore = create<GameState>((set) => ({
    status: 'menu',
    players: [],
    currentPlayerIndex: 0,
    impostorCount: 1,
    commonWord: '',

    setStatus: (status) => set({ status }),
    setPlayers: (players) => set({ players }),

    startGame: (playerNames, impostorCount, word) => {
        // Assign roles randomly
        const totalPlayers = playerNames.length;
        const roles: Role[] = Array(totalPlayers).fill('civilian');

        // Randomly assign impostors
        let assignedImpostors = 0;
        while (assignedImpostors < impostorCount) {
            const idx = Math.floor(Math.random() * totalPlayers);
            if (roles[idx] === 'civilian') {
                roles[idx] = 'impostor';
                assignedImpostors++;
            }
        }

        const newPlayers: Player[] = playerNames.map((name, index) => ({
            id: `player-${index}`,
            name,
            role: roles[index],
            word: roles[index] === 'impostor' ? 'IMPOSTOR' : word
        }));

        set({
            players: newPlayers,
            status: 'pass',
            currentPlayerIndex: 0,
            commonWord: word,
            impostorCount
        });
    },

    nextPlayer: () => set((state) => {
        const nextIndex = state.currentPlayerIndex + 1;
        if (nextIndex >= state.players.length) {
            return { status: 'playing', currentPlayerIndex: 0 };
        }
        return { status: 'pass', currentPlayerIndex: nextIndex };
    }),

    resetGame: () => set({
        status: 'menu',
        players: [],
        currentPlayerIndex: 0,
        commonWord: ''
    })
}));
