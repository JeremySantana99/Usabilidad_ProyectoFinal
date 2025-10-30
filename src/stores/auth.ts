import { create } from "zustand";

export type User = {
  id: string;
  name: string;
  email: string;
  organization?: string;
  wcagTarget?: string; // e.g., AA, AAA
  iso9241_compliance?: string; // e.g., "parcial", "completo"
};

type AuthState = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (user: User, password: string) => Promise<boolean>;
};

const STORAGE_KEY = "__auth_user_v1";
const USERS_KEY = "__auth_users_v1";

function getUsers(): { [email: string]: { user: User, password: string } } {
  return JSON.parse(localStorage.getItem(USERS_KEY) || "{}");
}

function saveUsers(users: { [email: string]: { user: User, password: string } }) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// simple localStorage-backed auth for demo (NOT for production)
export const useAuth = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem(STORAGE_KEY) || "null"),
  login: async (email, password) => {
    const users = getUsers();
    const userEntry = users[email];
    
    if (!userEntry || userEntry.password !== password) {
      return false;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(userEntry.user));
    set({ user: userEntry.user });
    return true;
  },
  logout: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({ user: null });
  },
  register: async (user: User, password: string) => {
    try {
      const users = getUsers();
      
      // Verificar si el correo ya está registrado
      if (users[user.email]) {
        return false;
      }
      
      // Guardar nuevo usuario
      users[user.email] = { user, password };
      saveUsers(users);
      
      // Iniciar sesión automáticamente
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      set({ user });
      return true;
    } catch (err) {
      console.error('Error de registro:', err);
      return false;
    }
  },
}));

export default useAuth;
