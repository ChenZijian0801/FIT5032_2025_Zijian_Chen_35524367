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
          <div class="vstack gap-4">
            <BookRating v-for="book in books" :key="book.id" :book="book" />
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

// 移除了 'atomic-habits.jpg' 的导入
import imgBodyKeepsScore from '@/assets/images/The Body Keeps the Score.jpg';
import imgTalkToSomeone from '@/assets/images/Maybe You Should Talk to Someone.jpg';
import imgSearchForMeaning from '@/assets/images/Search for Meaning.jpg';
import imgPatientGuide from '@/assets/images/Patient Guide to Mood and Anxiety.jpg';
import imgSolutionsToPanic from '@/assets/images/10 Simple Solutions to Panic.jpg';

const activeView = ref('books');

const books = ref([
    { 
      id: 1, 
      title: 'The Body Keeps the Score', 
      author: 'Bessel van der Kolk', 
      avgRating: 4.8, 
      img: imgBodyKeepsScore,
      description: 'Explores how trauma reshapes both body and brain, compromising sufferers\' capacities for pleasure, engagement, self-control, and trust.'
    },
    // { // Atomic Habits 的对象已被删除
    //   id: 2, 
    //   ...
    // },
    {
      id: 3, 
      title: 'Maybe You Should Talk to Someone',
      author: 'Lori Gottlieb',
      avgRating: 4.7,
      img: imgTalkToSomeone,
      description: 'A therapist, reeling from a personal crisis, finds herself on the other side of the couch with her own therapist.'
    },
    {
      id: 4,
      title: 'Man\'s Search for Meaning',
      author: 'Viktor E. Frankl',
      avgRating: 4.6,
      img: imgSearchForMeaning,
      description: 'A classic tribute to hope from the Holocaust, arguing that we cannot avoid suffering but we can choose how to cope with it.'
    },
    { 
      id: 5, 
      title: 'Patient Guide to Mood and Anxiety', 
      author: 'Charles B. Nemeroff', 
      avgRating: 4.5, 
      img: imgPatientGuide,
      description: 'A comprehensive guide that offers insights into the causes, symptoms, and treatments for mood and anxiety disorders.'
    },
    { 
      id: 6, 
      title: '10 Simple Solutions to Panic', 
      author: 'Martin M. Antony', 
      avgRating: 4.8, 
      img: imgSolutionsToPanic,
      description: 'Provides easy-to-implement strategies and techniques for managing panic attacks and living a more peaceful life.'
    }
]);

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