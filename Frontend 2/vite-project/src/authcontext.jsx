import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  user: null,
  setAuthFromLogin: () => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  // Read from localStorage ONCE when app starts
  useEffect(() => {
    try {
      const token = window.localStorage.getItem('token');
      const userJson = window.localStorage.getItem('user');
      if (token && userJson) {
        setIsLoggedIn(true);
        setUser(JSON.parse(userJson));
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    } catch (e) {
      setIsLoggedIn(false);
      setUser(null);
    } finally {
      setReady(true);
    }
  }, []);

  // Called after successful login or registration
  function setAuthFromLogin(data) {
    // data: {_id, name, email, token}
    try {
      if (data && data.token) {
        window.localStorage.setItem('token', data.token);
        window.localStorage.setItem(
          'user',
          JSON.stringify({ id: data._id, name: data.name, email: data.email })
        );
      }
    } catch (e) {
      // ignore
    }
    setIsLoggedIn(true);
    setUser({ id: data._id, name: data.name, email: data.email });
  }

  // Logout
  function logout() {
    try {
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('user');
    } catch (e) {
      // ignore
    }
    setIsLoggedIn(false);
    setUser(null);
  }

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-500 text-sm">Loading…</p>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, setAuthFromLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
