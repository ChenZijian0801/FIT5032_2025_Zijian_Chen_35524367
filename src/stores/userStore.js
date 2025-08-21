import { defineStore } from 'pinia'
import { auth } from '@/firebaseConfig'
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";
import router from '@/router'; // 导入 router 以便在 action 中使用

function getRoleFromEmail(email) {
  return email && email.includes('@admin') ? 'admin' : 'member';
}

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      isLoggedIn: false,
      data: null, 
      role: 'guest'
    }
  }),
  actions: {
    // 初始化时调用，持续监听 Firebase 认证状态
    init() {
      onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
          this.user.isLoggedIn = true;
          this.user.data = { email: firebaseUser.email, uid: firebaseUser.uid };
          this.user.role = getRoleFromEmail(firebaseUser.email);
        } else {
          this.user.isLoggedIn = false;
          this.user.data = null;
          this.user.role = 'guest';
        }
      });
    },
    
    // 使用真实 Firebase 注册
    async register(name, email, password) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        // 注册成功后，onAuthStateChanged 会自动更新状态，然后跳转
        router.push('/');
      } catch (error) {
        alert(error.message);
      }
    },
    
    // 使用真实 Firebase 登录
    async login(email, password) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        // 登录成功后，onAuthStateChanged 会自动更新状态，然后跳转
        router.push('/community');
      } catch (error) {
        alert(error.message);
      }
    },
    
    // 使用真实 Firebase 登出
    async logout() {
      try {
        await signOut(auth);
        // 登出成功后，onAuthStateChanged 会自动更新状态，然后跳转
        router.push('/');
      } catch (error) {
        alert(error.message);
      }
    }
  }
})