<template>
  <div class="card p-3">
    <h4>Daily Knowledge Encyclopedia</h4>
    <div class="list-group list-group-flush">
      <a v-for="item in encyclopediaItems" :key="item.id" href="#" class="list-group-item list-group-item-action">
        {{ item.question }}
      </a>
    </div>
    <a href="#" class="d-block mt-2 text-end">See more</a>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const encyclopediaItems = ref([
  { id: 1, question: 'Example: What are emotions?' },
  { id: 2, question: 'Example: What is "mindfulness"?' },
  { id: 3, question: 'Example: What is the "placebo effect"?' }
]);
</script>