// src/components/RegistrationModal.jsx
import { useState } from 'react';
import { X, Mail, Lock, User, Leaf } from 'lucide-react';

const API_BASE = 'http://localhost:5000'; // change if your backend uses another URL/port

const RegistrationModal = ({ isOpen, onClose, onRegisterSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
    setServerError('');
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setServerError('');

    try {
      const res = await fetch(`${API_BASE}/api/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setServerError(data.message || 'Registration failed. Please try again.');
        return;
      }

      // Backend returns: _id, name, email, token
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem(
          'user',
          JSON.stringify({ id: data._id, name: data.name, email: data.email })
        );
      }

      setFormData({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
      });

      if (typeof onRegisterSuccess === 'function') {
        onRegisterSuccess(data);
      }

      onClose();
    } catch (error) {
      setServerError('Could not connect to server. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center">
            <Leaf className="w-5 h-5 text-emerald-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">
            Create your EcoTrack account
          </h2>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Sign up to save your activities, sync across devices, and see your progress over time.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full name */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Full name
            </label>
            <div className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-emerald-500">
              <User className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="flex-1 outline-none text-sm"
                placeholder="John Doe"
              />
            </div>
            {errors.fullName && (
              <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-emerald-500">
              <Mail className="w-4 h-4 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="flex-1 outline-none text-sm"
                placeholder="you@example.com"
              />
            </div>
            {errors.email && (
              <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-emerald-500">
              <Lock className="w-4 h-4 text-gray-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="flex-1 outline-none text-sm"
                placeholder="At least 6 characters"
              />
            </div>
            {errors.password && (
              <p className="text-[11px] text-red-600 mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm password */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Confirm password
            </label>
            <div className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-emerald-500">
              <Lock className="w-4 h-4 text-gray-400" />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="flex-1 outline-none text-sm"
                placeholder="Repeat your password"
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-[11px] text-red-600 mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {serverError && (
            <p className="text-[11px] text-red-600">{serverError}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-emerald-600 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-emerald-700 transition disabled:opacity-60"
          >
            {isLoading ? 'Creating account…' : 'Create account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationModal;
