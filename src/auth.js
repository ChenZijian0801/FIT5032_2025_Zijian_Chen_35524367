// src/auth.js

import { ref } from 'vue';
import { useRouter } from 'vue-router';
// 导入 Firebase Auth 模块和相关函数
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth';
// 确保导入你的 Firebase app 实例
import { app } from './firebase/init'; // 注意：这里是具名导入 { app }

// 使用 Firebase app 实例初始化 Auth 服务
const auth = getAuth(app);

// Reactive state to track authentication status
export const isAuthenticated = ref(false);
export const currentUser = ref(null); // 用于存储当前登录的用户信息

// --- 监听 Firebase 认证状态变化 ---
// 这个监听器是核心，它会在用户登录/登出时自动更新 isAuthenticated 和 currentUser
onAuthStateChanged(auth, (user) => {
  if (user) {
    // 用户已登录
    isAuthenticated.value = true;
    currentUser.value = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      // 你可以根据需要添加更多用户属性
    };
    console.log('Firebase Auth state changed: User logged in', currentUser.value.email);
  } else {
    // 用户已登出
    isAuthenticated.value = false;
    currentUser.value = null;
    console.log('Firebase Auth state changed: User logged out');
  }
});

/**
 * A "composable" function to handle authentication logic.
 */
export function useAuth() {
  const router = useRouter();

  // --- Firebase 登录函数 ---
  const login = async (email, password) => { // 接收email和password
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // Firebase 的 onAuthStateChanged 监听器会自动更新 isAuthenticated 和 currentUser
      console.log('Login successful for:', userCredential.user.email);
      router.push('/about'); // 登录成功后跳转到 /about 页面
      return true; // 返回true表示登录成功
    } catch (error) {
      console.error('Firebase Login error:', error.code, error.message);
      // 根据错误代码提供更具体的提示
      let errorMessage = 'Login failed. Please check your credentials.';
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No user found with this email.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address.';
      }
      alert(errorMessage);
      return false; // 返回false表示登录失败
    }
  };

  // --- Firebase 注册函数 (如果useAuth也处理注册) ---
  const register = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('Registration successful for:', userCredential.user.email);
      // 注册成功后，通常会自动登录，onAuthStateChanged 会处理状态更新
      // 可以选择跳转到登录页或直接跳转到主页
      router.push('/FireLogin'); // 或者 router.push('/')
      return true;
    } catch (error) {
      console.error('Firebase Registration error:', error.code, error.message);
      let errorMessage = 'Registration failed.';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already in use.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak. Must be at least 6 characters.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address.';
      }
      alert(errorMessage);
      return false;
    }
  };

  // --- Firebase 登出函数 ---
  const logout = async () => {
    try {
      await signOut(auth); // 调用 Firebase 的登出方法
      // onAuthStateChanged 监听器会自动将 isAuthenticated 更新为 false
      console.log('User logged out successfully from Firebase.');
      router.push('/FireLogin'); // 登出后重定向到 Firebase 登录页
    } catch (error) {
      console.error('Firebase Logout error:', error);
    }
  };

  return {
    isAuthenticated,
    currentUser, // 导出 currentUser
    login,
    register, // 导出注册函数 (如果需要)
    logout,
  };
}