// src/Pages/TrackerPage.jsx
import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  TrendingDown,
  Leaf,
  Trash2,
  Edit2,
  Calendar,
  PieChart,
  Wand2,
} from 'lucide-react';

// ====== Simple API helpers (uses JWT from localStorage) ======
const API_BASE = 'http://localhost:5000'; // change if your backend differs

function getAuthHeaders() {
  const token = window.localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = 'Bearer ' + token;
  return headers;
}

async function apiGet(path) {
  const res = await fetch(API_BASE + path, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

async function apiPost(path, body) {
  const res = await fetch(API_BASE + path, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

async function apiPut(path, body) {
  const res = await fetch(API_BASE + path, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

async function apiDelete(path) {
  const res = await fetch(API_BASE + path, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

// Gemini backend
async function callAi(prompt) {
  const res = await fetch(API_BASE + '/api/ai/HeyAIModel', {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ prompt }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || data.message || 'AI request failed');
  return data.text;
}

// ====== TrackerPage component ======
function TrackerPage() {
  const [activities, setActivities] = useState([]);
  const [formData, setFormData] = useState({
    activityType: 'transportation',
    subType: '',
    value: '',
    unit: 'km',
    date: new Date().toISOString().split('T')[0],
  });
  const [editingId, setEditingId] = useState(null);
  const [totalEmissions, setTotalEmissions] = useState(0);

  const [aiLoading, setAiLoading] = useState(false);
  const [aiText, setAiText] = useState('');
  const [aiError, setAiError] = useState('');

  // Emission factors
  const emissionFactors = {
    transportation: {
      car_petrol: { value: 0.192, unit: 'km', label: 'Car (Petrol)' },
      car_diesel: { value: 0.171, unit: 'km', label: 'Car (Diesel)' },
      car_electric: { value: 0.053, unit: 'km', label: 'Car (Electric)' },
      motorcycle: { value: 0.113, unit: 'km', label: 'Motorcycle' },
      bus: { value: 0.089, unit: 'km', label: 'Bus' },
      train: { value: 0.041, unit: 'km', label: 'Train' },
      flight_domestic: { value: 0.255, unit: 'km', label: 'Flight (Domestic)' },
      flight_international: { value: 0.195, unit: 'km', label: 'Flight (International)' },
      bicycle: { value: 0, unit: 'km', label: 'Bicycle' },
      walking: { value: 0, unit: 'km', label: 'Walking' },
    },
    energy: {
      electricity: { value: 0.233, unit: 'kWh', label: 'Electricity' },
      natural_gas: { value: 0.203, unit: 'kWh', label: 'Natural Gas' },
      heating_oil: { value: 0.298, unit: 'L', label: 'Heating Oil' },
      coal: { value: 0.346, unit: 'kg', label: 'Coal' },
      solar: { value: 0.041, unit: 'kWh', label: 'Solar Energy' },
      wind: { value: 0.011, unit: 'kWh', label: 'Wind Energy' },
    },
    food: {
      beef: { value: 27, unit: 'kg', label: 'Beef' },
      lamb: { value: 39.2, unit: 'kg', label: 'Lamb' },
      pork: { value: 12.1, unit: 'kg', label: 'Pork' },
      chicken: { value: 6.9, unit: 'kg', label: 'Chicken' },
      fish: { value: 6.1, unit: 'kg', label: 'Fish' },
      eggs: { value: 4.8, unit: 'kg', label: 'Eggs' },
      cheese: { value: 13.5, unit: 'kg', label: 'Cheese' },
      milk: { value: 1.9, unit: 'L', label: 'Milk' },
      vegetables: { value: 2, unit: 'kg', label: 'Vegetables' },
      fruits: { value: 1.1, unit: 'kg', label: 'Fruits' },
      grains: { value: 1.5, unit: 'kg', label: 'Grains' },
    },
    waste: {
      landfill: { value: 0.6, unit: 'kg', label: 'Landfill Waste' },
      recycling: { value: 0.021, unit: 'kg', label: 'Recycling' },
      composting: { value: 0.012, unit: 'kg', label: 'Composting' },
      plastic: { value: 6, unit: 'kg', label: 'Plastic Waste' },
      paper: { value: 0.95, unit: 'kg', label: 'Paper Waste' },
      glass: { value: 0.67, unit: 'kg', label: 'Glass Waste' },
    },
  };

  function calculateEmissions(activityType, subType, value) {
    const factor = emissionFactors[activityType]?.[subType];
    if (!factor) return '0.00';
    const n = parseFloat(value || 0) * factor.value;
    return n.toFixed(2);
  }

  // Load activities from Mongo when page loads
  useEffect(() => {
    async function loadActivities() {
      try {
        const data = await apiGet('/api/activities');
        setActivities(data);
      } catch (err) {
        console.error('Load activities error:', err.message);
      }
    }
    loadActivities();
  }, []);

  // Recompute total emissions
  useEffect(() => {
    const sum = activities.reduce(
      (s, a) => s + parseFloat(a.emissions || 0),
      0
    );
    setTotalEmissions(sum.toFixed(2));
  }, [activities]);

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === 'activityType') {
      setFormData({
        activityType: value,
        subType: '',
        value: '',
        unit: emissionFactors[value]?.[Object.keys(emissionFactors[value])[0]]?.unit || '',
        date: formData.date,
      });
      return;
    }

    if (name === 'subType') {
      const factor = emissionFactors[formData.activityType]?.[value];
      setFormData((prev) => ({
        ...prev,
        subType: value,
        unit: factor ? factor.unit : prev.unit,
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.subType || !formData.value) {
      alert('Please fill all required fields');
      return;
    }

    const factor = emissionFactors[formData.activityType][formData.subType];
    const emissions = parseFloat(
      calculateEmissions(formData.activityType, formData.subType, formData.value)
    );

    const payload = {
      activityType: formData.activityType,
      subType: formData.subType,
      subTypeLabel: factor.label,
      value: parseFloat(formData.value),
      unit: formData.unit,
      emissions,
      date: formData.date,
    };

    try {
      if (editingId) {
        const updated = await apiPut('/api/activities/' + editingId, payload);
        setActivities((prev) =>
          prev.map((a) => (a._id === editingId ? updated : a))
        );
        setEditingId(null);
      } else {
        const created = await apiPost('/api/activities', payload);
        setActivities((prev) => [created, ...prev]);
      }

      setFormData({
        activityType: 'transportation',
        subType: '',
        value: '',
        unit: 'km',
        date: new Date().toISOString().split('T')[0],
      });
    } catch (err) {
      alert(err.message || 'Could not save activity');
    }
  }

  function handleEdit(activity) {
    setFormData({
      activityType: activity.activityType,
      subType: activity.subType,
      value: activity.value,
      unit: activity.unit,
      date: activity.date,
    });
    setEditingId(activity._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this activity?')) return;
    try {
      await apiDelete('/api/activities/' + id);
      setActivities((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      alert(err.message || 'Could not delete activity');
    }
  }

  // ---- AI: only from current activities ----
  async function handleGenerateAiTips() {
    if (!activities.length) {
      setAiError('Add at least one activity before asking for tips.');
      return;
    }

    try {
      setAiLoading(true);
      setAiError('');
      setAiText('');

      const summary = activities.slice(0, 30).map((a) => ({
        date: a.date,
        activityType: a.activityType,
        subTypeLabel: a.subTypeLabel,
        value: a.value,
        unit: a.unit,
        emissions: a.emissions,
      }));

      const prompt =
        'You are helping a user reduce their carbon footprint.\n' +
        'Here is their recent activity data as JSON:\n' +
        JSON.stringify(summary) +
        '\n\n' +
        'Based ONLY on this data (do not guess anything else), ' +
        'give 3–5 short, practical suggestions to reduce emissions next week. ' +
        'Focus on activities that have higher emissions in this list. ' +
        'Answer as bullet points, very concise.';

      const text = await callAi(prompt);
      setAiText(text);
    } catch (err) {
      setAiError(err.message || 'Failed to fetch AI tips');
    } finally {
      setAiLoading(false);
    }
  }

  // Monthly stats (for cards only)
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();
  const monthlyActivities = activities.filter((a) => {
    const d = new Date(a.date);
    return d.getMonth() === month && d.getFullYear() === year;
  });
  const monthlyEmissions = monthlyActivities
    .reduce((s, a) => s + parseFloat(a.emissions || 0), 0)
    .toFixed(2);

  const categoryTotals = activities.reduce((acc, a) => {
    acc[a.activityType] = (acc[a.activityType] || 0) + (a.emissions || 0);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BarChart3 className="w-10 h-10 text-emerald-600" />
            <h1 className="text-4xl font-bold text-gray-900">
              Carbon Footprint Tracker
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Log your activities, store them in your account, and let AI suggest
            reduction tips based only on your data.
          </p>
        </div>

        {/* Stats cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Total emissions</h3>
              <TrendingDown className="w-6 h-6 text-emerald-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{totalEmissions} kg</p>
            <p className="text-sm text-gray-500 mt-2">CO₂ from all logged activities</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">This month</h3>
              <Calendar className="w-6 h-6 text-emerald-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{monthlyEmissions} kg</p>
            <p className="text-sm text-gray-500 mt-2">
              {monthlyActivities.length} activities logged
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Categories used</h3>
              <PieChart className="w-6 h-6 text-emerald-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {Object.keys(categoryTotals).length}
            </p>
            <p className="text-sm text-gray-500 mt-2">activity types</p>
          </div>
        </div>

        {/* AI box */}
        <div className="mb-12 bg-white border border-emerald-100 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Wand2 className="w-5 h-5 text-emerald-600" />
              <h2 className="text-base font-semibold text-gray-900">
                AI tips from your activities
              </h2>
            </div>
            <button
              type="button"
              onClick={handleGenerateAiTips}
              disabled={aiLoading}
              className="text-xs px-3 py-1 rounded-full border border-emerald-200 text-emerald-700 hover:bg-emerald-50 disabled:opacity-60"
            >
              {aiLoading ? 'Thinking…' : 'Generate tips'}
            </button>
          </div>
          {aiError && <p className="text-xs text-red-600 mb-2">{aiError}</p>}
          <div className="text-xs text-gray-700 whitespace-pre-wrap leading-relaxed">
            {aiText ||
              (!aiLoading &&
                'Add some activities and click “Generate tips” to get suggestions based only on what you logged.')}
          </div>
        </div>

        {/* Form */}
        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {editingId ? 'Edit activity' : 'Log new activity'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Activity Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Activity type *
                </label>
                <select
                  name="activityType"
                  value={formData.activityType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  <option value="transportation">🚗 Transportation</option>
                  <option value="energy">⚡ Energy</option>
                  <option value="food">🍽️ Food</option>
                  <option value="waste">🗑️ Waste</option>
                </select>
              </div>

              {/* Sub type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specific activity *
                </label>
                <select
                  name="subType"
                  value={formData.subType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  <option value="">Select…</option>
                  {Object.entries(emissionFactors[formData.activityType] || {}).map(
                    ([key, factor]) => (
                      <option key={key} value={key}>
                        {factor.label}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount *
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    name="value"
                    value={formData.value}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                  <div className="px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg min-w-[70px] flex items-center justify-center text-sm">
                    {formData.unit || 'unit'}
                  </div>
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  max={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
            </div>

            {/* Emission preview */}
            {formData.subType && formData.value && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  Estimated emissions:
                  <span className="font-bold text-emerald-700 ml-2">
                    {calculateEmissions(
                      formData.activityType,
                      formData.subType,
                      formData.value
                    )}{' '}
                    kg CO₂
                  </span>
                </p>
              </div>
            )}

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition"
              >
                {editingId ? 'Update activity' : 'Log activity'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setFormData({
                      activityType: 'transportation',
                      subType: '',
                      value: '',
                      unit: 'km',
                      date: new Date().toISOString().split('T')[0],
                    });
                  }}
                  className="px-6 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* History */}
        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Activity history</h2>

          {activities.length === 0 ? (
            <div className="text-center py-12">
              <Leaf className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No activities logged yet</p>
              <p className="text-gray-400 text-sm mt-2">
                Log your first activity above to start tracking.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {activities.map((activity) => (
                <div
                  key={activity._id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-emerald-300 transition"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">
                          {activity.activityType === 'transportation'
                            ? '🚗'
                            : activity.activityType === 'energy'
                            ? '⚡'
                            : activity.activityType === 'food'
                            ? '🍽️'
                            : '🗑️'}
                        </span>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {activity.subTypeLabel}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {new Date(activity.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="ml-11">
                        <p className="text-gray-700">
                          <span className="font-medium">
                            {activity.value} {activity.unit}
                          </span>
                        </p>
                        <p className="text-emerald-700 font-bold mt-1">
                          {activity.emissions} kg CO₂
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleEdit(activity)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="Edit"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(activity._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TrackerPage;
