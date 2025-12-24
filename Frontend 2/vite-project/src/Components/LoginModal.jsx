// src/components/LoginModal.jsx
import React, { useState } from 'react';

const API_BASE = 'http://localhost:5000'; // change if needed

function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError('Email and password are required');
      return;
    }

    try {
      setIsLoading(true);
      setError('');

      const res = await fetch(API_BASE + '/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.message || 'Login failed');
        return;
      }

      if (data.token) {
        window.localStorage.setItem('token', data.token);
      }
      window.localStorage.setItem(
        'user',
        JSON.stringify({ id: data._id, name: data.name, email: data.email })
      );

      setEmail('');
      setPassword('');

      if (typeof onLoginSuccess === 'function') {
        onLoginSuccess(data);
      }

      onClose();
    } catch (err) {
      setError('Could not reach server. Is backend running?');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        <h2 className="text-lg font-semibold text-gray-900 mb-2">Login</h2>
        <p className="text-sm text-gray-600 mb-4">
          Enter your email and password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          {error && <p className="text-xs text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-emerald-600 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-emerald-700 transition disabled:opacity-60"
          >
            {isLoading ? 'Logging in…' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
