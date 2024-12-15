<template>
  <div class="max-w-2xl mx-auto p-16 bg-white rounded-lg shadow-lg">
    <h1 class="text-3xl font-bold mb-6">Create Survey</h1>
    <form @submit.prevent="submitSurvey">
      <div class="mb-4">
        <label for="title" class="block text-sm font-medium text-gray-700">Survey Title</label>
        <input
          type="text"
          id="title"
          placeholder="Title"
          v-model="survey.title"
          class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          required
        />
        <span v-if="errors.title" class="text-red-500 text-xs mt-1">{{ errors.title }}</span>
      </div>

      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700">Questions</label>
        <div v-for="(question, index) in survey.questions" :key="index" class="mb-4">
          <input
            type="text"
            v-model="survey.questions[index].questionText"
            :placeholder="'Question ' + (index + 1)"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <span v-if="errors.questions[index]" class="text-red-500 text-xs mt-1">{{ errors.questions[index] }}</span>
        </div>
        <button
          type="button"
          @click="addQuestion"
          class="w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
        >
          Add Another Question
        </button>
      </div>

      <div v-if="loading" class="flex justify-center mb-4">
        <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>

      <button
        type="submit"
        :disabled="loading"
        class="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition disabled:bg-gray-400"
      >
        {{ loading ? 'Submitting...' : 'Create Survey' }}
      </button>
    </form>

    <div
      v-if="showSuccessModal"
      class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
        <h2 class="text-lg font-bold mb-4">Survey Created Successfully!</h2>
        <p class="text-gray-700 mb-6">It is now available for Team Members to rate.</p>
        <button
          @click="redirectToAdmin"
          class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          OK
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { createSurvey, addQuestionsToSurvey } from '../api/surveyService';

const survey = ref({
  title: '',
  questions: [{ questionText: '' }]
});

const errors = ref({
  title: '',
  questions: []
});

const showSuccessModal = ref(false);
const loading = ref(false); 
const router = useRouter();

const validateForm = () => {
  errors.value = { title: '', questions: [] };
  let valid = true;

  if (!survey.value.title) {
    errors.value.title = 'Title is required.';
    valid = false;
  }

  survey.value.questions.forEach((q, index) => {
    if (!q.questionText) {
      errors.value.questions[index] = 'Question is required.';
      valid = false;
    }
  });

  return valid;
};

const addQuestion = () => {
  survey.value.questions.push({ questionText: '' });
};

const submitSurvey = async () => {
  if (!validateForm()) return;

  loading.value = true;
  try {
    const surveyData = await createSurvey(survey.value.title);
    await addQuestionsToSurvey(surveyData.id, survey.value.questions);
    showSuccessModal.value = true;
  } catch (error) {
    alert('Error creating survey. Please try again.');
  } finally {
    loading.value = false;
  }
};

const redirectToAdmin = () => {
  showSuccessModal.value = false;
  router.push('/admin');
};
</script>
