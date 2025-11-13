import { User, Dream } from '../types';

// --- MOCK USER DATABASE ---
// In a real app, this would be a server-side database.
// We'll use localStorage to simulate this.
// The key is the user's email (ID), and the value is the User object plus their password.
type StoredUser = User & { password: string };

const getUsers = (): Record<string, StoredUser> => {
  const users = localStorage.getItem('dreamweaver_users_v2'); // New key for new structure
  return users ? JSON.parse(users) : {};
};

const saveUsers = (users: Record<string, StoredUser>) => {
  localStorage.setItem('dreamweaver_users_v2', JSON.stringify(users));
};

// --- SESSION MANAGEMENT ---

const SESSION_KEY = 'dreamweaver_session';

export const getCurrentUser = (): User | null => {
  const session = localStorage.getItem(SESSION_KEY);
  return session ? JSON.parse(session) : null;
};

const setCurrentUser = (user: User | null) => {
  if (user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(SESSION_KEY);
  }
};

export const updateUser = (user: User) => {
    const users = getUsers();
    const storedUser = users[user.id];
    if (storedUser) {
        const updatedStoredUser = { ...storedUser, ...user };
        users[user.id] = updatedStoredUser;
        saveUsers(users);
        
        // Also update the session if the updated user is the current user
        const currentUser = getCurrentUser();
        if (currentUser && currentUser.id === user.id) {
            setCurrentUser(user);
        }
    }
};

// --- AUTH FUNCTIONS ---

export const signUp = (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => { // Simulate network delay
      const users = getUsers();
      const lowercasedEmail = email.toLowerCase();
      if (users[lowercasedEmail]) {
        return reject(new Error('An account with this email already exists.'));
      }
      
      const newUser: User = { 
        id: lowercasedEmail, 
        email: lowercasedEmail,
        plan: 'free',
      };

      users[lowercasedEmail] = { ...newUser, password: password };
      saveUsers(users);
      setCurrentUser(newUser);
      resolve(newUser);
    }, 500);
  });
};

export const logIn = (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => { // Simulate network delay
      const users = getUsers();
      const lowercasedEmail = email.toLowerCase();
      const storedUser = users[lowercasedEmail];
      
      if (storedUser && storedUser.password === password) {
        // Exclude password from the object we pass around the app and store in session
        const { password: _, ...userToReturn } = storedUser;
        setCurrentUser(userToReturn);
        resolve(userToReturn);
      } else {
        reject(new Error('Invalid email or password.'));
      }
    }, 500);
  });
};

export const logOut = () => {
  setCurrentUser(null);
};

export const startFreeTrial = (userId: string): Promise<User> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const users = getUsers();
            const storedUser = users[userId];
            if (!storedUser) {
                return reject(new Error('User not found.'));
            }

            const trialEndDate = new Date();
            trialEndDate.setDate(trialEndDate.getDate() + 30);
            
            // FIX: The original code caused a type error because it attempted to destructure
            // 'password' from a 'User' type. It also had a security risk of leaking the
            // password into the session storage. This new logic correctly separates the
            // password, creates a clean User object for app/session state, and ensures
            // the full user record (with password) is updated in the mock database.
            const { password: _, ...userToReturn } = { ...storedUser, trialEndDate: trialEndDate.toISOString() };
            
            updateUser(userToReturn);
            resolve(userToReturn);
        }, 300);
    });
};


// --- USER-SPECIFIC DATA MANAGEMENT ---

export const getDreamsForUser = (userId: string): Dream[] => {
  const dreams = localStorage.getItem(`dreamweaver_dreams_${userId}`);
  return dreams ? JSON.parse(dreams) : [];
};

export const saveDreamsForUser = (userId: string, dreams: Dream[]) => {
  localStorage.setItem(`dreamweaver_dreams_${userId}`, JSON.stringify(dreams));
};