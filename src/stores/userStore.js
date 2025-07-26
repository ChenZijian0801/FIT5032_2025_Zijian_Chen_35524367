import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      isLoggedIn: false,
      name: null,
      role: 'guest'
    }
  }),
  actions: {
    login(email, password) {
      console.log(`Logging in with: ${email}`);
      this.user = { isLoggedIn: true, name: 'Mock User', role: 'member' };
    },
    logout() {
      this.user = { isLoggedIn: false, name: null, role: 'guest' };
    },
    register(name, email, password) {
      console.log(`Registering user: ${name} with email: ${email}`);
      this.user = { isLoggedIn: true, name: name, role: 'member' };
    }
  }
})