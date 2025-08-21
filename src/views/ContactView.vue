<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6">
        <div class="card p-4">
          <h1 class="text-center mb-4">Contact Us</h1>
          <p class="text-center text-muted mb-4">Have a question or feedback? Fill out the form below to send us a message.</p>

          <form @submit.prevent="sendEmail">
            <div class="mb-3">
              <label for="from_name" class="form-label">Your Name</label>
              <input type="text" class="form-control" id="from_name" v-model="from_name" required>
            </div>
            <div class="mb-3">
              <label for="from_email" class="form-label">Your Email</label>
              <input type="email" class="form-control" id="from_email" v-model="from_email" required>
            </div>
            <div class="mb-3">
              <label for="message" class="form-label">Message</label>
              <textarea class="form-control" id="message" rows="5" v-model="message" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary w-100" :disabled="isSending">
              {{ isSending ? 'Sending...' : 'Send Message' }}
            </button>
          </form>

          <div v-if="statusMessage" class="alert mt-4" :class="statusClass" role="alert">
            {{ statusMessage }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import emailjs from '@emailjs/browser';

const from_name = ref('');
const from_email = ref('');
const message = ref('');

const isSending = ref(false);
const statusMessage = ref('');
const isError = ref(false);

const statusClass = computed(() => isError.value ? 'alert-danger' : 'alert-success');

const sendEmail = () => {
  isSending.value = true;
  statusMessage.value = '';

  const templateParams = {
    from_name: from_name.value,
    from_email: from_email.value,
    message: message.value
  };

  // 替换为您自己的 EmailJS Keys
  emailjs.send(
    'A3',      // 替换为您的 Service ID
    'template_8u0efbe',     // 替换为您的 Template ID
    templateParams,
    'Qv68-sjDAxnje11Iu'       // 替换为您的 Public Key
  )
  .then((response) => {
    console.log('SUCCESS!', response.status, response.text);
    isError.value = false;
    statusMessage.value = 'Your message has been sent successfully!';
    // 清空表单
    from_name.value = '';
    from_email.value = '';
    message.value = '';
  }, (error) => {
    console.log('FAILED...', error);
    isError.value = true;
    statusMessage.value = 'Failed to send message. Please try again later.';
  })
  .finally(() => {
    isSending.value = false;
  });
};
</script>