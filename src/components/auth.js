import React, { useContext, useState, useEffect } from "react";
import * as firebase from "firebase/app";
import * as fire from "firebase/auth";
import firebaseConfig from "../firebase";

firebase.initializeApp(firebaseConfig);

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState(false);
  const [loading, setLoading] = useState(true);

  const auth = fire.getAuth();

  const value = {
    user,
    login,
    logout,
    signup,
    resetPassword,
    auth,
  };

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  function login(email, password) {
    // clearErrors();

    return fire.signInWithEmailAndPassword(auth, email, password);
    // .catch((err) => {
    //   switch (err.code) {
    //     case "auth/invalid-email":
    //     case "auth/user-disabled":
    //     case "auth/user-not-found":
    //       setEmailError("Invalid email.");
    //       break;
    //     case "auth/wrong-password":
    //       setPasswordError("Invalid password.");
    //       break;
    //   }
    // });
  }

  function signup(email, password) {
    //clearErrors();
    return fire.createUserWithEmailAndPassword(auth, email, password);
    // .catch((err) => {
    //   switch (err.code) {
    //     case "auth/email-already-in-use":
    //     case "auth/invalid-email":
    //       setEmailError("Invalid email");
    //       break;
    //     case "auth/weak-password":
    //       setPasswordError("Weak password.");
    //       break;
    //   }
    // });
  }

  function logout() {
    return fire.signOut(auth);
  }

  function resetPassword(email) {
    return fire.sendPasswordResetEmail(auth, email);
  }

  useEffect(() => {
    const unsubscribe = fire.onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
