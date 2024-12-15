<template>
  <div class="container mx-auto p-8">
    <h1 class="mt-4 text-3xl font-bold text-center text-green-700 mb-8">
      Your anonymous participation matters!
    </h1>
    <div v-if="loading" class="text-center">
      <p class="text-gray-500">Loading survey...</p>
    </div>
    <div v-if="!loading && survey">
      <h2 class="text-2xl font-semibold text-gray-800 mb-6 text-center">{{ survey.name }}</h2>
      <div
        v-for="(question, index) in survey.questions"
        :key="question.id"
        class="mb-6 bg-white shadow-md rounded-lg p-6"
      >
        <p class="text-lg font-medium text-gray-700 mb-4">{{ question.questionText }}</p>
        <div class="flex flex-col items-center space-y-2">
          <div class="flex space-x-1">
            <span
              v-for="n in 5"
              :key="n"
              @click="ratings[index] = n"
              @mouseover="hovered[index] = n"
              @mouseleave="hovered[index] = ratings[index] || 0"
              class="cursor-pointer text-gray-400 hover:text-yellow-400"
              :class="{
                'text-yellow-400': ratings[index] >= n || hovered[index] >= n
              }"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                class="w-5 h-5"
              >
                <path
                  d="M12 2l2.92 6.22 6.84.99-4.95 4.82 1.17 6.82L12 17.77l-6.12 3.22 1.17-6.82-4.95-4.82 6.84-.99L12 2z"
                ></path>
              </svg>
            </span>
          </div>
          <div class="w-full text-center text-xs text-gray-600 mt-2">
            <div class="flex justify-between mx-auto max-w-xs">
              <span>Strongly Disagree</span>
              <span>Strongly Agree</span>
            </div>
          </div>
        </div>
      </div>
      <button
        @click="submitRatings"
        class="block mx-auto bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
      >
        Submit Ratings
      </button>
    </div>

    <div v-else-if="!loading && !survey">
      <p class="text-center text-gray-500">Survey not found.</p>
    </div>
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg shadow-lg p-6 w-96">
        <h3 class="text-xl font-bold text-center text-green-600 mb-4">Success!</h3>
        <p class="text-gray-700 text-center mb-6">
          Your rating has been submitted successfully. Thank you for your participation :)
        </p>
        <button
          @click="closeModal"
          class="block mx-auto bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  getSurveyById,
  submitRatings as apiSubmitRatings,
} from "../api/surveyService";

defineOptions({
  name: 'RateSurvey'
});

const survey = ref(null);
const ratings = ref([]);
const hovered = ref([]); 
const loading = ref(true);
const showModal = ref(false);
const route = useRoute();
const router = useRouter();

const fetchSurvey = async () => {
  try {
    const surveyId = route.params.id;
    const data = await getSurveyById(surveyId);
    survey.value = data;
    ratings.value = Array(data.questions.length).fill(0);
    hovered.value = Array(data.questions.length).fill(0);
  } catch (error) {
    console.error("Error fetching survey:", error);
  } finally {
    loading.value = false;
  }
};

const submitRatings = async () => {
  try {
    const surveyId = route.params.id;
    if (ratings.value.some((rating) => rating === 0)) {
      alert("Please rate all questions before submitting.");
      return;
    }
    await apiSubmitRatings(surveyId, ratings.value);
    showModal.value = true; 
  } catch (error) {
    console.error("Error submitting ratings:", error);
    alert("Failed to submit ratings. Please try again.");
  }
};

const closeModal = () => {
  showModal.value = false;
   router.push('/');
};

onMounted(() => {
  fetchSurvey();
});
</script>

<style scoped>
.container {
  max-width: 600px;
}
</style>
