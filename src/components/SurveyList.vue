<template>
  <div>
    <div class="pt-20 p-4 space-y-6">
      <h2 class="mt-4 text-3xl font-bold text-center mb-8 text-gray-700">List of available surveys</h2>

      <div v-if="loading" class="flex justify-center items-center mt-10">
        <div class="loader"></div> 
        <p class="ml-4 text-lg text-gray-500">Loading surveys, please wait...</p>
      </div>

      <div v-else-if="surveys.length > 0">
        <table class="p-20 w-3/4 bg-white rounded-lg shadow-md mt-4 mx-auto">
          <thead>
            <tr class="border-b">
              <th class="py-2 px-4 text-center text-lg font-semibold text-gray-700">Survey Name</th>
              <th class="py-2 px-4 text-center text-lg font-semibold text-gray-700">Questions Count</th>
              <th class="py-2 px-4 text-center text-lg font-semibold text-gray-700">Rate</th>
            </tr>
          </thead>
          <tbody>
            <SurveyItem
              v-for="survey in surveys" 
              :key="survey.id" 
              :survey="survey" />
          </tbody>
        </table>
      </div>

      <div v-else class="mt-4 text-gray-500 text-lg">
        No surveys available to display.
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { fetchSurveys } from '../api/surveyService'; 
import SurveyItem from './SurveyItem.vue';

export default {
  name: 'SurveyList',
  components: {
    SurveyItem
  },
  setup() {
    const surveys = ref([]);
    const loading = ref(true);

    const getSurveys = async () => {
      try {
        surveys.value = await fetchSurveys(); 
      } catch (error) {
        console.error('Error fetching surveys:', error);
      } finally {
        loading.value = false;
      }
    };

    onMounted(getSurveys);

    return { surveys, loading };
  }
};
</script>

<style scoped>
.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
