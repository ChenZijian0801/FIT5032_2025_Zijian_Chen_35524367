<template>
  <div class="container mt-4">
    <h1 class="mb-4">Knowledge Hub</h1>
    <div class="row">
        <div class="col-md-4">
            <div class="list-group">
                <a href="#" class="list-group-item list-group-item-action active">Anxiety Disorders</a>
                <a href="#" class="list-group-item list-group-item-action">Coping with Grief</a>
                <a href="#" class="list-group-item list-group-item-action">Depression</a>
            </div>
        </div>

        <div class="col-md-8">
            <h3>Book recommendations</h3>
            <p>Curated books to help you on your journey.</p>
            <div class="row g-4">
                <div class="col-md-6" v-for="book in books" :key="book.id">
                    <BookRating :book="book" />
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import BookRating from '@/components/BookRating.vue';

const books = ref([
    { id: 1, title: 'Patient Guide to Mood and Anxiety', author: 'Charles B. Nemeroff', avgRating: 4.5 },
    { id: 2, title: '10 Simple Solutions to Panic', author: 'Martin M. Antony', avgRating: 4.8 }
]);
</script>