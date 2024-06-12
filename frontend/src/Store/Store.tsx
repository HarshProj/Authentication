import {create} from 'zustand';

interface AuthState {
  auth: {
    username: string;
    active: boolean;
  };
  setusername: (name: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  auth: {
    username: '',
    active: false,
  },
  setusername: (name) =>
    set((state) => ({
      auth: { ...state.auth, username: name },
    })),
}));
