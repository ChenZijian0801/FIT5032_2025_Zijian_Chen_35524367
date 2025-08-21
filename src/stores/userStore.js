import { defineStore } from 'pinia'
import { auth } from '@/firebaseConfig'
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";
import router from '@/router';

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
    // 唯一的初始化函数，用于在应用启动时监听 Firebase 的认证状态
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
    
    async register(name, email, password) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        router.push('/');
      } catch (error) {
        alert(error.message);
      }
    },
    
    async login(email, password) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        router.push('/community');
      } catch (error) {
        alert(error.message);
      }
    },
    
    async logout() {
      try {
        await signOut(auth);
        router.push('/');
      } catch (error) {
        alert(error.message);
      }
    }
  }
})