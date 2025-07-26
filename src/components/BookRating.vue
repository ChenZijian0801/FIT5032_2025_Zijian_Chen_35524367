<template>
  <div class="card p-3 h-100">
    <h5>{{ book.title }}</h5>
    <p class="text-muted small">by {{ book.author }}</p>
    <div>
      <strong>Average Rating: {{ book.avgRating.toFixed(1) }} / 5.0</strong>
    </div>
    <div class="mt-2">
      <span>Your Rating: </span>
      <span v-for="star in 5" :key="star" @click="rate(star)" class="rating-star">
        {{ star <= currentRating ? '★' : '☆' }}
      </span>
    </div>
     <a href="#" class="btn btn-sm btn-outline-primary mt-3">Shop now ></a>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  book: Object
});

const currentRating = ref(0); 

const rate = (rating) => {
  currentRating.value = rating;
  alert(`Thank you for rating "${props.book.title}" ${rating} stars!`);
};
</script>

<style scoped>
.rating-star {
  cursor: pointer;
  font-size: 1.5rem;
  color: #ffc107;
}
</style>