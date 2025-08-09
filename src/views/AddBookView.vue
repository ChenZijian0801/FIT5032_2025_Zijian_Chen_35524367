<template>
  <div class="container mt-4">
    <div class="card p-4">
      <h3 class="card-title">Add Book</h3>
      <form @submit.prevent="addBook">
        <div class="mb-3">
          <label for="bookName" class="form-label">Book Name:</label>
          <input type="text" id="bookName" class="form-control" v-model="newBook.name" required>
        </div>
        <div class="mb-3">
          <label for="bookAuthor" class="form-label">Author:</label>
          <input type="text" id="bookAuthor" class="form-control" v-model="newBook.author" required>
        </div>
        <div class="mb-3">
          <label for="bookIsbn" class="form-label">ISBN:</label>
          <input type="text" id="bookIsbn" class="form-control" v-model="newBook.isbn"> 
        </div>
        <div class="mb-3">
          <label for="bookPublisher" class="form-label">Publisher:</label>
          <input type="text" id="bookPublisher" class="form-control" v-model="newBook.publisher">
        </div>
        <div class="mb-3">
          <label for="bookPublicationYear" class="form-label">Publication Year:</label>
          <input type="number" id="bookPublicationYear" class="form-control" v-model.number="newBook.publicationYear" min="0" max="2100">
        </div>
        <button type="submit" class="btn btn-primary">Add Book</button>
      </form>
      <div v-if="message" class="mt-3 alert" :class="messageType === 'success' ? 'alert-success' : 'alert-danger'">
        {{ message }}
      </div>
    </div>

    <Booklist /> 
  </div>
</template>

<script>
import { app as firebaseApp, db } from '../firebase/init';
import { collection, addDoc } from "firebase/firestore"; 

// 导入 Booklist 组件
import Booklist from '../components/Booklist.vue'; 

export default {
  name: 'AddBookView', 
  components: {
    Booklist, // 注册 Booklist 组件
  },
  data() {
    return {
      newBook: {
        name: '',
        author: '',
        isbn: '',
        publisher: '',
        publicationYear: null,
        createdAt: null,
      },
      message: '',
      messageType: '',
    };
  },
  methods: {
    async addBook() {
      // 保持 ISBN 格式验证已移除
      // 出版年份验证保持不变
      if (this.newBook.publicationYear !== null && (this.newBook.publicationYear < 0 || this.newBook.publicationYear > 2100)) {
        this.message = 'Publication year must be between 0 and 2100.';
        this.messageType = 'danger';
        return;
      }

      this.newBook.createdAt = new Date();

      try {
        const docRef = await addDoc(collection(db, "books"), {
          ...this.newBook
        });
        console.log("Document written with ID: ", docRef.id);
        this.message = 'Book added successfully with ID: ' + docRef.id;
        this.messageType = 'success';
        // 清空表单
        this.newBook = {
          name: '',
          author: '',
          isbn: '',
          publisher: '',
          publicationYear: null,
          createdAt: null,
        };
        // 关键：成功添加后，重新加载书籍列表以显示新数据
        // 最简单的办法是刷新整个页面，或者你可以让 Booklist 组件接收一个 prop 来触发刷新
        // 但根据图片，Booklist 自身会加载，所以这里可能不需要明确刷新。
        // 如果数据没有立即更新，你可以考虑在 Booklist 中使用 onSnapshot 监听实时更新。
      } catch (e) {
        console.error("Error adding document: ", e);
        this.message = 'Error adding book: ' + e.message;
        this.messageType = 'danger';
      }
    },
  },
};
</script>

<style scoped>
/* 你的 CSS 样式 */
</style>