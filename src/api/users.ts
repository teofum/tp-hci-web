import { loginResultSchema, userSchema } from '@/schemas/user.schema';
import { API } from './api';

export const auth = {
  async login(email: string, password: string) {
    const res = await API.post('users/login')
      .withBody({ email, password })
      .send();
    return loginResultSchema.parse(res);
  },

  async register(
    name: string,
    surname: string,
    email: string,
    password: string,
  ) {
    const res = await API.post('users/register')
      .withBody({ name, surname, email, password, metadata: {} })
      .send();
    return userSchema.parse(res);
  },

  async sendVerification(email: string) {
    await API.post('users/send-verification').withParams({ email }).send();
  },

  async verifyAccount(code: string) {
    const res = await API.post('users/verify-account')
      .withBody({ code })
      .send();
    return userSchema.parse(res);
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
    const res = await API.get('users/profile').withAuth().send();
    return userSchema.parse(res);
  },

  async updateProfile(name: string, surname: string) {
    const res = await API.put('users/profile')
      .withAuth()
      .withBody({ name, surname, metadata: {} })
      .send();
    return userSchema.parse(res);
  },

  async logout() {
    await API.post('users/logout').withAuth().send();
  },
};
