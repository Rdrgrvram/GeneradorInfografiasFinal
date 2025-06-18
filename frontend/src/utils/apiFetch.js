// src/utils/apiFetch.js
export const apiFetch = async (url, options = {}) => {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  try {
    const res = await fetch(url, {
      ...options,
      headers,
    });

    if (res.status === 401) {
      alert('⚠️ Sesión expirada. Por favor inicia sesión nuevamente.');
      localStorage.clear();
      window.location.href = '/login';
      return null;
    }

    return await res.json();
  } catch (err) {
    console.error('❌ Error de red:', err);
    return null;
  }
};
