import { API } from './api';

export const auth = {
  async login(email: string, password: string) {
    return await API.post('users/login').withBody({ email, password }).send();
  },

  async register(
    name: string,
    surname: string,
    email: string,
    password: string,
  ) {
    return await API.post('users/register')
      .withBody({ name, surname, email, password, metadata: {} })
      .send();
  },

  async sendVerification(email: string) {
    await API.post('users/send-verification').withParams({ email }).send();
  },

  async verifyAccount(code: string) {
    return await API.post('users/verify-account').withBody({ code }).send();
  },

  async forgotPassword(email: string) {
    await API.post('users/forgot-password').withParams({ email }).send();
  },

  async resetPassword(code: string, password: string) {
    await API.post('users/reset-password').withBody({ code, password }).send();
  },

  async changePassword(currentPassword: string, newPassword: string) {
    await API.post('users/change-password')
      .withAuth()
      .withBody({ currentPassword, newPassword })
      .send();
  },

  async getCurrentUser() {
    return await API.get('users/profile').withAuth().send();
  },

  async updateProfile(name: string, surname: string) {
    return await API.put('users/profile')
      .withAuth()
      .withBody({ name, surname, metadata: {} })
      .send();
  },

  async logout() {
    await API.post('users/logout').withAuth().send();
  },
};
