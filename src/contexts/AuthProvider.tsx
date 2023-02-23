import { createContext, useContext, useEffect, useState } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  TwitterAuthProvider,
  GithubAuthProvider,
  signInWithPhoneNumber,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  signOut,
} from "firebase/auth";
import app from "../firebase/firebase.init";

// Declare auth from firebase sdk & import the app from firebase.init.js
const auth = getAuth(app);

// Create Context object
const AuthContext = createContext<any>({});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // User state
  const [user, setUser] = useState<any>(null);

  // Loader state
  const [loading, setLoading] = useState(true);

  // Get the currently signed-in user
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      // Set user to the state
      setUser(currentUser);
      // Set loader to false once we got the user
      setLoading(false);
    });
    return () => unSubscribe();
  }, []);

  // Authenticate using phone number
  const phoneAuth = (phoneNumber: any, appVerifier: any) => {
    // Return the firebase api function
    return signInWithPhoneNumber(auth, phoneNumber, appVerifier);
  };

  // Social media auth providers
  const googleAuth = new GoogleAuthProvider();
  const twitterAuth = new TwitterAuthProvider();
  const githubAuth = new GithubAuthProvider();

  // Authenticate using social media (Popup)
  const authWithPopup = (provider: any) => {
    // Return the firebase api function
    return signInWithPopup(auth, provider);
  };

  // Sign out
  const userLogOut = async () => {
    // Empty the user state
    setUser(null);
    // Return the firebase api function
    return await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        phoneAuth,
        googleAuth,
        authWithPopup,
        loading,
        user,
        userLogOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Create hook for auth
export const useAuth = () => useContext(AuthContext);
