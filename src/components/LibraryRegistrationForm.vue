<script setup>
import { ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

// 表单数据模型 (为 suburb 设置了初始值)
const formData = ref({
  username: '',
  password: '',
  confirmPassword: '',
  isAustralian: false,
  reason: '',
  gender: '',
  suburb: 'Clayton' // 设置初始值以测试单向绑定
})

// 存储已提交的卡片数据
const submittedCards = ref([])

// 错误信息模型
const errors = ref({
  username: null,
  password: null,
  confirmPassword: null,
  reason: null,
  suburb: null,
  resident: null,
  gender: null
})

// 成功/提示信息模型
const reasonSuccessMessage = ref(null)

// 提交表单
const submitForm = () => {
  // 触发表单所有验证 (suburb 的验证不再由用户输入触发)
  validateName(true)
  validatePassword(true)
  validateConfirmPassword(true)
  validateReason(true)

  if (!errors.value.username && !errors.value.password && !errors.value.confirmPassword && !errors.value.reason) {
    const { confirmPassword, ...dataToSubmit } = formData.value
    submittedCards.value.push(dataToSubmit)
    clearForm()
  }
}

// 清空表单和错误信息
const clearForm = () => {
  formData.value = {
    username: '',
    password: '',
    confirmPassword: '',
    isAustralian: false,
    reason: '',
    gender: '',
    suburb: '' // 清空 suburb
  }
  errors.value = {
    username: null,
    password: null,
    confirmPassword: null,
    reason: null,
    suburb: null,
    resident: null,
    gender: null
  }
  reasonSuccessMessage.value = null
}

// 删除指定索引的卡片
const deleteCard = (index) => {
  submittedCards.value.splice(index, 1)
}

// --- 验证函数 ---
const validateName = (blur) => {
  if (formData.value.username.length < 3) {
    if (blur) errors.value.username = 'Name must be at least 3 characters'
  } else {
    errors.value.username = null
  }
}

const validatePassword = (blur) => {
  const password = formData.value.password
  const minLength = 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  if (password.length < minLength) {
    if (blur) errors.value.password = `Password must be at least ${minLength} characters long.`
  } else if (!hasUppercase) {
    if (blur) errors.value.password = 'Password must contain at least one uppercase letter.'
  } else if (!hasLowercase) {
    if (blur) errors.value.password = 'Password must contain at least one lowercase letter.'
  } else if (!hasNumber) {
    if (blur) errors.value.password = 'Password must contain at least one number.'
  } else if (!hasSpecialChar) {
    if (blur) errors.value.password = 'Password must contain at least one special character.'
  } else {
    errors.value.password = null
  }
}

const validateConfirmPassword = (blur) => {
  if (formData.value.password !== formData.value.confirmPassword) {
    if (blur) errors.value.confirmPassword = 'Passwords do not match'
  } else {
    errors.value.confirmPassword = null
  }
}

const validateReason = (blur) => {
  if (formData.value.reason.length > 0 && formData.value.reason.length < 10) {
    if (blur) errors.value.reason = 'Reason must be at least 10 characters'
    else errors.value.reason = null
  } else {
    errors.value.reason = null
  }
}

const checkReasonForFriend = () => {
    if (formData.value.reason.toLowerCase().includes('friend')) {
        reasonSuccessMessage.value = "Great to have a friend";
    } else {
        reasonSuccessMessage.value = null;
    }
}

// Suburb 的验证函数保留，但不再从输入框触发
const validateSuburb = (blur) => {
    if (formData.value.suburb.toLowerCase().trim() === 'sydney') {
        if (blur) errors.value.suburb = 'Sydney is not a valid suburb for this library.';
    } else {
        errors.value.suburb = null;
    }
}
</script>

<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center">🗄️ W5. Library Registration Form</h1>
        <p class="text-center">
          Let's build some more advanced features into our form.
        </p>
        <form @submit.prevent="submitForm">
          <div class="row mb-3">
            <div class="col-md-6">
              <label for="username" class="form-label">Username</label>
              <input
                type="text"
                class="form-control"
                id="username"
                @blur="() => validateName(true)"
                @input="() => validateName(false)"
                v-model="formData.username"
              />
              <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
            </div>
            <div class="col-md-6">
              <label for="gender" class="form-label">Gender</label>
              <select class="form-select" id="gender" v-model="formData.gender" required>
                <option disabled value="">Please select one</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-md-6 col-sm-6">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                @blur="() => validatePassword(true)"
                @input="() => validatePassword(false)"
                v-model="formData.password"
              />
              <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
            </div>
            <div class="col-md-6 col-sm-6">
              <label for="confirmPassword" class="form-label">Confirm password</label>
              <input
                type="password"
                class="form-control"
                id="confirmPassword"
                @blur="() => validateConfirmPassword(true)"
                @input="() => validateConfirmPassword(false)"
                v-model="formData.confirmPassword"
              />
              <div v-if="errors.confirmPassword" class="text-danger">{{ errors.confirmPassword }}</div>
            </div>
          </div>

          <div class="mb-3">
            <div class="form-check">
              <input
                type="checkbox"
                class="form-check-input"
                id="isAustralian"
                v-model="formData.isAustralian"
              />
              <label class="form-check-label" for="isAustralian">Australian Resident?</label>
            </div>
          </div>

          <div class="mb-3">
            <label for="reason" class="form-label">Reason for joining</label>
            <textarea
              class="form-control"
              id="reason"
              rows="3"
              @blur="() => validateReason(true)"
              @input="() => { validateReason(false); checkReasonForFriend(); }"
              v-model="formData.reason"
            ></textarea>
            <div v-if="errors.reason" class="text-danger">{{ errors.reason }}</div>
            <div v-if="reasonSuccessMessage" class="text-success">{{ reasonSuccessMessage }}</div>
          </div>
          
          <div class="mb-3">
            <label for="suburb" class="form-label">Suburb</label>
            <input 
                type="text" 
                class="form-control" 
                id="suburb" 
                :value="formData.suburb"
            />
            <div v-if="errors.suburb" class="text-danger">{{ errors.suburb }}</div>
          </div>

          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Submit</button>
            <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <div class="container mt-5" v-if="submittedCards.length > 0">
    <h4>This is a Primevue Datatable.</h4>
    <DataTable :value="submittedCards" tableStyle="min-width: 50rem" responsiveLayout="scroll">
      <Column field="username" header="Username"></Column>
      <Column field="password" header="Password"></Column>
      <Column field="isAustralian" header="Australian Resident">
        <template #body="slotProps">
          {{ slotProps.data.isAustralian ? 'Yes' : 'No' }}
        </template>
      </Column>
      <Column field="gender" header="Gender"></Column>
      <Column field="reason" header="Reason"></Column>
      <Column field="suburb" header="Suburb"></Column>
    </DataTable>
  </div>

  <div class="container mt-4" v-if="submittedCards.length">
    <div class="d-flex flex-wrap justify-content-start">
      <div v-for="(card, index) in submittedCards" :key="index" class="card m-2" style="width: 18rem">
        <div class="card-header">User Information</div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Username: {{ card.username }}</li>
          <li class="list-group-item">Password: {{ card.password }}</li>
          <li class="list-group-item">Australian Resident: {{ card.isAustralian ? 'Yes' : 'No' }}</li>
          <li class="list-group-item">Gender: {{ card.gender }}</li>
          <li class="list-group-item">Reason: {{ card.reason }}</li>
          <li class="list-group-item">Suburb: {{ card.suburb }}</li>
        </ul>
        <div class="card-footer text-end">
            <button class="btn btn-danger btn-sm" @click="deleteCard(index)">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

