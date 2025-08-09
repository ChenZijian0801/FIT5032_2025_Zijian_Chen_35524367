// src/firebase/init.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// 从firebase/firestore导入getFirestore
import { getFirestore } from "firebase/firestore"; // 确保这一行没有被注释掉

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgi8XmDJn4FM3SzvKZQ1QaYXMcPZZBt9c",
  authDomain: "fit5032-5e8ec.firebaseapp.com",
  projectId: "fit5032-5e8ec",
  storageBucket: "fit5032-5e8ec.firebasestorage.app",
  messagingSenderId: "820513081373",
  appId: "1:820513081373:web:7bad421ec1a7c0bce71ef4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); // 将初始化后的app实例赋值给一个常量

// 获取Firestore数据库实例
const db = getFirestore(app); // 使用初始化后的app实例获取db

// 导出Firebase app实例和Firestore数据库实例
export { app, db }; 
// 或者，如果你只需要默认导出其中一个，比如app，那么：
// export default app;
// 并在需要db的地方，在组件内部执行 const db = getFirestore(app);
// 但为了方便直接导入db，这里同时导出是更直接的方式。