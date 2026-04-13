import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  role: UserRole | null;
  loading: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  loading: true,
  isAdmin: false,
});

const ADMIN_EMAILS = [
  "fenida@mymountainmover.com",
  "maine@mymountainmover.com",
  "marcklan@mymountainmover.com",
  "denzel@mymountainmover.com",
  "glendale@mymountainmover.com",
  "amanda@mymountainmover.com",
  "april@mymountainmover.com",
  "joanamarie@mymountainmover.com",
  "marg@mymountainmover.com"
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log("Auth state changed:", firebaseUser?.email);
      setUser(firebaseUser);
      if (firebaseUser) {
        // Check Firestore for user role
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            console.log("User doc found:", data);
            setRole(data.role);
          } else {
            console.log("No user doc found, checking hardcoded admin.");
            // Default admin check for the specific user emails
            if (firebaseUser.email && ADMIN_EMAILS.includes(firebaseUser.email.toLowerCase())) {
              console.log("Hardcoded admin detected.");
              setRole('admin');
            } else {
              setRole('responder');
            }
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
          setRole('responder');
        }
      } else {
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const isAdmin = role === 'admin' || (user?.email && ADMIN_EMAILS.includes(user.email.toLowerCase()));

  return (
    <AuthContext.Provider value={{ user, role, loading, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
