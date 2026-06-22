const API_BASE_URL = 'http://localhost:8000';
const TOKEN_STORAGE_KEY = 'sportsee-token';
const USER_ID_STORAGE_KEY = 'sportsee-user-id';

async function parseJsonResponse(response) {
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message ?? 'Une erreur est survenue.');
  }

  return data;
}

export async function loginUser(credentials) {
  const response = await fetch(`${API_BASE_URL}/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  console.log (response);

  return parseJsonResponse(response);
}

export function saveSession(token, userId) {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);

  if (userId) {
    localStorage.setItem(USER_ID_STORAGE_KEY, userId);
  }
}

export function getStoredToken() {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
}

export function getStoredUserId() {
  return localStorage.getItem(USER_ID_STORAGE_KEY);
}

export function clearSession() {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  localStorage.removeItem(USER_ID_STORAGE_KEY);
}

export function getAuthHeaders(token = getStoredToken()) {
  return token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};
}

export async function restoreSession() {
  const token = getStoredToken();

  if (!token) {
    return { isAuthenticated: false };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/user-info`, {
      headers: {
        ...getAuthHeaders(token),
      },
    });

    await parseJsonResponse(response);

    return {
      isAuthenticated: true,
      userId: getStoredUserId(),
    };
  } catch {
    clearSession();

    return { isAuthenticated: false };
  }
}