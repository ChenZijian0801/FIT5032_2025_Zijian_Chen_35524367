非常抱歉，这是我的疏忽！

您指出的这个问题完全是我的错误。在我上次为您提供完整代码时，我不小心用占位符注释替换了“图书推荐”和“知识百科”这两个板块的实际内容，导致它们变空了。当您点击这两个选项卡时，程序逻辑是正确的，但因为没有内容可以显示，所以右侧区域就变成了一片空白。

再次为我的失误向您道歉。下面是 **`src/views/KnowledgeHub.vue`** 文件的**完整且正确**的版本，其中包含了所有三个板块的内容。

请用下面的代码**完整替换**您现有的 `src/views/KnowledgeHub.vue` 文件，问题就能解决了。

```vue
<template>
  <div class="container mt-4">
    <h1 class="mb-4">Knowledge Hub</h1>
    <div class="row g-5">
      <div class="col-md-4">
        <div class="list-group shadow-sm">
          <a 
            href="#" 
            class="list-group-item list-group-item-action" 
            :class="{ 'active': activeView === 'books' }"
            @click.prevent="activeView = 'books'"
          >
            <i class="bi bi-book me-2"></i> Book Recommendations
          </a>
          <a 
            href="#" 
            class="list-group-item list-group-item-action"
            :class="{ 'active': activeView === 'encyclopedia' }"
            @click.prevent="activeView = 'encyclopedia'"
          >
            <i class="bi bi-lightbulb me-2"></i> Mental Health Encyclopedia
          </a>
          <a 
            href="#" 
            class="list-group-item list-group-item-action"
            :class="{ 'active': activeView === 'exercises' }"
            @click.prevent="activeView = 'exercises'"
          >
            <i class="bi bi-wind me-2"></i> Mindfulness Exercises
          </a>
        </div>
      </div>

      <div class="col-md-8">
        <div v-if="activeView === 'books'">
          <h3 class="mb-3">Book Recommendations</h3>
          <p class="text-muted">Curated books to help you on your journey.</p>
          <div class="row g-4">
            <div class="col-md-6" v-for="book in books" :key="book.id">
              <BookRating :book="book" />
            </div>
          </div>
        </div>

        <div v-if="activeView === 'encyclopedia'">
          <h3 class="mb-3">Mental Health Encyclopedia</h3>
          <p class="text-muted">Quick answers to common questions about mental wellness.</p>
          <div class="accordion" id="encyclopediaAccordion">
            <div class="accordion-item" v-for="(item, index) in encyclopedia" :key="item.id">
              <h2 class="accordion-header" :id="'heading' + item.id">
                <button class="accordion-button" :class="{'collapsed': index !== 0}" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse' + item.id" aria-expanded="true" :aria-controls="'collapse' + item.id">
                  {{ item.question }}
                </button>
              </h2>
              <div :id="'collapse' + item.id" class="accordion-collapse collapse" :class="{'show': index === 0}" :aria-labelledby="'heading' + item.id" data-bs-parent="#encyclopediaAccordion">
                <div class="accordion-body">
                  {{ item.answer }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="activeView === 'exercises'" class="exercises">
           <h3 class="mb-3">Mindfulness Exercises</h3>
           <p class="text-muted">Simple exercises to help you find calm and focus in your daily life.</p>
           <div class="card">
                <div class="card-body p-4">
                    <h5 class="card-title">5-Minute Breathing Exercise</h5>
                    <p class="card-text">
                        1. Find a comfortable, quiet place to sit or lie down. <br>
                        2. Close your eyes gently. <br>
                        3. Bring your attention to your breath. Notice the sensation of the air entering your nostrils and filling your lungs. <br>
                        4. Inhale slowly through your nose for a count of four. <br>
                        5. Hold your breath for a count of four. <br>
                        6. Exhale slowly through your mouth for a count of six. <br>
                        7. Repeat this cycle for 5 minutes. If your mind wanders, gently guide it back to your breath.
                    </p>
                    <audio controls class="w-100">
                        <source :src="relaxAudio" type="audio/mpeg">
                        Your browser does not support the audio element.
                    </audio>
                </div>
           </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import BookRating from '@/components/BookRating.vue';
import relaxAudio from '@/assets/audio/just-relax-11157.mp3';

// 控制当前显示哪个视图
const activeView = ref('books'); // 默认显示图书推荐

// 图书推荐数据
const books = ref([
    { id: 1, title: 'Patient Guide to Mood and Anxiety', author: 'Charles B. Nemeroff', avgRating: 4.5 },
    { id: 2, title: '10 Simple Solutions to Panic', author: 'Martin M. Antony', avgRating: 4.8 }
]);

// 心理知识百科数据
const encyclopedia = ref([
  {
    id: 'q1',
    question: 'What is Mindfulness?',
    answer: 'Mindfulness is the practice of purposely bringing one\'s attention in the present moment without judgment, a skill one develops through meditation or other training. It is derived from Buddhist traditions and has been shown to be effective for a wide range of psychological conditions.'
  },
  {
    id: 'q2',
    question: 'What is Cognitive Behavioral Therapy (CBT)?',
    answer: 'Cognitive Behavioral Therapy (CBT) is a type of psychotherapeutic treatment that helps people learn how to identify and change destructive or disturbing thought patterns that have a negative influence on behavior and emotions. It focuses on changing the automatic negative thoughts that can contribute to and worsen emotional difficulties, depression, and anxiety.'
  },
  {
    id: 'q3',
    question: 'What is the difference between anxiety and stress?',
    answer: 'Stress is a response to a threat in a situation. Anxiety is a reaction to the stress. While stress is a response to external pressures, anxiety is characterized by persistent, excessive worries that don\'t go away even in the absence of a stressor.'
  }
]);
</script>

<style scoped>
/* Scoped styles */
.list-group-item.active {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}
.accordion-button:not(.collapsed) {
    color: #fff;
    background-color: var(--primary-hover-color);
}
.accordion-button:focus {
    box-shadow: none;
    border-color: rgba(0,0,0,.125);
}
.exercises .card {
  border: 1px solid var(--border-color);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}
.exercises .card-title {
  font-family: var(--font-family-heading);
  font-weight: 500;
  color: var(--primary-color);
  margin-bottom: 1rem;
}
.exercises .card-text {
  font-family: var(--font-family-sans);
  line-height: 1.8;
  font-size: 1.05rem;
}
.exercises audio {
  margin-top: 1.5rem;
}
</style>
