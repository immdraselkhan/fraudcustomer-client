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
  updateEmail,
  updatePassword,
  sendEmailVerification,
  signOut,
  deleteUser,
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

  // Send verification email
  const verifyEmail = () => {
    // Return the firebase api function
    // @ts-ignore
    return sendEmailVerification(auth.currentUser);
  };

  // Update user details
  const updateUserProfile = (info: {}) => {
    // Return the firebase api function
    // @ts-ignore
    return updateProfile(auth.currentUser, info);
  };

  // Update user email
  const updateUserEmail = (email: string) => {
    // Return the firebase api function
    // @ts-ignore
    return updateEmail(auth.currentUser, email);
  };

  // Update user password
  const updateUserPassword = (newPassword: String) => {
    // Return the firebase api function
    // @ts-ignore
    return updatePassword(auth.currentUser, newPassword);
  };

  // Send a password reset email
  const passwordResetEmail = (email: string) => {
    // Return the firebase api function
    return sendPasswordResetEmail(auth, email);
  };

  // Sign out
  const userLogOut = async () => {
    // Empty the user state
    setUser(null);
    // Return the firebase api function
    return await signOut(auth);
  };

  // Delete user account
  const deleteUserAccount = () => {
    // Return the firebase api function
    // @ts-ignore
    return deleteUser(auth.currentUser);
  };

  return (
    <AuthContext.Provider
      value={{
        phoneAuth,
        loading,
        user,
        verifyEmail,
        updateUserProfile,
        updateUserEmail,
        updateUserPassword,
        userLogOut,
        deleteUserAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Create hook for auth
export const useAuth = () => useContext(AuthContext);
