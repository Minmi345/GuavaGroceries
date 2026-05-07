const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem('token')

  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  })

  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

