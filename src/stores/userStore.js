import { defineStore } from 'pinia'


const userDatabase = {
  
  users: JSON.parse(localStorage.getItem('userDatabase')) || {},
  
  
  save() {
    localStorage.setItem('userDatabase', JSON.stringify(this.users));
  }
};


function getRoleFromEmail(email) {
  if (email && email.includes('@admin')) {
    return 'admin';
  }
  return 'member';
}

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
      console.log(`登录用户: ${email}`);
      const role = getRoleFromEmail(email); 
      
      if (userDatabase.users[email]) {
        const registeredName = userDatabase.users[email].name;
        this.user = { isLoggedIn: true, name: registeredName, role: role };
      } else {
        const simulatedName = email.split('@')[0];
        this.user = { isLoggedIn: true, name: simulatedName, role: role };
      }
    },
    
    logout() {
      this.user = { isLoggedIn: false, name: null, role: 'guest' };
    },
    
    register(name, email, password) {
      console.log(`注册新用户: ${name}`);
      const role = getRoleFromEmail(email); 
      
      userDatabase.users[email] = { name: name, password: password, role: role };
      userDatabase.save();
      
      this.user = { isLoggedIn: true, name: name, role: role };
    }
  }
})