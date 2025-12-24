// src/api/aiClient.js
export async function getEmissionSuggestions(prompt) {
  const res = await fetch('http://localhost:5000/HeyAIModel', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || err.message || 'AI request failed');
  }

  const data = await res.json();
  return data.text; // this is what AiModel.js returns
}
