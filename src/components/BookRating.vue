<template>
  <div class="card overflow-hidden shadow-sm book-list-item">
    <div class="row g-0">
      <div class="col-sm-4 col-md-3 d-flex align-items-center justify-content-center p-3 book-cover-container">
        <img :src="book.img" class="img-fluid rounded-start" :alt="'Cover of ' + book.title">
      </div>
      <div class="col-sm-8 col-md-9">
        <div class="card-body d-flex flex-column h-100 p-4">
          <div>
            <h5 class="card-title fw-bold">{{ book.title }}</h5>
            <p class="card-text"><small class="text-muted">by {{ book.author }}</small></p>
            <p class="card-text book-description mt-3">{{ book.description }}</p>
          </div>
          
          <div class="d-flex justify-content-between align-items-end mt-auto pt-3">
            <div>
              <div class="mb-2">
                <strong class="me-2 rating-label">Avg. Rating:</strong>
                <span v-for="star in 5" :key="star" class="rating-star" :class="{ 'rated': star <= Math.round(book.avgRating) }">★</span>
                <span class="ms-1 text-muted">({{ book.avgRating.toFixed(1) }})</span>
              </div>
              <div>
                <strong class="me-2 rating-label">Your Rating:</strong>
                <span 
                  v-for="star in 5" 
                  :key="star" 
                  @click="rate(star)" 
                  class="rating-star interactive" 
                  :class="{ 'rated': star <= currentRating }"
                >★</span>
              </div>
            </div>
            <a href="#" class="btn btn-sm btn-primary align-self-end">Shop Now</a>
          </div>
        </div>
      </div>
    </div>
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
.book-list-item {
  transition: box-shadow 0.2s ease-in-out;
}
.book-list-item:hover {
  box-shadow: 0 8px 20px rgba(0,0,0,0.1) !important;
}
.img-fluid {
  max-height: 220px;
  object-fit: contain;
  box-shadow: 0 4px 15px rgba(0,0,0,0.15);
}
.book-cover-container {
  background-color: #f8f9fa;
}
.book-description {
  font-family: var(--font-family-sans);
  font-size: 0.95rem;
  color: var(--text-color);
  line-height: 1.6;
}
.rating-label {
  font-family: var(--font-family-sans);
  font-size: 0.9rem;
  font-weight: 700;
}
.rating-star {
  color: #e0e0e0; /* 未点亮的星星颜色 */
  font-size: 1.2rem;
  transition: color 0.2s ease-in-out, transform 0.1s ease-in-out;
}
.rating-star.rated {
  color: #ffc107; /* 点亮的星星颜色 */
}
.rating-star.interactive {
  cursor: pointer;
}
.rating-star.interactive:hover {
  transform: scale(1.2);
}
</style>