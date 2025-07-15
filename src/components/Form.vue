<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center">User Information Form</h1>
        <form @submit.prevent="submitForm">
          <div class="row mb-3">
            <div class="col-12 col-sm-6">
              <label for="username" class="form-label">Username</label>
              <input
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors.username, 'is-valid': validationStatus.username === true && !errors.username }"
                id="username"
                v-model="formData.username"
                @blur="validateField('username', formData.username)"
              >
              <div v-if="errors.username" class="invalid-feedback">
                {{ errors.username }}
              </div>
              <div v-if="validationStatus.username === true && !errors.username" class="valid-feedback">
                Looks good!
              </div>
            </div>
            <div class="col-12 col-sm-6">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                :class="{ 'is-invalid': errors.password, 'is-valid': validationStatus.password === true && !errors.password }"
                id="password"
                v-model="formData.password"
                @blur="validateField('password', formData.password)"
              >
              <div v-if="errors.password" class="invalid-feedback">
                {{ errors.password }}
              </div>
              <div v-if="validationStatus.password === true && !errors.password" class="valid-feedback">
                Looks good!
              </div>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-12 col-sm-6">
              <div class="form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="isAustralian"
                  v-model="formData.isAustralian"
                  @change="validateField('isAustralian', formData.isAustralian)"
                >
                <label class="form-check-label" for="isAustralian">Australian Resident?</label>
                <div v-if="errors.isAustralian" class="invalid-feedback d-block">
                  {{ errors.isAustralian }}
                </div>
              </div>
            </div>
            <div class="col-12 col-sm-6">
              <label for="gender" class="form-label">Gender</label>
              <select
                class="form-select"
                :class="{ 'is-invalid': errors.gender, 'is-valid': validationStatus.gender === true && !errors.gender }"
                id="gender"
                v-model="formData.gender"
                @blur="validateField('gender', formData.gender)"
                @change="validateField('gender', formData.gender)"
              >
                <option value="" disabled selected>Select your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <div v-if="errors.gender" class="invalid-feedback">
                {{ errors.gender }}
              </div>
              <div v-if="validationStatus.gender === true && !errors.gender" class="valid-feedback">
                Looks good!
              </div>
            </div>
          </div>
          <div class="row mb-3">
            <label for="reason" class="form-label">Reason for joining</label>
            <textarea
              class="form-control"
              :class="{ 'is-invalid': errors.reason, 'is-valid': validationStatus.reason === true && !errors.reason }"
              id="reason"
              rows="3"
              v-model="formData.reason"
              @blur="validateField('reason', formData.reason)"
            ></textarea>
            <div v-if="errors.reason" class="invalid-feedback">
              {{ errors.reason }}
            </div>
            <div v-if="validationStatus.reason === true && !errors.reason" class="valid-feedback">
              Looks good!
            </div>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Submit</button>
            <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
          </div>
        </form>
      </div>
    </div>

    <div class="row mt-5" v-if="submittedCards.length">
      <div class="col-12">
        <h2 class="text-center mb-3">Submitted User Information</h2>
        <DataTable :value="submittedCards" responsiveLayout="scroll" class="p-datatable-sm">
          <Column field="username" header="Username"></Column>
          <Column field="password" header="Password"></Column>
          <Column header="Australian Resident">
            <template #body="slotProps">
              {{ slotProps.data.isAustralian ? 'Yes' : 'No' }}
            </template>
          </Column>
          <Column field="gender" header="Gender"></Column>
          <Column field="reason" header="Reason"></Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const formData = ref({
    username: '',
    password: '',
    isAustralian: false,
    reason: '',
    gender: ''
});

const submittedCards = ref([]);

const errors = ref({
    username: null,
    password: null,
    isAustralian: null,
    reason: null,
    gender: null
});

const validationStatus = ref({
    username: null,
    password: null,
    isAustralian: null,
    reason: null,
    gender: null
});

const validateField = (fieldName, value) => {
    let isValid = true;
    let errorMessage = null;

    switch (fieldName) {
        case 'username':
            if (value === null || value.length < 3) {
                isValid = false;
                errorMessage = 'Username must be at least 3 characters.';
            }
            break;
        case 'password':
            if (value === null || value.length < 8) {
                isValid = false;
                errorMessage = 'Password must be at least 8 characters long.';
            } else if (!/[A-Z]/.test(value)) {
                isValid = false;
                errorMessage = 'Password must contain at least one uppercase letter.';
            } else if (!/[a-z]/.test(value)) {
                isValid = false;
                errorMessage = 'Password must contain at least one lowercase letter.';
            } else if (!/\d/.test(value)) {
                isValid = false;
                errorMessage = 'Password must contain at least one digit.';
            } else if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value)) {
                isValid = false;
                errorMessage = 'Password must contain at least one special character.';
            }
            break;
        case 'isAustralian':
            
             if (!value) {
                 isValid = false;
                errorMessage = 'You must be an Australian Resident.';
            }
            break;
        case 'reason':
            if (value === null || value.trim() === '') {
                isValid = false;
                errorMessage = 'Reason for joining is required.';
            }
            break;
        case 'gender':
            if (value === null || value === '') {
                isValid = false;
                errorMessage = 'Please select your gender.';
            }
            break;
        default:
            break;
    }

    validationStatus.value[fieldName] = isValid;
    errors.value[fieldName] = errorMessage;
    return isValid;
};


watch(() => formData.value.username, (newValue) => {
    validateField('username', newValue);
});

watch(() => formData.value.password, (newValue) => {
    validateField('password', newValue);
});

watch(() => formData.value.isAustralian, (newValue) => {
    validateField('isAustralian', newValue);
});

watch(() => formData.value.reason, (newValue) => {
    validateField('reason', newValue);
});

watch(() => formData.value.gender, (newValue) => {
    validateField('gender', newValue);
});

const submitForm = () => {
    let isFormValid = true;

    
    for (const fieldName in formData.value) {
        const fieldIsValid = validateField(fieldName, formData.value[fieldName]);
        if (!fieldIsValid) {
            isFormValid = false;
        }
    }

    if (isFormValid) {
        submittedCards.value.push({
            ...formData.value
        });
        clearForm();
    } else {
        console.log("Form has validation errors. Please correct them before submitting.");
    }
};

const clearForm = () => {
    formData.value = {
        username: '',
        password: '',
        isAustralian: false,
        reason: '',
        gender: ''
    };
    
    for (const field in validationStatus.value) {
        validationStatus.value[field] = null;
        errors.value[field] = null;
    }
};
</script>

<style scoped>
   
    /* Basic styling for DataTable to match the overall theme if needed */
    .p-datatable {
      font-size: 0.9rem; /* Adjust font size */
    }
    .p-datatable-thead > tr > th {
      background-color: #275FDA !important; /* Match header color to previous card header */
      color: white !important;
      padding: 0.75rem;
    }
</style>