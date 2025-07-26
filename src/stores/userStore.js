import { defineStore } from 'pinia'

// 模拟一个用户数据库，用于在浏览器中存储用户信息
const userDatabase = {
  // 从 localStorage 获取已保存的用户，如果没有则为空对象
  users: JSON.parse(localStorage.getItem('userDatabase')) || {},
  
  // 保存用户到 localStorage
  save() {
    localStorage.setItem('userDatabase', JSON.stringify(this.users));
  }
};

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      isLoggedIn: false,
      name: null,
      role: 'guest'
    }
  }),
  actions: {
    /**
     * 处理登录逻辑。
     * 现在会从我们的模拟数据库中查找真实姓名。
     */
    login(email, password) {
      console.log(`登录用户: ${email}`);
      
      // 检查模拟数据库中是否存在该用户
      if (userDatabase.users[email]) {
        // 如果存在，使用数据库中保存的真实姓名
        const registeredName = userDatabase.users[email].name;
        this.user = { isLoggedIn: true, name: registeredName, role: 'member' };
      } else {
        // 如果不存在（例如，直接用未注册的账号登录），则仍然使用邮箱前缀作为模拟
        const simulatedName = email.split('@')[0];
        this.user = { isLoggedIn: true, name: simulatedName, role: 'member' };
      }
    },
    
    /**
     * 处理退出登录逻辑。
     */
    logout() {
      this.user = { isLoggedIn: false, name: null, role: 'guest' };
    },
    
    /**
     * 处理注册逻辑。
     * 现在不仅会更新当前状态，还会将新用户信息存入我们的模拟数据库。
     */
    register(name, email, password) {
      console.log(`注册新用户: ${name}`);
      
      // 1. 将新用户信息存入模拟数据库
      userDatabase.users[email] = { name: name, password: password }; // 在真实应用中，密码会被加密
      userDatabase.save(); // 保存到 localStorage
      
      // 2. 更新当前登录状态
      this.user = { isLoggedIn: true, name: name, role: 'member' };
    }
  }
})