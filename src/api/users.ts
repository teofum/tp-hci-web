const API_URL = 'http://localhost:8080/api';

export const auth = {
  async login(email: string, password: string) {
    const response = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    return response.json();
  },

  async register(
    name: string,
    surname: string,
    email: string,
    password: string,
    metadata = {},
  ) {
    const response = await fetch(`${API_URL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, surname, email, password, metadata }),
    });
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    return response.json();
  },

  async sendVerification(email: string) {
    const response = await fetch(
      `${API_URL}/users/send-verification?email=${encodeURIComponent(email)}`,
      {
        method: 'POST',
      },
    );
    if (!response.ok) throw new Error(`Error: ${response.status}`);
  },

  async verifyAccount(code: string) {
    const response = await fetch(`${API_URL}/users/verify-account`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    return response.json();
  },

  async forgotPassword(email: string) {
    const response = await fetch(
      `${API_URL}/users/forgot-password?email=${encodeURIComponent(email)}`,
      {
        method: 'POST',
      },
    );
    if (!response.ok) throw new Error(`Error: ${response.status}`);
  },

  async resetPassword(code: string, password: string) {
    const response = await fetch(`${API_URL}/users/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, password }),
    });
    if (!response.ok) throw new Error(`Error: ${response.status}`);
  },

  async changePassword(
    token: string,
    currentPassword: string,
    newPassword: string,
  ) {
    const response = await fetch(`${API_URL}/users/change-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    if (!response.ok) throw new Error(`Error: ${response.status}`);
  },

  async getCurrentUser(token: string) {
    const response = await fetch(`${API_URL}/users/profile`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    return response.json();
  },

  async updateProfile(
    token: string,
    name: string,
    surname: string,
    metadata = {},
  ) {
    const response = await fetch(`${API_URL}/users/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, surname, metadata }),
    });
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    return response.json();
  },

  async logout(token: string) {
    const response = await fetch(`${API_URL}/users/logout`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error(`Error: ${response.status}`);
  },
};
